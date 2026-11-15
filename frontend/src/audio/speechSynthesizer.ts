export type SpeechStatus = 'idle' | 'playing' | 'paused';

export interface SpeechState {
  status: SpeechStatus;
  currentMessageId: string | null;
  currentVoice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  availableVoices: SpeechSynthesisVoice[];
}

type SpeechSubscriber = (state: SpeechState) => void;

class SpeechSynthesizerManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private textChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private currentMessageId: string | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private rate: number = 1.0;
  private pitch: number = 1.0;
  private status: SpeechStatus = 'idle';
  private subscribers: Set<SpeechSubscriber> = new Set();
  private keepAliveTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    if (allVoices.length > 0) {
      this.voices = allVoices;
      // Prefer English natural voices if available (Google, Microsoft, Natural)
      if (!this.selectedVoice) {
        const preferred = allVoices.find(
          v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))
        ) || allVoices.find(v => v.lang.startsWith('en')) || allVoices[0];
        this.selectedVoice = preferred || null;
      }
      this.notifySubscribers();
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public setVoice(voiceUri: string) {
    const found = this.voices.find(v => v.voiceURI === voiceUri);
    if (found) {
      this.selectedVoice = found;
      this.notifySubscribers();
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
    this.notifySubscribers();
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.5, Math.min(1.5, pitch));
    this.notifySubscribers();
  }

  public getState(): SpeechState {
    return {
      status: this.status,
      currentMessageId: this.currentMessageId,
      currentVoice: this.selectedVoice,
      rate: this.rate,
      pitch: this.pitch,
      availableVoices: this.voices,
    };
  }

  public subscribe(callback: SpeechSubscriber): () => void {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach(sub => sub(state));
  }

  /**
   * Chunks long text into sentence-sized blocks to bypass browser speech synthesis
   * truncation & GC pauses (Chrome/Safari limitation on long text).
   */
  private splitIntoChunks(text: string): string[] {
    // Strip markdown formatting for cleaner speech synthesis
    const cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s+/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const regex = /[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g;
    const matches = cleanText.match(regex);
    if (!matches) return [cleanText];

    const chunks: string[] = [];
    let current = '';

    for (const sentence of matches) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      if ((current + ' ' + trimmed).length > 180) {
        if (current) chunks.push(current.trim());
        current = trimmed;
      } else {
        current = current ? current + ' ' + trimmed : trimmed;
      }
    }
    if (current) chunks.push(current.trim());
    return chunks.length > 0 ? chunks : [cleanText];
  }

  public speak(text: string, messageId: string) {
    if (!this.synth) return;

    // If currently speaking this message and paused, resume
    if (this.currentMessageId === messageId && this.status === 'paused') {
      this.resume();
      return;
    }

    // If already playing this message, pause it
    if (this.currentMessageId === messageId && this.status === 'playing') {
      this.pause();
      return;
    }

    // Otherwise stop any existing speech and start new
    this.stop();

    this.currentMessageId = messageId;
    this.textChunks = this.splitIntoChunks(text);
    this.currentChunkIndex = 0;
    this.status = 'playing';
    this.notifySubscribers();

    this.startKeepAlive();
    this.speakCurrentChunk();
  }

  private speakCurrentChunk() {
    if (!this.synth || this.currentChunkIndex >= this.textChunks.length) {
      this.stop();
      return;
    }

    const chunk = this.textChunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    utterance.onend = () => {
      if (this.status === 'playing') {
        this.currentChunkIndex++;
        if (this.currentChunkIndex < this.textChunks.length) {
          this.speakCurrentChunk();
        } else {
          this.stop();
        }
      }
    };

    utterance.onerror = (e) => {
      // If error was not caused by manual cancel
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('SpeechSynthesis error:', e.error);
      }
      this.stop();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (!this.synth || this.status !== 'playing') return;
    this.synth.pause();
    this.status = 'paused';
    this.stopKeepAlive();
    this.notifySubscribers();
  }

  public resume() {
    if (!this.synth || this.status !== 'paused') return;
    this.synth.resume();
    this.status = 'playing';
    this.startKeepAlive();
    this.notifySubscribers();
  }

  public stop() {
    if (!this.synth) return;
    this.stopKeepAlive();
    this.synth.cancel();
    this.currentUtterance = null;
    this.currentMessageId = null;
    this.textChunks = [];
    this.currentChunkIndex = 0;
    this.status = 'idle';
    this.notifySubscribers();
  }

  /**
   * Chrome has an infamous bug where speech synthesis pauses silently after ~15s.
   * Periodically calling pause/resume keeps the audio thread alive.
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveTimer = window.setInterval(() => {
      if (this.synth && this.status === 'playing') {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  private stopKeepAlive() {
    if (this.keepAliveTimer !== null) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }
}

export const speechSynthesizer = new SpeechSynthesizerManager();
