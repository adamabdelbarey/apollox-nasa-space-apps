import { Mission } from '../../types';

export const BEYOND_MISSIONS: Mission[] = [
  {
    id: 'near-shoemaker',
    name: 'NEAR Shoemaker & Dawn',
    codeName: 'Asteroid Pioneers',
    spacecraftName: 'NEAR Shoemaker (with Dawn Asteroid Explorer)',
    spacecraftType: 'Interplanetary Probe',
    celestialBody: 'asteroid',
    archiveChapter: 'beyond',
    launchDate: 'February 17, 1996 (NEAR) / September 27, 2007 (Dawn)',
    landingDate: 'February 12, 2001 (NEAR landing on Asteroid 433 Eros)',
    missionEndDate: 'February 28, 2001 (NEAR) / November 1, 2018 (Dawn)',
    coordinates: {
      lat: -35.78,
      lng: 80.42,
      siteName: 'Asteroid 433 Eros (near Himeros) & Vesta/Ceres',
      selectionReason: 'S-type near-Earth asteroid 433 Eros was selected as a primitive undifferentiated fragment dating back to the primordial accretion of the Solar System.',
      geologicalFeatures: ['Himeros saddle depression', 'Psyche crater', 'Eros regolith ponds', 'Occator bright sodium carbonate crater on Ceres', 'Rheasilvia impact basin on Vesta'],
      nearbyMissions: []
    },
    summary: 'The historic pioneers of deep asteroid exploration. NEAR Shoemaker became the first spacecraft to orbit and touch down upon an asteroid (433 Eros), while Dawn became the first spacecraft to orbit two extraterrestrial bodies (protoplanet Vesta and dwarf planet Ceres).',
    juniorHook: 'Journey deep into the mysterious asteroid belt! Meet NEAR Shoemaker and Dawn, the brave robotic detectives that flew to giant floating space rocks and made humanity\'s very first landing on an asteroid!',
    storyTitle: 'NEAR Shoemaker: The Spacecraft That Landed on an Asteroid!',
    storyText: 'Launched in 1996, NEAR Shoemaker embarked on a daring mission to explore rocky asteroids orbiting the Sun. On February 14, 2000, it reached asteroid 433 Eros, becoming the first spacecraft ever to orbit an asteroid! It spent a year photographing boulders and craters. Then, on February 12, 2001, NASA guided it down to attempt something never planned: it landed safely right on the asteroid\'s surface! It became the first spacecraft to ever land on an asteroid, proving that unexpected adventures can lead to the greatest triumphs!',
    audioUrl: '/audio/v12.mp3',
    badgeEmoji: 'NEAR / Dawn',
    primaryColor: '#38bdf8',
    accentColor: '#0284c7',
    modelConfig: {
      modelUrl: '/models/Dawn.glb',
      modelType: 'gltf',
      scale: 0.9,
      position: [0, 0, 0],
      hotspots: [
        { id: 'ion_engine', name: 'Xenon Ion Propulsion Thrusters', position: [0, -0.6, 0], description: 'Hyper-efficient ion propulsion engines that fired for tens of thousands of hours, glowing with brilliant cyan xenon plasma!' },
        { id: 'solar_wings_dawn', name: 'Giant 20-Meter Solar Wings', position: [1.2, 0, 0], description: 'Spanning nearly 20 meters tip-to-tip—the longest wings of any deep-space probe to gather weak sunlight in the asteroid belt.' },
        { id: 'framing_cam', name: 'Framing Cameras & Spectrometers', position: [0, 0.4, 0.4], description: 'Mapped the surface geology of asteroid Eros, Vesta, and Ceres, discovering bright salt deposits inside Occator Crater!' }
      ]
    },
    technicalSpecs: {
      massKg: 'NEAR: 805 kg; Dawn: 1,218 kg (with fuel)',
      powerSource: 'NEAR: 4 gallium arsenide solar panels (1,800W); Dawn: Two 10 kW solar arrays + Xenon Ion engines',
      missionDuration: '5.0 years (NEAR) / 11.1 years (Dawn)',
      distanceTraveled: 'Over 6.9 billion kilometers traveled through the Solar System',
      communicationsFreq: 'X-band deep space network via 1.5m parabolic dish'
    },
    lifetime: {
      earthDays: 1838,
      earthYears: '5.0 years (NEAR) / 11.1 years (Dawn)',
      plannedDuration: '4 years (NEAR) / 9 years (Dawn)',
      achievedRatio: '125% (NEAR) / 123% (Dawn)',
      notes: 'NEAR orbited Asteroid 433 Eros for an entire year, then touched down gently on February 12, 2001 and transmitted data from the surface for 16 days. Dawn explored two protoplanetary worlds over 11 years.'
    },
    timeline: [
      { date: 'February 17, 1996', title: 'NEAR Shoemaker Launch', description: 'Blasts off on a Delta II rocket from Cape Canaveral to explore near-Earth asteroids.', type: 'launch' },
      { date: 'June 27, 1997', title: 'Asteroid 253 Mathilde Flyby', description: 'Completes historic high-speed flyby of main-belt asteroid Mathilde, revealing giant impact craters.', type: 'transit' },
      { date: 'February 14, 2000', title: 'Orbit Insertion at 433 Eros', description: 'Becomes the first spacecraft in human history to enter orbit around an asteroid on Valentine\'s Day.', type: 'milestone' },
      { date: 'February 12, 2001', title: 'Historic Landing on Asteroid Eros', description: 'Executes a gentle 1.9 m/s controlled descent, touching down softly near the Himeros crater and surviving impact.', type: 'landing' },
      { date: 'February 28, 2001', title: 'Final Surface Signal', description: 'Transmits X-ray spectrometer science from the surface of Eros for 16 days until NASA antennas say farewell.', type: 'end' },
      { date: 'September 27, 2007', title: 'Dawn Mission Launch', description: 'Equipped with ion propulsion, Dawn launches to explore giant asteroid Vesta and dwarf planet Ceres.', type: 'launch' },
      { date: 'November 1, 2018', title: 'Dawn Orbit Retirement', description: 'Dawn exhausts hydrazine fuel, placed in stable perpetual orbit around dwarf planet Ceres.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'NEAR Shoemaker resting intact on the southern tip of Asteroid 433 Eros (coordinates -35.2° S, 81.5° E)',
        'Dawn spacecraft in eternal, stable quarantine orbit around dwarf planet Ceres'
      ],
      scientificInstruments: [
        'Multi-Spectral Imager (MSI)',
        'X-ray/Gamma-ray Spectrometer (XGRS)',
        'Near-Infrared Spectrograph (NIS)',
        'Laser Rangefinder (NLR)',
        'Magnetometer (MAG)'
      ],
      keyDiscoveries: [
        'First human spacecraft to orbit an asteroid, and first spacecraft to ever land upon an asteroid',
        'Proved Asteroid 433 Eros is a solid, fractured body with uniform density (~2.67 g/cm³), not a loose rubble pile',
        'Captured extreme close-up images from only 120 meters above the asteroid surface, revealing smooth dust "ponds"',
        'Dawn proved dwarf planet Ceres harbors ancient subsurface water-ice oceans and bright sodium carbonate salt deposits in Occator Crater'
      ],
      ongoingSignificance: 'Established the foundation for modern planetary defense missions (such as NASA\'s DART impactor), asteroid deflection, and future resource exploration in the solar system.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Voyage to the Asteroid Belt: NEAR Shoemaker & Dawn',
        juniorTitle: 'Visiting an Asteroid! ',
        documentaryText: 'In February 2000, NASA\'s NEAR Shoemaker became the first spacecraft to enter orbit around an asteroid: the potato-shaped, 34-kilometer-long space rock known as 433 Eros. One year later, it made history again by performing humanity\'s first soft landing on an asteroid.',
        juniorText: 'Hello, little space explorers! Have you ever wondered what a giant asteroid looks like up close? In 2001, NASA sent a brave robotic explorer named NEAR Shoemaker all the way to a giant space rock named 433 Eros, and it even landed right on top of it!',
        highlightFacts: [
          'First spacecraft to orbit an asteroid (February 14, 2000)',
          'First spacecraft to land on an asteroid (February 12, 2001)',
          'Renamed in honor of legendary planetary geologist Eugene Shoemaker'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'Time Capsules of the Solar System: Why Study Asteroids?',
        juniorTitle: 'Secrets of the Ancient Space Rocks! ',
        documentaryText: 'Asteroids are the pristine, leftover building blocks from the birth of our Solar System 4.6 billion years ago. By studying Eros, scientists could analyze primitive matter that had remained unaltered by volcanic heat or tectonic recycling.',
        juniorText: 'Asteroids are like frozen cosmic time machines! They were formed when our Solar System was brand new, 4.6 billion years ago. Scientists wanted to find out: What are asteroids made of? Could they have water or precious metals inside?',
        highlightFacts: [
          '433 Eros is an S-type near-Earth asteroid (34 km x 11 km x 11 km)',
          'Gravity on Eros is tiny—a dropped pebble falls like a slow-motion feather',
          'Equipped with laser altimeter to create a 3D digital model of the asteroid'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'One Year in Orbit & The Unplanned Touchdown',
        juniorTitle: 'Orbiting and Landing on a Space Rock! ',
        documentaryText: 'NEAR spent a full year orbiting Eros, flying as close as 24 kilometers to map its boulders and craters. At the end of its mission, engineers attempted an audacious maneuver: though never designed as a lander, they steered NEAR directly down toward the surface at a gentle 1.9 meters per second.',
        juniorText: 'NEAR flew around the asteroid for a whole year, taking thousands of pictures. And then, the scientists tried something daring: they steered NEAR down, down, down… And it landed softly on the asteroid without breaking! It was the first time in history a spaceship landed on an asteroid!',
        highlightFacts: [
          'Took 160,000 images of asteroid Eros',
          'Touchdown velocity was gentle: only 1.9 m/s (4 mph)',
          'Continued transmitting scientific telemetry from the surface for 16 days'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Porous Ponds & Solid Rock: Unlocking Eros and Ceres',
        juniorTitle: 'Dust Ponds and Salt Craters! ',
        documentaryText: 'NEAR discovered that Eros was a cracked but solid monolithic rock, covered by mysterious flat "ponds" of fine regolith dust settled in crater depressions. Later, NASA\'s Dawn mission explored dwarf planet Ceres, discovering bright sodium carbonate salt deposits inside Occator Crater from ancient brine eruptions.',
        juniorText: 'NEAR discovered that the asteroid had weird flat "ponds" of golden-brown dust! And when the Dawn spacecraft visited the dwarf planet Ceres, it found glowing white salt spots inside giant craters, showing that water and salts are hidden throughout the asteroid belt!',
        highlightFacts: [
          'Surface gravity is only 0.006 m/s² (1/1000th of Earth gravity)',
          'Eros contains uniform elemental composition matching ordinary chondrite meteorites',
          'Dawn discovered Ceres was an ocean world with ancient cryovolcanoes'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'The Surface Farewell & Dawn\'s Perpetual Orbit',
        juniorTitle: 'A Quiet Sleep on the Asteroid ',
        documentaryText: 'NEAR continued transmitting X-ray spectrometry from the surface of Eros until February 28, 2001, when NASA closed communications. In 2018, Dawn exhausted its hydrazine fuel and was placed in a stable perpetual orbit around Ceres to prevent biological contamination.',
        juniorText: 'After landing, NEAR kept sending messages back to Earth for 16 days! Then, on February 28, 2001, NASA said goodbye to their brave robot friend. It now rests peacefully on the space rock, flying through the stars forever!',
        highlightFacts: [
          'Surpassed planned operational mission life',
          'Dawn fired its xenon ion engines for 51,385 hours (nearly 6 years of thrust!)',
          'Dawn is quarantined in a stable orbit around Ceres for at least 50 years'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Eros & Ceres Today: Humanity\'s Deep Space Footprint',
        juniorTitle: 'Riding Through Space Forever! ',
        documentaryText: 'NEAR Shoemaker rests upon the dusty plains of Asteroid 433 Eros, slowly tumbling through the inner solar system for millions of years. High above Ceres, Dawn glides as a silent monument to ion propulsion and deep-space curiosity.',
        juniorText: 'NEAR Shoemaker is still riding on top of the asteroid right now as it zooms through the solar system! It showed us that we can visit and land on any world in our Solar System, no matter how distant or small!',
        highlightFacts: [
          'Resting at coordinates -35.2° S, 81.5° E on Asteroid 433 Eros',
          'Paved the way for OSIRIS-REx and asteroid sample returns',
          'Demonstrated the power of ion propulsion across billions of kilometers'
        ]
      }
    ],
    instruments: [
      { id: 'near_msi', name: 'Multi-Spectral Imager', acronym: 'MSI', purpose: 'Color imaging and topography mapping', discovery: 'Mapped 160,000 photos of asteroid terrain and regolith ponds', status: 'Completed mission' },
      { id: 'near_xgrs', name: 'X-ray/Gamma-ray Spectrometer', acronym: 'XGRS', purpose: 'Measures elemental abundance of silicon, magnesium, and iron', discovery: 'Confirmed Eros matches primitive L and LL chondrite meteorites', status: 'Operated on the surface' },
      { id: 'dawn_framing_cam', name: 'Dawn Framing Camera', acronym: 'FC', purpose: 'High-resolution geological imaging of Vesta and Ceres', discovery: 'Discovered bright sodium carbonate deposits in Occator Crater', status: 'Completed 11-year mission' }
    ],
    artifacts: [
      { name: 'NEAR Shoemaker Spacecraft', description: 'Box-shaped probe with four solar wings', condition: 'Resting on Asteroid 433 Eros', coordinates: '-35.2° S, 81.5° E', significance: 'First spacecraft to land on an asteroid in human history' },
      { name: 'Dawn Spacecraft', description: 'Deep-space ion propulsion probe', condition: 'Perpetual stable orbit around dwarf planet Ceres', coordinates: 'Ceres high orbit', significance: 'First spacecraft to orbit two extraterrestrial destinations' }
    ]
  }
];
