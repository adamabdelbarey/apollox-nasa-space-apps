export interface FunnyMissionLore {
  missionId: string;
  funnyTitle: string;
  funnySubtitle: string;
  comicBadge: string;
  funnyHook: string;
  cosmicComedyQuote: {
    speaker: string;
    text: string;
    context: string;
  };
  didYouKnowFunny: string[];
  whyTheyPickedSpotFunny: string;
  weirdStuffLeftBehindFunny: string[];
  kidVerdict: string;
}

export const FUNNY_MISSION_LORE: Record<string, FunnyMissionLore> = {
  'apollo-11': {
    missionId: 'apollo-11',
    funnyTitle: 'Apollo 11 Lunar Module / EASEP',
    funnySubtitle: 'Two astronauts flew 384,000 kilometers in a tiny cabin and saved their liftoff with an ordinary felt-tip pen!',
    comicBadge: 'FIRST HUMAN FOOTPRINTS',
    funnyHook:
      'A long time ago, in 1969, NASA sent three astronauts on a big adventure to the Moon: Neil Armstrong, Buzz Aldrin, and Michael Collins. When they reached the Moon, Neil and Buzz climbed into a small spaceship called Eagle, while Michael stayed in Columbia above. On July 20, Eagle slowly landed on the Moon! Neil and Buzz got out, walked on the powdery dust, collected Moon rocks, and did experiments. When leaving, Buzz accidentally broke the rocket engine switch with his backpack, but fixed it with a felt-tip marker pen!',
    cosmicComedyQuote: {
      speaker: 'Buzz Aldrin',
      text: 'I used a felt-tip pen to push the circuit breaker in. It worked!',
      context: 'Explaining how an office pen saved the Apollo 11 crew from being stranded'
    },
    didYouKnowFunny: [
      'Neil and Buzz threw their smelly lunar overboots, urine bags, and portable backpacks out the hatch to make the spacecraft light enough to lift off.',
      'The computer memory on Apollo 11 was only 72 kilobytes. Your smartwatch is over 100,000 times more powerful!',
      'Neil Armstrong had to steer manually past a football-field-sized crater filled with boulders, landing with only 25 seconds of descent fuel left!',
      'The laser reflector they left on the Moon is still active today. Scientists shoot laser beams at it to measure the exact distance from Earth!'
    ],
    whyTheyPickedSpotFunny:
      'The Sea of Tranquility looked flat and smooth through telescopes, but up close it had craters and boulders that Neil had to dodge like a video game!',
    weirdStuffLeftBehindFunny: [
      'Eagle descent stage with gold Kapton foil legs',
      'Discarded lunar overboots thrown out the hatch to save liftoff weight',
      'The Apollo 11 plaque: "Here men from the planet Earth first set foot upon the Moon"',
      'Laser Ranging Retroreflector (still bouncing lasers back to Earth today)',
      'Silicon disc with goodwill messages from 73 world leaders'
    ],
    kidVerdict: '10/10 — Best roadtrip in human history, especially the part with the marker pen.'
  },

  'apollo-12': {
    missionId: 'apollo-12',
    funnyTitle: 'Apollo 12 Lunar Module / ALSEP',
    funnySubtitle: 'Pete Conrad makes the shortest astronaut joke in history and drops in on a lonely robotic neighbor 163 meters away.',
    comicBadge: 'COSMIC HOUSE CALL',
    funnyHook:
      'Imagine travelling to the Moon, not just to explore it, but to build a science laboratory there! On November 19, 1969, Apollo 12 arrived on the Moon carrying a special spaceship called Intrepid. Think of it as a flying taxi carrying Charles Conrad and Alan Bean! They brought ALSEP instruments to study moonquakes and solar wind, and pulled off an incredible precision landing just 163 meters from the unmanned robot Surveyor 3, which had been frozen in the lunar dark for 2.5 years!',
    cosmicComedyQuote: {
      speaker: 'Pete Conrad (stepping onto the Moon)',
      text: "Whoopee! Man, that may have been a small one for Neil, but that's a long one for me!",
      context: 'Winning a $500 bet with a reporter who thought NASA scripted every word'
    },
    didYouKnowFunny: [
      'The Saturn V rocket was struck by lightning TWICE during launch! Astronaut John Aaron saved the mission by remembering the "SCE to AUX" switch.',
      'Conrad and Bean walked over to Surveyor 3, clipped off its television camera with shears, and brought it back to Earth as a space trophy!',
      'They intentionally crashed their Lunar Module ascent stage into the Moon, causing the Moon to ring like a bronze bell for over an hour!',
      'Alan Bean accidentally pointed the color TV camera directly at the bright Sun, burning out the sensor within minutes.'
    ],
    whyTheyPickedSpotFunny:
      'NASA wanted to prove pinpoint precision landing by parking right next to Surveyor 3, like pulling a spaceship into a driveway!',
    weirdStuffLeftBehindFunny: [
      'The Intrepid descent stage with gold foil landing gear',
      'ALSEP nuclear scientific station that transmitted data for 8 years',
      'Discarded geology tongs and hammers',
      'Naval aviator wings pinned to the lunar surface'
    ],
    kidVerdict: '9.9/10 — Knocking on an old robot neighbor\'s door on the Moon is peak explorer behavior.'
  },

  'surveyor-3': {
    missionId: 'surveyor-3',
    funnyTitle: 'Surveyor 3',
    funnySubtitle: 'A three-legged robotic scout that bounced three times on touchdown and got visited by humans two years later.',
    comicBadge: 'VISITED BY HUMANS',
    funnyHook:
      'Once upon a time, NASA wanted to send astronauts to the Moon, but nobody knew if its ground was safe. So, in 1967, NASA sent a little robot called Surveyor 3 to explore it first! On April 17, Surveyor 3 launched aboard a powerful rocket. After three days, it reached the Moon. But OOPS! Its landing wasn\'t smooth—it bounced twice before finally staying down! It dug into the dirt to prove it was solid, and two years later, Apollo 12 astronauts paid it a surprise visit!',
    cosmicComedyQuote: {
      speaker: 'Alan Bean (examining Surveyor 3)',
      text: 'Hey Pete, look at the color of this thing. The bright white paint turned brown from the Sun!',
      context: 'Inspecting Surveyor 3 on the Moon in November 1969'
    },
    didYouKnowFunny: [
      'Surveyor 3 dug four little trenches with a robotic scoop arm to prove lunar dirt would not swallow astronaut boots like quicksand.',
      'Scientists on Earth were genuinely worried the Moon was covered in 10-meter deep fluffy dust. Surveyor proved it was firm ground!',
      'When Apollo 12 brought its camera back to Earth, scientists found harmless Streptococcus bacteria inside the lens, likely from a scientist sneezing in the clean room on Earth!'
    ],
    whyTheyPickedSpotFunny:
      'Ocean of Storms was chosen as a smooth, wide landing plain. Surveyor 3 bounced right into a gentle crater bowl that sheltered it.',
    weirdStuffLeftBehindFunny: [
      'The three-legged aluminum tripod frame',
      'Solar panels and omnidirectional antenna mast',
      'Surface sampling scoop arm still resting in the lunar soil'
    ],
    kidVerdict: '9.5/10 — The only robot on another world ever visited and photographed by human beings.'
  },

  'apollo-15': {
    missionId: 'apollo-15',
    funnyTitle: 'Apollo 15 Lunar Module / ALSEP',
    funnySubtitle: 'Astronauts drive a $38-million electric dune buggy and prove a 400-year-old Galileo riddle on live television.',
    comicBadge: 'LUNAR DUNE BUGGY',
    funnyHook:
      'In 1971, NASA sent three astronauts on an exciting journey called Apollo 15. David Scott and James Irwin landed Falcon near the towering Apennine Mountains. But this mission had something amazing: a small electric Moon car called the Lunar Rover! They used it to drive 28 kilometers, collect Moon rocks, and explore places they couldn\'t reach on foot. Commander Scott dropped a hammer and a falcon feather at the same time—and both hit the dust at the exact same split-second!',
    cosmicComedyQuote: {
      speaker: 'Commander Dave Scott',
      text: 'In my left hand, I have a feather. In my right hand, a hammer. I guess one of the reasons we got here today was because of a gentleman named Galileo...',
      context: 'Dropping a 1.32 kg hammer and a 0.03 kg falcon feather simultaneously on live TV'
    },
    didYouKnowFunny: [
      'The hammer and falcon feather fell at the exact same rate because the Moon has no atmosphere or air resistance to slow the feather down!',
      'The Lunar Rover tires were made of zinc-coated steel wire mesh with titanium chevrons because rubber freezes and shatters in space.',
      'They found the famous "Genesis Rock", an anorthosite rock that is 4.1 billion years old—nearly as old as the solar system itself!',
      'Dave Scott left a small aluminum figurine called "Fallen Astronaut" honoring space explorers who gave their lives.'
    ],
    whyTheyPickedSpotFunny:
      'Hadley-Apennine had a winding 300-meter deep canyon called Hadley Rille and towering 4,000-meter mountains like a lunar Swiss Alps!',
    weirdStuffLeftBehindFunny: [
      'The Lunar Roving Vehicle parked with its antenna pointed toward Earth',
      'The Falcon descent stage',
      'The hammer and falcon feather lying side by side in the dust',
      'The Fallen Astronaut aluminum statue'
    ],
    kidVerdict: '10/10 — Proof that if you give astronauts an electric golf cart on the Moon, they will have the time of their lives.'
  },

  'mars-pathfinder': {
    missionId: 'mars-pathfinder',
    funnyTitle: 'Sojourner: The Little Robot That Visited Mars!',
    funnySubtitle: 'A microwave-oven-sized robot that bounced across Mars inside giant airbags and named rocks after cartoon characters.',
    comicBadge: 'BOUNCING AIRBAGS',
    funnyHook:
      'Hello, little explorers! My name is Sojourner. I am a small robot, and I have a BIG story to tell you! On July 4, 1997, we arrived at Mars. NASA used a giant parachute and special airbags to protect us. And then... BOING! BOING! BOING! We bounced on the Martian ground more than 15 times before stopping! Out I rolled down a ramp, driving at 1 cm per second, taking photos and studying rocks named Barnacle Bill and Yogi Bear!',
    cosmicComedyQuote: {
      speaker: 'Dr. Matt Golombek (Pathfinder Project Scientist)',
      text: 'We are on Mars! The spacecraft bounced, rolled, and stopped right side up on the first try!',
      context: 'Announcing the historic July 4, 1997 landing'
    },
    didYouKnowFunny: [
      'Sojourner weighed only 10.6 kg (about the weight of a medium dog). Its solar panel produced less electricity than a single household lightbulb!',
      'Scientists named Martian rocks around the lander: "Barnacle Bill", "Yogi Bear", "Scooby Doo", "Casper", and "Wedge"!',
      'Planned for only 7 days, Sojourner explored for 83 days and sent back 16,500 photos!',
      'Millions of people tried to view the landing photos online on July 4, 1997, causing one of the first worldwide internet traffic jams in history!'
    ],
    whyTheyPickedSpotFunny:
      'Ares Vallis was chosen because billions of years ago, a catastrophic flash flood washed rocks from all over Mars into one giant pile.',
    weirdStuffLeftBehindFunny: [
      'The Carl Sagan Memorial Station base lander',
      'Deflated Kevlar airbags flattened across the Martian rocks',
      'The tiny Sojourner rover parked next to the rock named Yogi'
    ],
    kidVerdict: '10/10 — Bouncing across Mars inside a giant beach ball is the best landing method ever invented.'
  },

  'viking-1': {
    missionId: 'viking-1',
    funnyTitle: 'Viking 1: The Space Explorer Who Discovered Mars!',
    funnySubtitle: 'First successful long-term lander on Mars, which dug into red soil and operated for six years.',
    comicBadge: 'FIRST MARS LANDER',
    funnyHook:
      'Viking 1 was the grand pioneer of early Mars exploration! On July 20, 1976, it touched down on Chryse Planitia and sent back the first clear color pictures of the Martian surface. It had a special robotic arm with a little backhoe scoop that dug into the soil looking for microbial life, measured the thin atmosphere, and proved Mars was an icy desert with a butterscotch-pink sky!',
    cosmicComedyQuote: {
      speaker: 'NASA Mission Log',
      text: 'The soil is red, the rocks are dark, and the sky is a salmon pink. Mars is an alien desert.',
      context: 'First color image transmission from the surface of Mars, July 1976'
    },
    didYouKnowFunny: [
      'Before Viking 1, people thought the Martian sky would be dark blue. The first photo revealed a salmon-pink sky filled with suspended rusty dust!',
      'Its biological experiments tested soil for microbial respiration, sparking debates that lasted for four decades.',
      'Viking 1 survived for 2,245 Martian sols (over 6 Earth years) on nuclear battery power!'
    ],
    whyTheyPickedSpotFunny:
      'Chryse Planitia means "Plains of Gold". It was chosen for its low elevation, giving the parachute more air to slow the lander down.',
    weirdStuffLeftBehindFunny: [
      'The three-legged titanium Viking 1 lander body',
      'Two nuclear radioisotope thermoelectric generators (RTGs)',
      'The robotic sampling arm resting in its final excavated trench'
    ],
    kidVerdict: '9.2/10 — Legendary machine that showed humanity what Mars looks like from the ground.'
  },

  'viking-2': {
    missionId: 'viking-2',
    funnyTitle: 'Viking 2: The Winter Frost Spy at Utopia Planitia',
    funnySubtitle: 'Landed tilted on a giant boulder, detected real winter frost, and analyzed Martian quakes.',
    comicBadge: 'WINTER FROST SPY',
    funnyHook:
      'On September 3, 1976, Viking 2 touched down in Utopia Planitia, about 4,000 miles away from Viking 1. It landed tilted at an 8-degree angle because one leg sat on a rock! Despite the tilt, Viking 2 photographed real water-ice frost coating the red ground in winter, like a dusty Martian Christmas wonderland, and proved Mars is red because of rusted iron!',
    cosmicComedyQuote: {
      speaker: 'Carl Sagan',
      text: 'If there is life on Mars, I believe we should do nothing with it. Mars then belongs to the Martians, even if they are only microbes.',
      context: 'Reflecting on the Viking missions'
    },
    didYouKnowFunny: [
      'Viking 2 photographed white water frost on red rocks during the Martian winter!',
      'Its seismometer was on top of the lander, so Martian wind made the whole spacecraft wiggle, confusing the instrument!',
      'It proved the red color of Mars is literally rust—iron oxide, the same rust on an old bicycle left in the rain!'
    ],
    whyTheyPickedSpotFunny:
      'Utopia Planitia was a high-latitude northern plain where scientists hoped to find polar water ice and frost.',
    weirdStuffLeftBehindFunny: [
      'The tilted Viking 2 lander body on its rock perch',
      'The surface sampler arm',
      'Nuclear battery cylinders'
    ],
    kidVerdict: '8.8/10 — Proved that even landing at a funny angle cannot stop real science.'
  },

  'spirit': {
    missionId: 'spirit',
    funnyTitle: 'Spirit: The Little Rover That Struck Hydrothermal Gold',
    funnySubtitle: 'Designed for 90 days, Spirit explored for six years and turned a jammed wheel into a historic discovery.',
    comicBadge: 'THE ACCIDENTAL GENIUS',
    funnyHook:
      'Spirit landed in Gusev Crater in January 2004 with a 90-day warranty. It drove for over SIX YEARS! When its right-front wheel completely jammed, drivers on Earth drove it backwards, dragging the dead wheel like a peg leg. The dragging wheel scraped away topsoil and revealed brilliant white silica powder—proof of ancient boiling hot springs where microbes could have lived!',
    cosmicComedyQuote: {
      speaker: 'Steve Squyres (Principal Investigator)',
      text: 'That broken wheel was the best thing that ever happened to us. It dragged a trench that made our greatest discovery!',
      context: 'Reflecting on Spirit discovering ancient hydrothermal silica'
    },
    didYouKnowFunny: [
      'Spirit climbed to the summit of Husband Hill, becoming the first robotic mountaineer on another world!',
      'Martian dust devils (spinning mini-tornadoes) would blow over Spirit, vacuuming the dust off its solar panels for free!',
      'Spirit survived for 2,210 Martian sols—over 24 times longer than its planned 90-day mission!',
      'It finally got stuck in soft sand at a spot called Troy, where its solar panels could no longer catch the winter sun.'
    ],
    whyTheyPickedSpotFunny:
      'Gusev Crater looked like an ancient lakebed fed by a giant winding river valley called Ma\'adim Vallis.',
    weirdStuffLeftBehindFunny: [
      'The Spirit rover resting quietly at the Troy sand trap',
      'The Columbia Memorial Station lander platform',
      'The long trench gouged into the dirt by its jammed wheel'
    ],
    kidVerdict: '10/10 — Never give up, even when your wheel falls off. You might discover ancient hot springs!'
  },

  'opportunity': {
    missionId: 'opportunity',
    funnyTitle: 'Opportunity: The 14-Year Olympic Marathoner',
    funnySubtitle: 'Scored a hole-in-one in a crater on day one, and drove 45.16 kilometers across Mars for 14 years.',
    comicBadge: 'OLYMPIC MARATHONER',
    funnyHook:
      'Hello, little explorers! Opportunity landed on Mars on January 24, 2004, bouncing across Meridiani Planum and rolling right into Eagle Crater—a cosmic hole-in-one! It was supposed to work for only 90 days, but kept going for 5,111 Martian sols (almost 15 years!). Opportunity drove 45.16 kilometers, discovered "Martian blueberries" formed in water, and outlived all expectations!',
    cosmicComedyQuote: {
      speaker: 'Opportunity Rover Team',
      text: 'My battery is low and it is getting dark.',
      context: 'Poetic translation of Opportunity\'s final telemetry message before a planet-encircling dust storm in 2018'
    },
    didYouKnowFunny: [
      'Opportunity found millions of tiny round hematite spheres nicknamed "Martian Blueberries" formed in ancient water.',
      'It explored four giant craters: Eagle, Endurance, Victoria, and the massive 22-kilometer Endeavour Crater.',
      'Opportunity drove through so many dust storms that engineers called it "The Little Rover That Could".',
      'In June 2018, a catastrophic global dust storm blocked out the Sun across all of Mars, ending its 14-year mission.'
    ],
    whyTheyPickedSpotFunny:
      'Meridiani Planum was targeted because orbiters spotted gray hematite, which forms in standing liquid water.',
    weirdStuffLeftBehindFunny: [
      'Opportunity rover resting at the rim of Endeavour Crater',
      'The heat shield impact site with its discarded spring assembly',
      'Tracks across 45 kilometers of Martian sand dunes'
    ],
    kidVerdict: '11/10 — The undisputed champion of robotic planetary explorers. 14 years of pure bravery.'
  },

  'insight': {
    missionId: 'insight',
    funnyTitle: 'InSight: The Detective Who Listened to Mars!',
    funnySubtitle: 'A stationary robot with super-sensitive ears that listened to over 1,300 marsquakes and space rock impacts.',
    comicBadge: 'EARTHQUAKE SPY',
    funnyHook:
      'Hello, little explorers! My name is InSight. I am a special robot sent to Mars, but I don\'t drive around. I have a very special job: I listen to Mars! On November 26, 2018, I landed on Elysium Planitia and set down a dome instrument called SEIS with my robotic arm. It was so sensitive it could hear the ground move by the width of a single atom! I detected over 1,300 marsquakes and mapped Mars\' molten liquid core!',
    cosmicComedyQuote: {
      speaker: 'Bruce Banerdt (InSight Principal Investigator)',
      text: 'For the first time in history, we mapped the inside of another planet. Mars has a big, liquid core!',
      context: 'Announcing the internal geological map of Mars'
    },
    didYouKnowFunny: [
      'InSight heard meteoroids explode in the Martian sky and pinpointed the exact impact craters from seismic shockwaves!',
      'Its drill, "The Mole", tried to burrow 5 meters underground, but the soil was sticky like brown sugar and pushed it back out!',
      'To clean dust off solar panels, engineers told InSight\'s scoop to drop coarse sand on a windy day, blowing fine dust away like a leaf blower!'
    ],
    whyTheyPickedSpotFunny:
      'Elysium Planitia was nicknamed "the biggest parking lot on Mars" because it was flat and boulder-free, ideal for robotic arms.',
    weirdStuffLeftBehindFunny: [
      'The InSight lander body covered in red dust',
      'The SEIS dome seismometer resting quietly on the ground',
      'The HP3 heat flow drill casing in the soil'
    ],
    kidVerdict: '9.6/10 — Proved that you don\'t need wheels to do groundbreaking science. You just need very big ears!'
  },

  'ingenuity': {
    missionId: 'ingenuity',
    funnyTitle: 'Ingenuity: The Little Helicopter That Flew On Mars!',
    funnySubtitle: 'Told it was physically impossible to fly on Mars, this 1.8-kg helicopter flew 72 times and made aviation history.',
    comicBadge: 'FIRST MARS AIRCRAFT',
    funnyHook:
      'Hello, little explorers! My name is Ingenuity. I am a small helicopter, but I had a BIG dream: I wanted to fly on Mars! Mars has an atmosphere 99% thinner than Earth, so everyone said flying was impossible. On April 19, 2021, I spun my twin carbon blades at 2,400 RPM and LIFTED OFF! I became the first aircraft ever to make a powered flight on another planet! NASA planned for 5 test flights, but I flew SEVENTY-TWO TIMES!',
    cosmicComedyQuote: {
      speaker: 'MiMi Aung (Ingenuity Project Manager)',
      text: 'We can now say that human beings have flown a rotorcraft on another planet! Our Wright Brothers moment is here!',
      context: 'Celebrating Flight 1 on April 19, 2021'
    },
    didYouKnowFunny: [
      'Taped underneath Ingenuity\'s solar panel is a postage-stamp-sized piece of fabric from the wing of the 1903 Wright Brothers flyer!',
      'Its blades spun at 2,400 RPM—five times faster than an Earth helicopter—so the blade tips approached the speed of sound!',
      'It completed 72 flights, traveled 17 kilometers across Martian dunes, and stayed in the air for 128.8 minutes!',
      'Its onboard computer used a standard smartphone processor, proving phone chips can navigate an aircraft on Mars!'
    ],
    whyTheyPickedSpotFunny:
      'Jezero Crater had a flat sandy zone nicknamed "Wright Brothers Field" where Perseverance could watch Ingenuity take off safely.',
    weirdStuffLeftBehindFunny: [
      'The Ingenuity helicopter resting on its four carbon legs at Valinor Hills',
      'Its solar panel and twin carbon rotor blades',
      'The piece of 1903 Wright Brothers wing fabric'
    ],
    kidVerdict: '10/10 — The bravest, coolest little flying machine ever built by humanity.'
  },

  'near-shoemaker': {
    missionId: 'near-shoemaker',
    funnyTitle: 'NEAR Shoemaker: The Accidental Asteroid Belly-Flopper',
    funnySubtitle: 'Never designed to land, it ran out of gas and gently belly-flopped onto asteroid 433 Eros at 4 mph.',
    comicBadge: 'ASTEROID BELLY-FLOPPER',
    funnyHook:
      'NEAR Shoemaker was an orbiter. It had zero landing gear, zero landing legs, and zero airbags. When its fuel was almost gone after a year of studying asteroid 433 Eros, mission controllers looked at each other and said: "What if we just gently fly it into the asteroid?" It slowed down with its last drops of fuel and belly-flopped into the rocky asteroid at 1.9 meters per second. It survived the bump and kept transmitting signals from the surface for two weeks!',
    cosmicComedyQuote: {
      speaker: 'Dr. Robert Farquhar (Flight Director)',
      text: 'I didn\'t think it had more than a 1% chance of surviving touchdown. But there it was, sitting on an asteroid, talking to us!',
      context: 'Touching down on asteroid 433 Eros on February 12, 2001'
    },
    didYouKnowFunny: [
      'Asteroid 433 Eros is shaped like a giant potato, 34 kilometers long and covered in boulders and impact craters.',
      'Because the asteroid\'s gravity is so weak, an astronaut could jump off into outer space with a gentle leap!',
      'NEAR took close-up photos from only 120 meters away, discovering mysterious flat ponds of fine blue-gray dust.',
      'It was the very first spacecraft ever made by humans to land on an asteroid!'
    ],
    whyTheyPickedSpotFunny:
      '433 Eros was a giant near-Earth asteroid that crossed the orbit of Mars, offering pristine rubble from the birth of the solar system.',
    weirdStuffLeftBehindFunny: [
      'The NEAR Shoemaker spacecraft body resting on its solar panel edges',
      'Spectrometers resting in the asteroid dust',
      'A radio antenna that broadcast from the surface of Eros'
    ],
    kidVerdict: '9.8/10 — Crashing a spaceship on purpose at walking speed and surviving is an epic flex.'
  },

  'dawn': {
    missionId: 'dawn',
    funnyTitle: 'Dawn: The Sci-Fi Blue Ion Island Hopper',
    funnySubtitle: 'Powered by glowing blue Star Wars ion engines, it visited massive asteroid Vesta, got bored, and flew to dwarf planet Ceres.',
    comicBadge: 'ION DRIVE EXPLORER',
    funnyHook:
      'Dawn was equipped with real science-fiction propulsion: three xenon ion thrusters that glowed neon blue! Dawn was the first spacecraft in human history to enter orbit around TWO different alien worlds: it orbited giant asteroid Vesta for a year, packed its bags, fired its ion engines, and flew to dwarf planet Ceres where it discovered mysterious glowing white salt spots inside Occator Crater!',
    cosmicComedyQuote: {
      speaker: 'Dr. Marc Rayman (Chief Engineer)',
      text: 'Ion propulsion is gentle, efficient, and poetic. It doesn\'t push you with a roar; it pushes you with the force of a piece of paper resting on your hand.',
      context: 'Explaining Dawn\'s ion propulsion engine'
    },
    didYouKnowFunny: [
      'Dawn\'s ion engines consumed only 425 kg of xenon fuel to travel 6.9 billion kilometers over 11 years—unmatched fuel efficiency!',
      'On dwarf planet Ceres, Dawn spotted bright glowing white spots inside Occator Crater, confirmed to be sodium carbonate salt from an underground briny ocean!',
      'Vesta has a mountain at its south pole called Rheasilvia that is 22 kilometers high—nearly three times taller than Mount Everest on Earth!',
      'Dawn is still in orbit around Ceres today, where it will circle silently for decades.'
    ],
    whyTheyPickedSpotFunny:
      'Vesta is dry and rocky like the Moon, while Ceres is icy and wet like Europa. Visiting both revealed two completely different planetary building blocks!',
    weirdStuffLeftBehindFunny: [
      'The Dawn spacecraft in a permanent, silent orbit around Ceres',
      'Three ion thrusters and giant 19.7-meter solar panel wings',
      'Decades of detailed 3D mapping data stored in its inert memory'
    ],
    kidVerdict: '10/10 — Real Star Wars ion engines exploring giant space potatoes and glowing salt craters.'
  }
};
