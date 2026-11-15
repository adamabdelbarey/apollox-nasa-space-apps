import { Mission } from '../../types';

export const MARTIAN_MISSIONS: Mission[] = [
  {
    id: 'mars-pathfinder-sojourner',
    name: 'Mars Pathfinder',
    codeName: 'Sojourner',
    spacecraftName: 'Carl Sagan Memorial Station & Sojourner Rover',
    spacecraftType: 'Lander & Rover',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'December 4, 1996',
    landingDate: 'July 4, 1997',
    missionEndDate: 'September 27, 1997',
    coordinates: {
      lat: 19.33,
      lng: -33.55,
      elevationKm: -3.6,
      siteName: 'Ares Vallis',
      selectionReason: 'Ancient catastrophic flood channel selected because massive ancient floods deposited rocks from diverse Martian geological regions in one accessible plain.',
      geologicalFeatures: ['Ares Vallis floodplain', 'Twin Peaks hills', 'Barnacle Bill rock', 'Yogi rock'],
      nearbyMissions: []
    },
    summary: 'The pioneering low-cost Discovery mission that returned to Mars after 20 years, proving the viability of airbag landings and mobile robotic exploration with the 10.5 kg Sojourner microrover.',
    juniorHook: 'BOING! BOING! BOING! Meet Sojourner, the brave little robot the size of a microwave oven that bounced 15 times on giant airbags onto Mars and proved running water once flowed there!',
    storyTitle: 'Sojourner: The Little Robot That Visited Mars!',
    storyText: 'In 1997, NASA decided to send a spacecraft called Mars Pathfinder to explore the Red Planet with a small robotic rover named Sojourner. On July 4, 1997, the spacecraft arrived at Mars protected by a giant parachute and special airbags. It bounced on the Martian ground more than 15 times before finally stopping! Sojourner slowly rolled down a ramp and reached the surface. It moved around taking pictures and studying rocks and soil. It spent 83 days exploring Mars, discovering clues that suggested Mars may have had liquid water a long time ago. Big discoveries can start with small adventures!',
    audioUrl: '/audio/v5.mp3',
    badgeEmoji: 'Sojourner',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    modelConfig: {
      modelUrl: '/models/mer_rover.glb',
      modelType: 'gltf',
      scale: 0.85,
      position: [0, -0.2, 0],
      hotspots: [
        { id: 'apxs_sojourner', name: 'Alpha Proton X-ray Spectrometer (APXS)', position: [0, -0.1, 0.4], description: 'Instrument mounted on the rover arm that pressed against Barnacle Bill and Yogi rocks to analyze chemical composition.' },
        { id: 'solar_panel_sojourner', name: 'Gallium Arsenide Solar Array', position: [0, 0.2, 0], description: 'Flat top-mounted solar array providing 16 watts of electrical power in Martian sunlight.' },
        { id: 'rocker_bogie_sojourner', name: 'Rocker-Bogie 6-Wheel Suspension', position: [0.4, -0.2, 0], description: 'Legendary 6-wheel suspension system allowing the rover to climb over boulders larger than its own wheels without tipping!' }
      ]
    },
    technicalSpecs: {
      massKg: 'Lander: 264 kg; Sojourner Rover: 10.5 kg',
      powerSource: 'Lander: solar array + silver-zinc battery; Rover: 0.22 m² GaAs solar panel (16W)',
      missionDuration: '83 sols (Sojourner) / 85 sols (Pathfinder lander)',
      distanceTraveled: 'Sojourner drove ~100 meters around the lander',
      communicationsFreq: 'Lander-to-Earth: X-band high-gain; Rover-to-Lander: UHF radio (459.7 MHz)'
    },
    lifetime: {
      sols: 83,
      earthDays: 85,
      plannedDuration: '7 Sols (Rover) / 30 Sols (Lander)',
      achievedRatio: '1,180% (Rover) / 283% (Lander)',
      notes: 'Sojourner was planned for only 7 sols; it operated for 83 sols until the lander battery depleted in late September 1997.'
    },
    timeline: [
      { date: 'December 4, 1996', title: 'Delta II Launch', description: 'Mars Pathfinder blasts off from Cape Canaveral.', type: 'launch' },
      { date: 'July 4, 1997 (16:57 UTC)', title: 'Touchdown at Ares Vallis', description: 'Spacecraft enters atmosphere at 7.3 km/s, deploys parachute, fires retro-rockets, and bounces on giant airbags over 15 times.', type: 'landing' },
      { date: 'July 5, 1997', title: 'Sojourner Ramps Down', description: 'The 10.5 kg microrover drives down its ramp onto Martian soil.', type: 'milestone' },
      { date: 'July 6, 1997', title: 'APXS Rock Analysis', description: 'Sojourner presses its Alpha Proton X-ray Spectrometer against "Barnacle Bill", finding andesitic volcanic rock.', type: 'milestone' },
      { date: 'September 27, 1997', title: 'Final Communication', description: 'Lander transmits its 83rd sol of scientific data before extreme winter cold drains its battery.', type: 'end' },
      { date: 'March 10, 1998', title: 'Mission Concluded', description: 'NASA officially declares the end of Pathfinder operations after months of hail attempts.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Pathfinder tetrahedral lander body (Carl Sagan Memorial Station)',
        'Three opened petal solar arrays and deflated Kevlar landing airbags',
        'Sojourner 10.5 kg microrover parked near the lander'
      ],
      scientificInstruments: [
        'Alpha Proton X-ray Spectrometer (APXS)',
        'Imager for Mars Pathfinder (IMP stereoscopic camera)',
        'Atmospheric Structure Instrument / Meteorology package (ASI/MET)'
      ],
      keyDiscoveries: [
        'Demonstrated airbag landing and surface microrover mobility for low-cost planetary missions',
        'Identified andesite-like silica-rich volcanic rocks, proving complex volcanic differentiation in ancient Mars',
        'Analyzed rounded river-worn pebbles and imbricated rocks proving massive ancient catastrophic floods through Ares Vallis',
        'Returned 16,500 lander images, 550 rover images, and 8.5 million weather telemetry data points'
      ],
      ongoingSignificance: 'Sojourner proved mobile robots were the premier platform for planetary surface exploration, directly inspiring Spirit, Opportunity, Curiosity, and Perseverance.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'The Bouncing Pioneer: Mars Pathfinder & Sojourner',
        juniorTitle: 'Sojourner: The Little Robot That Visited Mars! ',
        documentaryText: 'On July 4, 1997, NASA\'s Mars Pathfinder performed a breathtaking direct-entry landing on the red floodplains of Ares Vallis. Inside was Sojourner, a 10.5 kg rover no larger than a microwave oven, ready to become the first mobile vehicle on another planet.',
        juniorText: 'Hello, little explorers! My name is Sojourner. I am a small robot, and I have a BIG story to tell you! In 1997, NASA sent a spacecraft called Mars Pathfinder to the Red Planet, and I was inside, ready for the adventure of a lifetime!',
        highlightFacts: [
          'First wheeled rover to drive on another planet',
          'Weighed only 10.5 kg (23 lb) and stood 30 cm tall',
          'Arrived directly on American Independence Day, July 4, 1997'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Discovery Paradigm: Low-Cost Mobility & Floodplain Geology',
        juniorTitle: 'Why Did I Go to Mars? ',
        documentaryText: 'NASA needed to prove that planetary missions could be built "faster, better, cheaper" without sacrificing science. Furthermore, geologists targeted Ares Vallis because catastrophic ancient floods had washed a diverse grab-bag of rocks from Mars\' highlands into one reachable spot.',
        juniorText: 'Scientists wanted to learn more about the Red Planet. They wanted to explore its rocks, study its red soil, and discover if liquid water had existed there long ago! So I was built with six little wheels and a robotic nose to sniff rocks!',
        highlightFacts: [
          'Total mission cost under $265 million (a fraction of Viking)',
          'Airbag cluster system replaced heavy descent rocket fuel',
          'Carried an APXS spectrometer to determine chemical composition of rocks'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'BOING! The Airbag Landing & Rolling Down the Ramp',
        juniorTitle: 'BOING! BOING! A Bouncy Landing! ',
        documentaryText: 'Pathfinder entered the atmosphere without entering orbit first. Enclosed in 24 interconnected Kevlar airbags, the spacecraft hit the ground at 50 km/h, bouncing 15 meters high over 15 times before settling safely. The petals unfolded, and Sojourner rolled down the ramp.',
        juniorText: 'Landing on another planet is not easy! NASA wrapped our spacecraft in giant airbags like a huge bouncy bubble! And then… BOING! BOING! BOING! We bounced on the Martian ground more than 15 times before finally stopping! What a wild landing!',
        highlightFacts: [
          'Bounced across more than 1 km of Martian surface',
          'Rocker-bogie suspension allowed rover to climb obstacles bigger than its wheels',
          'Autonomous hazard detection prevented the rover from tumbling into crevasses'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Barnacle Bill & Ancient Floods: Evidence of Liquid Water',
        juniorTitle: 'Clues of Ancient Water! ',
        documentaryText: 'Sojourner drove up to rocks named "Barnacle Bill" and "Yogi", using its APXS sensor to reveal andesitic volcanic composition. Surrounding pebbles and conglomerate rocks were tilted in the direction of ancient water currents, confirming catastrophic flooding.',
        juniorText: 'I rolled across the red ground and pressed my instrument against Martian rocks. Guess what? We found clues that suggested Mars once had roaring rivers of liquid water a long time ago! Scientists back on Earth jumped for joy!',
        highlightFacts: [
          'Identified andesitic volcanic rock high in silica',
          'Confirmed streamlined islands and flood-rounded rocks',
          'Measured daily temperature swings from -12°C in the day to -76°C at night'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Winter at Ares Vallis: The Final Transmission',
        juniorTitle: 'Why Did My Adventure End? ',
        documentaryText: 'Sojourner was designed to survive for only 7 sols, but operated for 83 sols. On September 27, 1997, the lander\'s main rechargeable battery succumbed to repeated freezing cycles, cutting off communications with Earth.',
        juniorText: 'I was only supposed to work for 7 days, but I kept exploring for 83 whole days! But on September 27, 1997, the big lander\'s battery ran out of power and the freezing cold stopped it from working. Without the lander, I couldn\'t phone home anymore.',
        highlightFacts: [
          'Exceeded planned operational lifespan by 1,180%',
          'Returned 2.3 billion bits of scientific data',
          'Officially concluded by NASA in March 1998'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Carl Sagan Memorial Station Today',
        juniorTitle: 'A Little Robot\'s Big Legacy! ',
        documentaryText: 'The Carl Sagan Memorial Station and the Sojourner rover remain resting in Ares Vallis, surrounded by the Twin Peaks in the red dust. In 2006, the Mars Reconnaissance Orbiter photographed the lander and its heat shield from orbit.',
        juniorText: 'My little rover body is still resting safely on Mars today, right next to my lander friend! I proved that small robots can do giant things. Remember, little explorer… Big discoveries can start with small adventures!',
        highlightFacts: [
          'Photographed from orbit in 2006 by HiRISE on MRO',
          'Lander named Carl Sagan Memorial Station in honor of the astronomer',
          'Coordinates: 19.33° N, 33.55° W'
        ]
      }
    ],
    instruments: [
      { id: 'apxs_sojourner', name: 'Alpha Proton X-ray Spectrometer', acronym: 'APXS', purpose: 'Determines elemental composition of rocks and soils', discovery: 'Discovered high silica andesitic rock and volcanic heterogeneity', status: 'Completed 83 sols' },
      { id: 'imp_camera', name: 'Imager for Mars Pathfinder', acronym: 'IMP', purpose: 'Stereoscopic panoramic camera and multispectral filter', discovery: 'Produced 3D panoramas and detected magnetic dust particles', status: 'Completed 85 sols' }
    ],
    artifacts: [
      { name: 'Carl Sagan Memorial Station', description: 'Tetrahedral lander base with solar petals', condition: 'Intact in Ares Vallis', coordinates: '19.33° N, 33.55° W', significance: 'First successful lander on Mars in over two decades' },
      { name: 'Sojourner Microrover', description: 'Six-wheeled rocker-bogie rover with solar panel', condition: 'Resting near Barnacle Bill rock', coordinates: 'Ares Vallis', significance: 'First wheeled vehicle to drive on another planet' }
    ]
  },
  {
    id: 'viking-1',
    name: 'Viking 1',
    spacecraftName: 'Viking 1 Orbiter & Lander',
    spacecraftType: 'Orbiter & Lander',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'August 20, 1975',
    landingDate: 'July 20, 1976',
    missionEndDate: 'November 11, 1982',
    coordinates: {
      lat: 22.483,
      lng: -47.94,
      elevationKm: -2.69,
      siteName: 'Chryse Planitia (Western slopes of Golden Plain)',
      selectionReason: 'Relocated to Chryse Planitia after orbital photography from Viking 1 Orbiter revealed that the original landing site in Chryse was dangerously rough and pitted.',
      geologicalFeatures: ['Volcanic mare plains', 'Impact craters', 'Eolian sand dunes', 'Chryse outflow deposits'],
      nearbyMissions: []
    },
    summary: 'The first fully successful Mars landing in human history. Operated on the surface for over six years (2,243 sols), returning the first color panoramas of Mars, taking weather readings, and conducting biology experiments.',
    juniorHook: 'Travel back to 1976! Viking 1 was humanity\'s first successful robotic lander on Mars, sending back the first color pictures of a rust-red Martian sunset!',
    storyTitle: 'Viking 1: Humanity\'s First Mars Touchdown!',
    storyText: 'A long time ago, scientists wanted to explore the Red Planet and learn its secrets, so NASA built Viking 1 and Viking 2. On July 20, 1976, Viking 1\'s lander separated and descended toward the surface, landing safely on Mars in Chryse Planitia! It immediately began taking pictures and sending them back to Earth. Viking 1 used its robotic arm to collect samples of Martian soil and study the atmosphere beneath the pink Martian sky. It was among the first spacecraft to explore the Red Planet so closely and prepare the way for all future Mars explorers!',
    audioUrl: '/audio/v6.mp3',
    badgeEmoji: 'Viking 1',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    technicalSpecs: {
      massKg: 'Lander: 572 kg; Orbiter: 2,328 kg (at separation)',
      powerSource: 'Two SNAP-19 Radioisotope Thermoelectric Generators (RTGs) producing ~70W',
      missionDuration: '2,243 sols / 2,307 Earth days (Lander) + 1,470 sols (Orbiter)',
      distanceTraveled: 'Stationary three-legged lander with 3-meter robotic arm',
      communicationsFreq: 'S-band & X-band via 1.5m steerable parabolic high-gain antenna'
    },
    lifetime: {
      sols: 2243,
      earthDays: 2307,
      earthYears: '6.3 years',
      plannedDuration: '90 Sols',
      achievedRatio: '2,492%',
      notes: 'Lander operated for 2,243 sols (over 6 Earth years); orbiter completed 1,485 orbits over 1,470 sols.'
    },
    timeline: [
      { date: 'August 20, 1975', title: 'Titan IIIE Launch', description: 'Viking 1 blasts off from Cape Canaveral on a 10-month voyage to Mars.', type: 'launch' },
      { date: 'June 19, 1976', title: 'Mars Orbit Insertion', description: 'Spacecraft enters Martian orbit and begins photographing the planet to select a safe landing zone.', type: 'transit' },
      { date: 'July 20, 1976 (11:53 UTC)', title: 'Historic Touchdown', description: 'Viking 1 lander touches down safely at Chryse Planitia on the 7th anniversary of Apollo 11.', type: 'landing' },
      { date: 'July 20, 1976', title: 'First Color Photo of Mars', description: 'Camera transmits humanity\'s first close-up color photograph of the Martian surface and sky.', type: 'milestone' },
      { date: 'July 28, 1976', title: 'Soil Sampling & Biology Tests', description: 'Robotic arm scoops Martian soil into three miniature automated biological laboratories.', type: 'milestone' },
      { date: 'August 7, 1980', title: 'Orbiter Depletion', description: 'Orbiter runs out of altitude control gas after completing 1,485 revolutions around Mars.', type: 'milestone' },
      { date: 'November 11, 1982', title: 'Final Lander Transmission', description: 'A faulty ground command accidentally overwrites antenna pointing software, ending communication after 6.3 years.', type: 'end' }
    ],
    legacy: {
      hardwareRemaining: [
        'Viking 1 aluminum lander body and three landing footpads',
        'Two SNAP-19 RTG nuclear power sources',
        '3-meter articulated sampling arm and trenched soil',
        'Weather instrument mast'
      ],
      scientificInstruments: [
        'Gas Chromatograph-Mass Spectrometer (GCMS)',
        'Three Biology Package experiments (Pyrolytic Release, Labeled Release, Gas Exchange)',
        'Two facsimile scanning cameras',
        'X-Ray Fluorescence Spectrometer',
        'Meteorology sensor boom'
      ],
      keyDiscoveries: [
        'First operational soft landing on Mars and first color panoramas of the Martian surface',
        'Discovered the atmosphere is 95.3% Carbon Dioxide, with atmospheric pressure of ~7.5 millibars',
        'Soil experiments revealed highly reactive chemistry (superoxides) that quickly broke down organic compounds',
        'Photographed global dust storms and measured seasonal pressure drops as carbon dioxide froze at the poles'
      ],
      ongoingSignificance: 'Formed the baseline benchmark for all future Mars surface science, geology, and astrobiological search protocols.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'The First Successful Mars Landing: Viking 1',
        juniorTitle: 'Viking 1: The First Visitor to Mars! ',
        documentaryText: 'On July 20, 1976—exactly seven years after Apollo 11\'s Moon landing—NASA\'s Viking 1 lander touched down safely in Chryse Planitia. It was humanity\'s first spacecraft to successfully land on the Red Planet, survive, and transmit science for over six years.',
        juniorText: 'Hello, little space cadets! In 1976, NASA sent a giant space explorer named Viking 1 all the way to Mars! It flew through space for almost a whole year, and on July 20, it touched down safely on the red Martian ground!',
        highlightFacts: [
          'First spacecraft to successfully land and operate on Mars',
          'Operated for over 6 Earth years (2,243 Martian sols)',
          'Captured the first clear color pictures of Martian rocks and sky'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Astrobiological Quest: Searching for Life on Mars',
        juniorTitle: 'Is There Life on Mars? ',
        documentaryText: 'Viking was conceived in the late 1960s to answer humanity\'s oldest question: Is there life on Mars? To find out, NASA built a sophisticated automated biological laboratory into the lander, equipped to test for microbial metabolism, respiration, and organic molecules.',
        juniorText: 'Scientists had one BIG question: Could tiny living microbes or creatures live on Mars? Viking 1 carried robotic arms to dig up Martian dirt and put it into tiny miniature science laboratories inside its belly to test for signs of life!',
        highlightFacts: [
          'Equipped with three biological experiments and a mass spectrometer',
          'Required automated robotic surgery on samples inside sealed chambers',
          'Lander was heat-sterilized at 111°C before launch to prevent contaminating Mars'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Orbital Reconnaissance & The Golden Plain Landing',
        juniorTitle: 'Finding a Safe Spot to Land! ',
        documentaryText: 'Originally slated to touch down on July 4, 1976, Viking 1\'s landing was postponed when the orbiter discovered the planned landing zone was hazardous. Controllers redirected the lander to the western slopes of Chryse Planitia, touching down at 11:53 UTC.',
        juniorText: 'When Viking 1 arrived at Mars, the orbiter took pictures from high in the sky and noticed the first landing spot had too many dangerous boulders! So scientists steered Viking 1 to a flatter, safer place called the Golden Plain (Chryse Planitia)!',
        highlightFacts: [
          'Avoided dangerous boulders by changing landing coordinates from orbit',
          'Aeroshell, parachute, and terminal thrusters guided lander to 2 m/s touchdown',
          'First image was received within minutes of touchdown'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Red Soil, Rust, and the Puzzle of the Biology Tests',
        juniorTitle: 'Red Soil and a Mystery! ',
        documentaryText: 'Viking 1 discovered that Mars\' sky is salmon-pink due to airborne red dust, and its soil is rich in iron oxides (rust). The biology experiments yielded unexpected chemical activity when nutrients were added, but the mass spectrometer detected no organic molecules.',
        juniorText: 'Viking 1 showed us that Mars has a salmon-pink sky and red soil filled with iron rust! When its robot arm dug into the dirt, the dirt had surprising chemical reactions, but scientists did not find any living bugs or microbes.',
        highlightFacts: [
          'Discovered that the Martian sky is pink/butterscotch, not blue',
          'Atmosphere composed of 95.3% CO2, 2.7% Nitrogen, and 1.6% Argon',
          'Soil contains high concentrations of iron, silicon, and sulfur'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'The Accidental Command & The 6-Year Silence',
        juniorTitle: 'The Long Sleep on Mars ',
        documentaryText: 'Viking 1 was planned for 90 days, but operated for over six years. On November 11, 1982, ground controllers sent an antenna software update that inadvertently overwrote the antenna pointing memory, breaking communication.',
        juniorText: 'Viking 1 was only supposed to work for 3 months, but it kept sending weather reports and pictures for over 6 YEARS! Finally, in 1982, an accidental computer code caused the antenna to turn away from Earth, and it went to sleep forever.',
        highlightFacts: [
          'Completed 2,243 Martian sols of operation',
          'SNAP-19 nuclear power sources outlived their design expectations',
          'NASA officially declared the mission over in January 1983'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Thomas Mutch Memorial Station',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Viking 1 remains on the plains of Chryse Planitia, renamed the Thomas Mutch Memorial Station in honor of the mission\'s imaging team leader. It sits silently beneath the thin Martian atmosphere, an enduring monument to robotic exploration.',
        juniorText: 'Viking 1 is still sitting quietly in the Golden Plain of Mars right now! It opened the doors to Mars exploration, and without Viking 1, none of our newer rovers would have ever made it to Mars!',
        highlightFacts: [
          'Renamed Thomas A. Mutch Memorial Station in 1981',
          'Coordinates: 22.27° N, 47.95° W',
          'Paved the way for modern robotic astrobiology'
        ]
      }
    ],
    instruments: [
      { id: 'viking1_gcms', name: 'Gas Chromatograph-Mass Spectrometer', acronym: 'GCMS', purpose: 'Identifies organic compounds in atmosphere and soil', discovery: 'Found no organic molecules above ppb thresholds', status: 'Decommissioned 1982' },
      { id: 'viking1_bio', name: 'Biology Package', acronym: 'BIO', purpose: 'Tests for living microbial metabolism and photosynthesis', discovery: 'Detected highly reactive chemical oxidants in Martian regolith', status: 'Decommissioned 1978' }
    ],
    artifacts: [
      { name: 'Viking 1 Lander Chassis', description: 'Three-legged hex-chassis with RTG power pods', condition: 'Intact at Chryse Planitia', coordinates: '22.27° N, 47.95° W', significance: 'Humanity\'s first operational lander on Mars' }
    ]
  },
  {
    id: 'viking-2',
    name: 'Viking 2',
    spacecraftName: 'Viking 2 Orbiter & Lander',
    spacecraftType: 'Orbiter & Lander',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'September 9, 1975',
    landingDate: 'September 3, 1976',
    missionEndDate: 'April 12, 1980',
    coordinates: {
      lat: 47.64,
      lng: 134.29,
      elevationKm: -4.23,
      siteName: 'Utopia Planitia',
      selectionReason: 'Northern lowlands selected to investigate polar-adjacent permafrost and search for water-ice in the Martian high latitudes.',
      geologicalFeatures: ['Periglacial patterned ground', 'Dense vesicular volcanic boulder field', 'Winter water-ice frost'],
      nearbyMissions: []
    },
    summary: 'The twin to Viking 1 that touched down 4,000 miles away in the northern plains of Utopia Planitia. Photographed seasonal water-ice frost coating the red rocks, and operated the first surface seismometer on Mars.',
    juniorHook: 'Meet Viking 2, the twin explorer that landed near Mars\' northern polar ice, photographing real water-ice frost coating the red Martian rocks in winter!',
    storyTitle: 'Viking 2: Frost Detective of Utopia Planitia!',
    storyText: 'On September 3, 1976, Viking 2\'s lander touched down safely on Mars in a different place called Utopia Planitia, about 4,000 miles away from Viking 1! Armed with scientific instruments and a robotic arm, it studied Martian weather, measured marsquakes, and even photographed winter water-ice frost coating the red landscape. Together with its orbiter, Viking 2 helped scientists make maps of almost the entire Martian surface and showed that two explorers working together can achieve amazing things!',
    audioUrl: '/audio/v7.mp3',
    badgeEmoji: 'Viking 2',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    technicalSpecs: {
      massKg: 'Lander: 572 kg; Orbiter: 2,328 kg (at launch)',
      powerSource: 'Two SNAP-19 Radioisotope Thermoelectric Generators (RTGs)',
      missionDuration: '1,281 sols / 1,316 Earth days (Lander) + 706 orbits (Orbiter)',
      distanceTraveled: 'Stationary lander with robotic sampler arm',
      communicationsFreq: 'S-band & X-band via steerable high-gain antenna'
    },
    lifetime: {
      sols: 1281,
      earthDays: 1316,
      earthYears: '3.6 years',
      plannedDuration: '90 Sols',
      achievedRatio: '1,423%',
      notes: 'Lander operated for 1,281 sols (3.6 Earth years); orbiter completed 706 orbits before propellant depletion.'
    },
    timeline: [
      { date: 'September 9, 1975', title: 'Launch', description: 'Viking 2 blasts off from Cape Canaveral aboard a Titan IIIE rocket.', type: 'launch' },
      { date: 'August 7, 1976', title: 'Mars Orbit Insertion', description: 'Orbiter enters Martian orbit to survey the northern plains.', type: 'transit' },
      { date: 'September 3, 1976 (22:37 UTC)', title: 'Touchdown at Utopia Planitia', description: 'Lander safely touches down 6,400 km from Viking 1 on a tilted boulder-strewn plain.', type: 'landing' },
      { date: 'November 1976', title: 'Seismometer Operation', description: 'Surface seismometer detects Martian winds and records one probable magnitude 2.8 marsquake.', type: 'milestone' },
      { date: 'May 1979', title: 'Water-Ice Frost Photographed', description: 'Facsimile camera captures brilliant white frost coating the rocks and soil in Martian winter.', type: 'milestone' },
      { date: 'July 25, 1978', title: 'Orbiter Depleted', description: 'Viking 2 Orbiter runs out of attitude control gas after 706 revolutions.', type: 'milestone' },
      { date: 'April 12, 1980', title: 'Lander Battery Failure', description: 'Lander battery depletion ends communications after 1,281 sols of operations.', type: 'end' }
    ],
    legacy: {
      hardwareRemaining: [
        'Viking 2 lander chassis resting at 8-degree tilt on volcanic rock',
        'RTG power modules',
        'Robotic surface sampler arm and deep soil trenches'
      ],
      scientificInstruments: [
        'Three-axis Seismometer (only working surface seismometer of the Viking mission)',
        'Facsimile scanning cameras (two)',
        'GCMS spectrometer',
        'Biology package'
      ],
      keyDiscoveries: [
        'First direct photograph of water-ice frost coating the surface of Mars in winter',
        'Operated the first working surface seismometer on Mars, measuring atmospheric coupling and seismic background',
        'Revealed polygonal patterned ground similar to permafrost patterns in Earth\'s Arctic regions'
      ],
      ongoingSignificance: 'Proved water-ice was widespread at high Martian latitudes, directly inspiring the 2008 Phoenix Polar Lander.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Viking 2 in the Northern Plains of Utopia',
        juniorTitle: 'Viking 2: The Northern Explorer! ',
        documentaryText: 'Viking 2 touched down in the northern hemisphere at Utopia Planitia on September 3, 1976. Resting at an 8-degree tilt against a boulder, the lander explored a radically different terrain than its twin, surrounded by pitted volcanic rocks and vast expanses of northern plains.',
        juniorText: 'While Viking 1 landed in the sunny Golden Plain, its twin brother Viking 2 flew high up to the cold northern plains called Utopia Planitia! It landed right on a field of red boulders on September 3, 1976!',
        highlightFacts: [
          'Landed 6,400 km (4,000 miles) northeast of Viking 1',
          'Landed with an 8-degree tilt on rocky terrain',
          'Operated for over 3.6 Earth years (1,281 sols)'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'Sampling the High Latitudes: Searching for Polar Permafrost',
        juniorTitle: 'Looking for Ice on Mars! ',
        documentaryText: 'Scientists targeted 48° North latitude to investigate whether the northern plains contained higher moisture content and subsurface permafrost. Viking 2\'s seismometer was also mounted on the lander body, unlike Viking 1\'s which failed to uncage.',
        juniorText: 'Scientists wanted to know: Is there frozen ice near the North Pole of Mars? Viking 2 had a special robotic arm with a scoop to dig down and search for frozen water hidden beneath the surface!',
        highlightFacts: [
          'High northern latitude of 47.97° N',
          'Working seismometer to listen for Marsquakes',
          'Duplicated biology experiments to cross-check Viking 1 results'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Descent to Utopia: Surrounded by Volcanic Boulders',
        juniorTitle: 'A Bouldery Landing! ',
        documentaryText: 'Viking 2 touched down smoothly, with one footpad resting atop a large rock. When the cameras scanned the horizon, scientists were astonished to see hundreds of pitted basaltic boulders stretching as far as the eye could see, resembling an extraterrestrial desert.',
        juniorText: 'Touchdown! When Viking 2\'s cameras opened their eyes, they saw hundreds of red, bumpy rocks scattered across the red dirt! The robotic arm pushed aside rocks and dug deep trenches to collect soil.',
        highlightFacts: [
          'Touchdown radar operated flawlessly in the thin atmosphere',
          'Pitted vesicular rocks formed by ancient volcanic lava flows',
          'Dug trenches into both open soil and underneath protective rocks'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Snow on Mars: The Discovery of Winter Frost',
        juniorTitle: 'White Frost on the Red Rocks! ',
        documentaryText: 'In May 1979, during Martian northern winter, Viking 2\'s cameras captured a breathtaking scene: a thin white layer of frost coated the rocks and soil. Spectral and temperature analysis proved it was true water-ice frost mixed with frozen carbon dioxide!',
        juniorText: 'One day in the freezing Martian winter, something magical happened! Viking 2 took a picture and saw glistening white frost covering the rocks and dirt! It proved that real water-ice exists on Mars!',
        highlightFacts: [
          'Frost was only about one-thousandth of an inch thick',
          'First direct photographic proof of water-ice frost on Mars',
          'Seismometer detected vibrations from fierce 120 km/h Martian dust storms'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Four Years of Northern Science',
        juniorTitle: 'Goodnight, Northern Explorer ',
        documentaryText: 'Viking 2\'s orbiter ran out of attitude control nitrogen gas in July 1978. The lander soldiered on until April 12, 1980, when its rechargeable batteries finally degraded from extreme cold cycles and failed.',
        juniorText: 'Viking 2 was only supposed to live for 90 days, but it lasted for almost 4 years! In April 1980, its batteries finally ran out of juice, and the cold northern winds lulled the brave lander to sleep.',
        highlightFacts: [
          'Lander transmitted for 1,281 Martian sols',
          'Orbiter completed 706 revolutions mapping the planet',
          'Returned 16,000 images of the northern plains'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Viking 2 in the Frost Today',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Viking 2 sits tilted in Utopia Planitia today, periodically dusted by light winter frost and swept by summer dust devils, preserving its position at coordinates 47.97° N, 134.26° E.',
        juniorText: 'Viking 2 is still resting in the quiet northern plains of Mars today! Every winter, the glistening white frost covers its metal body, just like it did decades ago.',
        highlightFacts: [
          'Coordinates: 47.97° N, 134.26° E',
          'Surrounded by polygon cracked permafrost terrain',
          'Direct precursor to the Phoenix Mars Lander'
        ]
      }
    ],
    instruments: [
      { id: 'viking2_seis', name: 'Three-Axis Seismometer', acronym: 'SEIS', purpose: 'Measures internal ground tremors and wind vibrations', discovery: 'Recorded first surface seismology data from Mars', status: 'Operated until 1979' },
      { id: 'viking2_cam', name: 'Facsimile Cameras', acronym: 'CAM', purpose: 'High-resolution line-scan panoramic photography', discovery: 'Captured the iconic winter water-ice frost sequence', status: 'Decommissioned 1980' }
    ],
    artifacts: [
      { name: 'Viking 2 Lander Body', description: 'Three-legged titanium/aluminum lander chassis', condition: 'Intact at Utopia Planitia', coordinates: '47.97° N, 134.26° E', significance: 'First spacecraft to detect water-ice frost on Mars' }
    ]
  },
  {
    id: 'spirit',
    name: 'Spirit',
    codeName: 'MER-A',
    spacecraftName: 'Mars Exploration Rover Spirit',
    spacecraftType: 'Rover',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'June 10, 2003',
    landingDate: 'January 4, 2004',
    missionEndDate: 'March 22, 2010 (officially concluded May 25, 2011)',
    coordinates: {
      lat: -14.5692,
      lng: 175.4729,
      elevationKm: -1.9,
      siteName: 'Gusev Crater (Columbia Memorial Station)',
      selectionReason: 'Massive 166-km wide ancient impact crater with an enormous dried river inlet channel (Ma\'adim Vallis) indicating it once held a giant crater lake.',
      geologicalFeatures: ['Columbia Hills (Husband Hill)', 'Home Plate volcanic plateau', 'Bonneville Crater', 'Troy sand trap'],
      nearbyMissions: []
    },
    summary: 'NASA\'s twin robotic field geologist that explored Gusev Crater for over six years (2,208 sols). Clambered to the summit of Husband Hill and unearthed 90% pure silica with a disabled wheel, proving ancient hydrothermal hot springs.',
    juniorHook: 'Meet Spirit, the brave robot twin that climbed giant Martian hills! Even when its front wheel broke and got stuck, it dragged it through the dirt and accidentally made one of the greatest water discoveries in space history!',
    storyTitle: 'Spirit: The Unstoppable Mars Twin!',
    storyText: 'In 2004, NASA sent robot twins Spirit and Opportunity to search for signs of ancient water on Mars. On January 3, 2004, Spirit landed inside Gusev Crater. Spirit was only supposed to work for 90 days, but kept exploring for over six years! When its right front wheel jammed in soft sand, engineers drove Spirit backwards dragging the stuck wheel. This dragged open the red soil, revealing bright white silica from ancient hot springs! Spirit proved that even when things get tough, perseverance leads to great discoveries.',
    audioUrl: '/audio/v8.mp3',
    badgeEmoji: 'Spirit',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    modelConfig: {
      modelUrl: '/models/mer_rover.glb',
      modelType: 'gltf',
      scale: 0.85,
      position: [0, -0.2, 0],
      hotspots: [
        { id: 'pancam_mast', name: 'Pancam Mast Assembly', position: [0, 0.75, 0.2], description: 'Stereoscopic panoramic cameras sitting at human eye height (1.5m) to survey the landscape.' },
        { id: 'solar_wings', name: 'Solar Array Wings', position: [0, 0.35, -0.1], description: 'Triple-junction solar panels generating up to 140 Watts, periodically cleaned by Martian dust devils!' },
        { id: 'robotic_arm', name: 'Instrument Deployment Device (IDD)', position: [0.35, 0.15, 0.45], description: 'Five-jointed robotic arm carrying the APXS, Microscopic Imager, and Rock Abrasion Tool (RAT).' },
        { id: 'stuck_wheel', name: 'Right Front Wheel', position: [0.55, -0.2, 0.4], description: 'Failed in 2006; dragging it backwards through the dirt scraped away topsoil to unearth pure white silica!' }
      ]
    },
    technicalSpecs: {
      massKg: '185 kg (408 lb)',
      powerSource: '1.3 m² triple-junction solar array + Two 8-Ah lithium-ion batteries',
      missionDuration: '2,208 sols / 2,269 Earth days (6.2 years)',
      distanceTraveled: '7.73 km (4.80 miles) driven across Martian terrain',
      communicationsFreq: 'X-band direct-to-Earth + UHF via Mars Odyssey & MRO orbiters'
    },
    lifetime: {
      sols: 2208,
      earthDays: 2269,
      earthYears: '6.2 years',
      plannedDuration: '90 Sols',
      achievedRatio: '2,453%',
      notes: 'Designed for a 90-sol mission; operated for 2,208 sols (over 6 Earth years) and climbed 100 meters up Husband Hill!'
    },
    timeline: [
      { date: 'June 10, 2003', title: 'Delta II Heavy Launch', description: 'Spirit launches from Cape Canaveral on its 7-month voyage.', type: 'launch' },
      { date: 'January 4, 2004 (04:35 UTC)', title: 'Touchdown at Gusev Crater', description: 'Airbags bounce Spirit safely inside Gusev Crater at Columbia Memorial Station.', type: 'landing' },
      { date: 'June 2004', title: 'Arrival at Columbia Hills', description: 'Rover drives 3 km across volcanic plains to begin climbing Husband Hill.', type: 'milestone' },
      { date: 'August 2005', title: 'Summit of Husband Hill', description: 'Spirit reaches the top of Husband Hill, 100m above the plains, photographing a 360° panorama.', type: 'milestone' },
      { date: 'March 2006', title: 'Right Front Wheel Fails', description: 'Front drive motor burns out; drivers navigate rover backwards, dragging the dead wheel.', type: 'milestone' },
      { date: 'May 2007', title: 'Discovery of Pure Silica', description: 'Dragged wheel scrapes trench into soil at Home Plate, revealing 90% pure silica from ancient hot springs.', type: 'milestone' },
      { date: 'May 2009', title: 'Trapped in Sand at Troy', description: 'Wheels break through crust into loose sulfate sand; rover transitions to stationary research station.', type: 'milestone' },
      { date: 'March 22, 2010', title: 'Final Transmission', description: 'Extreme Martian winter lowers solar power; Spirit sends its final signal before hibernation.', type: 'end' },
      { date: 'May 25, 2011', title: 'Mission Concluded', description: 'After 1,200 recovery commands, NASA officially concludes Spirit operations.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Spirit rover resting at the Troy sand trap in Gusev Crater',
        'Lander petals and deflated airbags at Columbia Memorial Station',
        'Trench scars in the silica-rich soil at Home Plate'
      ],
      scientificInstruments: [
        'Panoramic Camera (Pancam)',
        'Miniature Thermal Emission Spectrometer (Mini-TES)',
        'Alpha Particle X-ray Spectrometer (APXS)',
        'Mössbauer Spectrometer',
        'Microscopic Imager (MI)',
        'Rock Abrasion Tool (RAT)'
      ],
      keyDiscoveries: [
        'Broken front wheel unearthed 90% pure silica soil, proving ancient volcanic fumaroles or hot springs with liquid water',
        'Discovered Comanche rock outcrop rich in magnesium-iron carbonates, proving ancient neutral, habitable water',
        'First vehicle to summit a mountain on another planet (Husband Hill)',
        'Captured dynamic movies of dust devils sweeping across the Martian landscape'
      ],
      ongoingSignificance: 'Confirmed that early Mars had active hydrothermal systems where microbial life could have flourished.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Spirit: The Mountain Climber of Gusev Crater',
        juniorTitle: 'Spirit: The Mountain Climbing Robot! ',
        documentaryText: 'On January 4, 2004, the first of NASA\'s Mars Exploration Rover twins, Spirit (MER-A), bounced to a halt inside the vast basin of Gusev Crater. Built to search for evidence of ancient water, Spirit became a mountain-climbing robotic geologist.',
        juniorText: 'Hello, little explorers! My name is Spirit. In 2004, NASA sent me and my twin brother Opportunity on a giant adventure to Mars! I landed inside a giant crater called Gusev Crater, ready to look for signs of ancient water!',
        highlightFacts: [
          'First of the twin Mars Exploration Rovers (MER-A)',
          'Equipped with 6-wheel drive and rocker-bogie suspension',
          'Named by 9-year-old orphan Sofi Collis in a NASA essay contest'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Search for Lake Gusev: Following the Water',
        juniorTitle: 'Why Did I Go to Mars? ',
        documentaryText: 'Orbital images showed a gargantuan canyon, Ma\'adim Vallis, draining directly into Gusev Crater. Scientists believed Gusev once held a massive crater lake. Spirit was dispatched to find sedimentary lake-bed deposits.',
        juniorText: 'Scientists looked at satellite pictures of Gusev Crater and noticed a giant dried-up river channel leading right into it! They thought: Was this whole crater once a giant swimming pool filled with water? I went to find out!',
        highlightFacts: [
          'Gusev Crater is 166 km across, larger than the state of Connecticut',
          'Equipped with the Rock Abrasion Tool (RAT) to grind into pristine rock interiors',
          'Designed to operate for 90 Martian sols'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'From the Basalt Plains to the Summit of Husband Hill',
        juniorTitle: 'Climbing a Giant Mountain! ',
        documentaryText: 'The plains around the lander proved to be dry volcanic basalt with little water alteration. Undeterred, team controllers steered Spirit 3 kilometers toward the Columbia Hills. Spirit ascended over 100 vertical meters up Husband Hill, finding highly altered rocks.',
        juniorText: 'I started driving across the red plains. At first, the ground was just dry volcanic rocks. But then I saw huge mountains in the distance called the Columbia Hills! I drove all the way up to the very top of Husband Hill—100 meters high!',
        highlightFacts: [
          'First rover to climb a mountain on another world',
          'Dust devils periodically cleaned Spirit\'s solar panels, extending its life for years',
          'Traveled 7.73 km (4.8 miles) over its lifetime'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'The Serendipity of a Broken Wheel: Discovering Ancient Hot Springs',
        juniorTitle: 'My Broken Wheel Made History! ',
        documentaryText: 'In March 2006, Spirit\'s right front drive motor ceased functioning. Drivers were forced to drive the rover in reverse, dragging the dead wheel. Near Home Plate, the dragged wheel churned through the topsoil, uncovering brilliant white 90% pure silica—the undeniable signature of ancient volcanic hot springs.',
        juniorText: 'One day, my front right wheel stopped spinning! I had to drive backwards, dragging the stuck wheel behind me. But guess what? While dragging through the dirt, my stuck wheel scraped away the topsoil and uncovered brilliant white powder: pure silica from ancient bubbling hot springs! My broken wheel made one of the greatest space discoveries ever!',
        highlightFacts: [
          '90% pure silica could only form in active hot springs or volcanic steam vents',
          'Proved ancient hydrothermal environments on Mars identical to Yellowstone',
          'Discovered Comanche carbonates proving non-acidic, life-friendly water'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'The Sand Trap at Troy & The Long Winter',
        juniorTitle: 'Stuck in Soft Sand ',
        documentaryText: 'In May 2009, while traveling past Home Plate, Spirit\'s wheels broke through an unseen crust into treacherous hidden sulfate sand at a site called Troy. Unable to tilt its solar panels toward the sun during the harsh Martian winter, Spirit transmitted its final signal on March 22, 2010.',
        juniorText: 'After years of exploring, I hit a patch of super-soft hidden sand at a place called Troy. My wheels spun, but I got stuck. When the cold dark winter came, my solar panels couldn\'t catch enough sunlight. On March 22, 2010, I sent my last message to Earth and fell asleep.',
        highlightFacts: [
          'Operated for 2,208 sols (over 24 times its design lifetime)',
          'Attempted hundreds of extraction maneuvers before winter',
          'NASA sent over 1,200 commands to wake Spirit before concluding the mission in 2011'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Columbia Memorial Station & Spirit at Troy',
        juniorTitle: 'Spirit\'s Resting Place ',
        documentaryText: 'Spirit rests at Troy on the edge of Home Plate in Gusev Crater, pointing west. Its tracks still stretch across the Columbia Hills, preserved in the thin atmosphere as a testament to the little rover that would not quit.',
        juniorText: 'My rover body is still resting at Troy on Mars today! My tire tracks are still on the side of Husband Hill. I showed everyone that even when things break, you can still make amazing discoveries. Never give up!',
        highlightFacts: [
          'Resting at coordinates -14.5684° S, 175.4726° E',
          'Columbia Memorial Station honors the STS-107 space shuttle crew',
          'Legacy directly inspired Curiosity\'s investigation of ancient habitable lakes'
        ]
      }
    ],
    instruments: [
      { id: 'spirit_pancam', name: 'Panoramic Camera (Pancam)', acronym: 'Pancam', purpose: 'High-resolution color 3D imaging', discovery: 'Mapped Columbia Hills and filmed Martian dust devils', status: 'Operated 2,208 sols' },
      { id: 'spirit_apxs', name: 'Alpha Particle X-ray Spectrometer', acronym: 'APXS', purpose: 'Elemental composition of rocks', discovery: 'Verified 90% silica at Home Plate hot spring site', status: 'Operated 2,208 sols' },
      { id: 'spirit_rat', name: 'Rock Abrasion Tool', acronym: 'RAT', purpose: 'Diamond-tipped grinder to remove dust and weathering rind', discovery: 'Ground into dozens of rocks to reveal unweathered interiors', status: 'Operated 2,208 sols' }
    ],
    artifacts: [
      { name: 'Spirit Rover Chassis', description: 'Six-wheeled rover with solar arrays and instrument mast', condition: 'Resting in sand at Troy', coordinates: '-14.5684° S, 175.4726° E', significance: 'Climbed the first off-world mountain and discovered Martian hot springs' }
    ]
  },
  {
    id: 'opportunity',
    name: 'Opportunity',
    codeName: 'MER-B "Oppy"',
    spacecraftName: 'Mars Exploration Rover Opportunity',
    spacecraftType: 'Rover',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'July 7, 2003',
    landingDate: 'January 25, 2004',
    missionEndDate: 'June 10, 2018 (officially concluded February 13, 2019)',
    coordinates: {
      lat: -1.9462,
      lng: 354.4734,
      elevationKm: -1.4,
      siteName: 'Meridiani Planum (Challenger Memorial Station)',
      selectionReason: 'Strong orbital signature of crystalline grey hematite detected by Mars Global Surveyor, a mineral that almost exclusively precipitates in liquid water on Earth.',
      geologicalFeatures: ['Eagle Crater hole-in-one landing', 'Endurance Crater', 'Victoria Crater', 'Endeavour Crater (Perseverance Valley)'],
      nearbyMissions: []
    },
    summary: 'The greatest endurance explorer in space history. Operated for 5,110 sols (over 14 Earth years), drove a marathon of 45.16 km, discovered hematite "blueberries" proving ancient groundwater, and explored massive craters across the plains of Meridiani.',
    juniorHook: 'Meet Oppy, the space marathon champion! Planned to live for only 90 days, Opportunity explored Mars for over 14 YEARS, drove 45 kilometers, and found tiny "blueberries" that proved Mars once had vast oceans of water!',
    storyTitle: 'Opportunity: The Marathon Runner of Mars!',
    storyText: 'On January 24, 2004, Opportunity landed on the other side of Mars in Meridiani Planum. Built for a 90-day mission, this intrepid rover explored Mars for almost 15 years! Opportunity traveled a record-breaking 45.16 kilometers across the Red Planet—further than any other wheeled vehicle in history off Earth. It discovered hematite blueberries and ancient lakebeds that proved Mars once had bodies of liquid water. Opportunity proved that you don\'t have to be big to do something truly great!',
    audioUrl: '/audio/v9.mp3',
    badgeEmoji: 'Opportunity',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    modelConfig: {
      modelUrl: '/models/mer_rover.glb',
      modelType: 'gltf',
      scale: 0.85,
      position: [0, -0.2, 0],
      hotspots: [
        { id: 'pancam_oppy', name: 'Pancam Mast', position: [0, 0.75, 0.2], description: 'Captured over 217,000 photos across 45 kilometers of Martian exploration.' },
        { id: 'solar_oppy', name: 'Solar Array', position: [0, 0.35, -0.1], description: 'Powered Oppy for 5,110 sols before the planet-encircling dust storm of 2018.' },
        { id: 'wheels_oppy', name: 'Drive Wheels', position: [0.55, -0.2, 0.4], description: 'Drove 45.16 km (28 miles)—the all-time off-world driving record for any vehicle in history!' }
      ]
    },
    technicalSpecs: {
      massKg: '185 kg (408 lb)',
      powerSource: 'Triple-junction GaAs solar array producing up to 140 Watts',
      missionDuration: '5,110 sols / 5,250 Earth days (14.4 years)',
      distanceTraveled: '45.16 km (28.06 miles) — All-time off-world distance record!',
      communicationsFreq: 'X-band direct-to-Earth + UHF relay through Odyssey, MRO, and Mars Express'
    },
    lifetime: {
      sols: 5110,
      earthDays: 5250,
      earthYears: '14.4 years',
      plannedDuration: '90 Sols',
      achievedRatio: '5,677%',
      notes: 'Planned for 90 sols; drove 45.16 km across Mars over 14.4 Earth years! Completed first off-world marathon (42.195 km) in 2015.'
    },
    timeline: [
      { date: 'July 7, 2003', title: 'Launch', description: 'Opportunity launches aboard a Delta II rocket from Cape Canaveral.', type: 'launch' },
      { date: 'January 25, 2004 (05:05 UTC)', title: 'Hole-In-One Landing', description: 'Airbags bounce directly into Eagle Crater on Meridiani Planum.', type: 'landing' },
      { date: 'February 2004', title: 'Discovery of "Blueberries"', description: 'Microscopic Imager photographs millions of tiny hematite spheres formed in ancient groundwater.', type: 'milestone' },
      { date: 'May 2004', title: 'Endurance Crater Exploration', description: 'Drives down steep 20-degree slopes into Endurance crater to examine layered rock history.', type: 'milestone' },
      { date: 'September 2006', title: 'Arrival at Victoria Crater', description: 'Reaches the 750m wide Victoria crater after a multi-kilometer trek.', type: 'milestone' },
      { date: 'August 2011', title: 'Arrival at Endeavour Crater', description: 'Arrives at the ancient 22-km wide Endeavour crater, finding gypsum veins formed by fresh water.', type: 'milestone' },
      { date: 'March 24, 2015', title: 'Olympic Marathon Completed', description: 'Oppy crosses the 42.195 km (26.2 mile) mark, completing the first marathon on another planet.', type: 'milestone' },
      { date: 'June 10, 2018', title: 'Planet-Encircling Dust Storm', description: 'A cataclysmic global dust storm blocks 99% of sunlight; Opportunity transmits its final message.', type: 'end' },
      { date: 'February 13, 2019', title: 'Mission Concluded', description: 'After more than 1,000 recovery signals, NASA officially concludes Opportunity\'s historic 15-year voyage.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Opportunity rover parked in Perseverance Valley at Endeavour Crater',
        'Lander petals inside Eagle Crater (Challenger Memorial Station)',
        'Heat shield impact crater and debris field on Meridiani Planum'
      ],
      scientificInstruments: [
        'Panoramic Camera (Pancam)',
        'Mini-TES infrared spectrometer',
        'Microscopic Imager (MI)',
        'Mössbauer Spectrometer',
        'APXS spectrometer',
        'Rock Abrasion Tool (RAT)'
      ],
      keyDiscoveries: [
        'Discovered hematite spherules ("blueberries") that proved liquid groundwater soaked the Martian surface for extended epochs',
        'Identified layered sulfate sedimentary rocks containing cross-bedding and ripple marks formed by ancient flowing surface water',
        'Discovered pure gypsum veins at Endeavour Crater, proving neutral, drinkable fresh water once flowed through subterranean fractures',
        'Completed 45.16 km of driving, setting the off-world driving record for all human space exploration'
      ],
      ongoingSignificance: 'Opportunity\'s 14-year odyssey proved beyond any doubt that Mars was once a wet, dynamic world capable of supporting microbial life.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Opportunity: The Marathon Runner of Mars',
        juniorTitle: 'Opportunity: The Ultimate Space Marathon Runner! ',
        documentaryText: 'On January 25, 2004, Mars Exploration Rover Opportunity (MER-B) executed a literal "hole-in-one" landing, rolling to a stop inside the 22-meter wide Eagle Crater on the vast, flat plains of Meridiani Planum.',
        juniorText: 'Hello, little explorers! My name is Opportunity, but my friends call me Oppy! In 2004, I landed on Mars by bouncing on giant airbags right into the middle of a tiny crater—like hitting a hole-in-one in space golf!',
        highlightFacts: [
          'Landed inside Eagle Crater on Meridiani Planum',
          'Operated for 5,110 Martian sols (over 14 Earth years!)',
          'Drove 45.16 kilometers (28 miles)—the all-time driving record on another planet'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Hematite Clue: Hunting for an Ancient Ocean',
        juniorTitle: 'Why Did NASA Send Me? ',
        documentaryText: 'NASA sent Opportunity to Meridiani Planum because orbiters had detected huge expanses of crystalline grey hematite—a mineral that on Earth almost exclusively precipitates out of standing pools of liquid water.',
        juniorText: 'Scientists sent me to a special flat place called Meridiani Planum because satellites saw clues of a mineral called hematite. On Earth, hematite almost always forms in lakes or oceans of water! I was sent to investigate!',
        highlightFacts: [
          'Targeted orbital hematite spectral signature',
          'Equipped with identical science suite to twin rover Spirit',
          'Mission design goal: 90 sols and 600 meters of driving'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'The Martian Blueberries & The Marathon Trek',
        juniorTitle: 'Martian Blueberries & Driving a Marathon! ',
        documentaryText: 'Immediately upon opening its cameras, Opportunity spotted layered bedrock. Its microscopic camera discovered millions of BB-sized spherical hematite granules nicknamed "blueberries", formed inside ancient soaking groundwater.',
        juniorText: 'When I looked at the ground with my magnifying camera, I saw something amazing: millions of tiny round balls that looked like little blueberries! They were formed by ancient underground water billions of years ago! Then I drove across Mars for over 42 kilometers—a full Olympic marathon!',
        highlightFacts: [
          'Discovered hematite blueberries in Eagle Crater outcrop',
          'Drove across Endurance, Victoria, and Endeavour craters',
          'Passed the 42.195 km marathon milestone on March 24, 2015'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Ancient Water Confirmed: From Acid Seas to Fresh Springs',
        juniorTitle: 'Proof of Ancient Water! ',
        documentaryText: 'At Eagle and Endurance craters, Opportunity found sulfate salts and cross-bedding formed in acidic standing water. Years later, on the rim of Endeavour crater, Oppy uncovered veins of bright white gypsum, proving neutral, drinkable water had also flowed.',
        juniorText: 'Every crater I explored revealed clues of ancient water! Some rocks showed ripple marks from ancient flowing currents, and other rocks had white veins of gypsum that could only form in pure, drinkable fresh water! Mars was once a wet, wonderful world!',
        highlightFacts: [
          'Proved ancient episodic shallow lakes and groundwater saturation',
          'Gypsum vein at "Homestake" confirmed neutral pH water',
          'Returned over 217,000 raw scientific images'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'The Great Dust Storm of 2018: A Heroic Farewell',
        juniorTitle: 'The Giant Dust Storm ',
        documentaryText: 'In June 2018, a massive planet-encircling dust storm blotted out the sun over Meridiani Planum, reducing daylight by 99%. Opportunity\'s solar panels could no longer charge its batteries. On June 10, 2018, Oppy transmitted its final message before slipping into permanent silence.',
        juniorText: 'After almost 15 years of exploring, a giant, planet-sized dust storm covered the Martian sky. It blocked out all the warm sunlight my solar panels needed. On June 10, 2018, I sent my last message home to my human friends. My mission was over, but what an adventure!',
        highlightFacts: [
          'Exceeded planned operational lifetime by 5,677%',
          'Survived deep sand traps and lost steering in two wheels',
          'Officially commemorated by NASA on February 13, 2019'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Perseverance Valley: The Final Resting Place',
        juniorTitle: 'Oppy\'s Eternal Resting Place ',
        documentaryText: 'Opportunity rests today on the western slope of Perseverance Valley on the rim of Endeavour Crater. Its solar panels remain tilted toward the Martian sky, an eternal monument to curiosity and human ingenuity.',
        juniorText: 'My rover body is resting in Perseverance Valley on the rim of a giant crater on Mars right now! I worked for 14 years, drove 45 kilometers, and helped humanity discover the ancient secrets of Mars. Remember: You don\'t have to be big to do something GREAT!',
        highlightFacts: [
          'Resting at coordinates -1.9462° S, 354.4734° E in Perseverance Valley',
          'Drove 45.16 km, surpassing Soviet Lunokhod 2\'s previous off-world record',
          'Inspired an entire generation of space scientists and engineers'
        ]
      }
    ],
    instruments: [
      { id: 'oppy_pancam', name: 'Panoramic Camera', acronym: 'Pancam', purpose: 'High-resolution multispectral 3D panoramic imaging', discovery: 'Returned 217,000+ photos across 45 km of traverse', status: 'Operated 5,110 sols' },
      { id: 'oppy_mi', name: 'Microscopic Imager', acronym: 'MI', purpose: 'Extreme close-up photography of rock grains', discovery: 'Discovered the hematite blueberries', status: 'Operated 5,110 sols' },
      { id: 'oppy_apxs', name: 'Alpha Particle X-ray Spectrometer', acronym: 'APXS', purpose: 'Elemental chemistry analysis', discovery: 'Identified gypsum mineral veins formed in neutral water', status: 'Operated 5,110 sols' }
    ],
    artifacts: [
      { name: 'Opportunity Rover', description: 'Six-wheeled rover parked on Endeavour Crater rim', condition: 'Intact in Perseverance Valley', coordinates: '-1.9462° S, 354.4734° E', significance: 'All-time off-world distance record holder (45.16 km)' }
    ]
  },
  {
    id: 'insight',
    name: 'InSight',
    codeName: 'SEIS & HP3',
    spacecraftName: 'InSight Mars Lander',
    spacecraftType: 'Lander',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'May 5, 2018',
    landingDate: 'November 26, 2018',
    missionEndDate: 'December 15, 2022 (officially concluded December 21, 2022)',
    coordinates: {
      lat: 4.502384,
      lng: 135.623447,
      elevationKm: -2.61,
      siteName: 'Elysium Planitia',
      selectionReason: 'Ultra-flat, rock-free "parking lot" of Mars chosen specifically because the seismometer and heat-flow probe required smooth, soft terrain free of rocky obstructions.',
      geologicalFeatures: ['Elysium volcanic plains', 'Homestead hollow shallow crater', 'Corinto crater impact ejecta'],
      nearbyMissions: []
    },
    summary: 'The revolutionary geophysical lander that peered into the deep interior of Mars. Used an ultra-sensitive seismometer to listen to over 1,300 Marsquakes, mapped the thickness of the Martian crust, and measured the size of Mars\' molten liquid core.',
    juniorHook: 'Listen closely! InSight was a special robot doctor with giant mechanical ears that pressed against the Martian soil to listen to Marsquakes deep inside the planet!',
    storyTitle: 'InSight: The Detective Who Listened to Mars!',
    storyText: 'InSight arrived on Mars on November 26, 2018, landing on the flat plains of Elysium Planitia. What made InSight different from all other rovers? It did not drive around—it stayed in one place to listen to the inside of Mars! InSight placed an ultra-sensitive seismometer on the ground like a doctor\'s stethoscope. It detected over 1,300 marsquakes and meteorite strikes, helping scientists discover what lies deep beneath the Martian crust. Sometimes, you don\'t need to travel far to discover something amazing—you just need to listen carefully!',
    audioUrl: '/audio/v10.mp3',
    badgeEmoji: 'InSight',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    modelConfig: {
      modelUrl: '/models/insight.glb',
      modelType: 'gltf',
      scale: 0.9,
      position: [0, -0.3, 0],
      hotspots: [
        { id: 'seis_dome', name: 'SEIS Dome Seismometer', position: [0.65, -0.25, 0.4], description: 'French ultra-sensitive seismometer placed directly on the soil under a thermal wind shield to detect tiny ground tremors.' },
        { id: 'solar_discs', name: 'Circular Solar Panels', position: [0, 0.2, 0], description: 'Two 2.2-meter circular UltraFlex solar arrays that unfurled like round paper fans.' },
        { id: 'robotic_arm_insight', name: 'Instrument Deployment Arm (IDA)', position: [0.35, 0.1, 0.2], description: '1.9-meter robotic arm with a motorized claw that lifted SEIS and the heat probe off the deck and onto the ground.' },
        { id: 'hp3_mole', name: 'HP3 Heat Flow Probe', position: [0.55, -0.25, -0.3], description: 'German self-hammering "mole" probe designed to measure internal heat flowing from Mars\' core.' }
      ]
    },
    technicalSpecs: {
      massKg: '358 kg (lander on surface)',
      powerSource: 'Two 2.2-meter diameter circular UltraFlex solar arrays (~600W clean)',
      missionDuration: '1,440 sols / 1,482 Earth days (4.1 years)',
      distanceTraveled: 'Stationary geophysical lander (1.9m robotic arm deployment radius)',
      communicationsFreq: 'X-band direct-to-Earth + UHF relay via Mars Reconnaissance Orbiter and Odyssey'
    },
    lifetime: {
      sols: 1440,
      earthDays: 1482,
      earthYears: '4.1 years',
      plannedDuration: '708 Sols (1 Mars year)',
      achievedRatio: '203%',
      notes: 'Operated for 1,440 sols (over 4 Earth years), listening to more than 1,300 Marsquakes until dust choked its solar panels in December 2022.'
    },
    timeline: [
      { date: 'May 5, 2018', title: 'Atlas V Launch', description: 'InSight launches from Vandenberg Air Force Base—the first interplanetary launch from the US West Coast.', type: 'launch' },
      { date: 'November 26, 2018 (19:52 UTC)', title: 'Touchdown at Elysium Planitia', description: 'Pulsed retro-rockets softly set InSight down in a smooth depression called Homestead Hollow.', type: 'landing' },
      { date: 'December 19, 2018', title: 'SEIS Deployed to Surface', description: 'Robotic arm lifts the SEIS seismometer and places it gently onto the Martian soil.', type: 'milestone' },
      { date: 'April 6, 2019', title: 'First Marsquake Detected', description: 'SEIS records its first historic marsquake rumbling deep inside the planet.', type: 'milestone' },
      { date: 'December 24, 2021', title: 'Meteoroid Impact Excavates Ice', description: 'Records seismic waves from a meteoroid impact 3,500 km away that blasted out boulders of subsurface water-ice.', type: 'milestone' },
      { date: 'May 4, 2022', title: 'Monster Magnitude 4.7 Marsquake', description: 'Records the largest tremor ever detected on another planet, shaking the ground for over 10 hours.', type: 'milestone' },
      { date: 'December 15, 2022', title: 'Final Transmission', description: 'Solar arrays covered in thick dust; InSight sends its poignant final image and telemetry to Earth.', type: 'end' },
      { date: 'December 21, 2022', title: 'Mission Declared Concluded', description: 'NASA declares InSight mission complete after two consecutive failed contact attempts.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'InSight lander body and circular solar wings covered in red dust',
        'SEIS seismometer dome resting on the ground in front of the lander',
        'HP3 heat flow support structure and tether',
        'Robotic deployment arm with claw resting on the surface'
      ],
      scientificInstruments: [
        'Seismic Experiment for Interior Structure (SEIS)',
        'Heat Flow and Physical Properties Package (HP3)',
        'Rotation and Interior Structure Experiment (RISE)',
        'Temperature and Winds for InSight (TWINS weather package)'
      ],
      keyDiscoveries: [
        'Detected 1,319 Marsquakes, proving Mars is seismically active with rumblings originating in Cerberus Fossae',
        'Mapped the internal anatomy of Mars: crust is 25 to 40 km thick, mantle extends to 1,560 km, and liquid core radius is ~1,830 km',
        'Detected seismic tremors from meteoroid impacts that excavated clean subsurface water-ice craters',
        'Recorded the monster magnitude 4.7 marsquake of May 4, 2022 that reverberated through the entire planet'
      ],
      ongoingSignificance: 'Provided humanity\'s very first definitive geological map of the internal crust, mantle, and core of another rocky planet.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'InSight: The Geophysical Detective of Mars',
        juniorTitle: 'InSight: The Robot Who Listened to Mars! ',
        documentaryText: 'On November 26, 2018, NASA\'s InSight (Interior Exploration using Seismic Investigations, Geodesy and Heat Transport) lander touched down in Elysium Planitia. Unlike rovers that explore surface geology, InSight was engineered to examine Mars\' deep interior.',
        juniorText: 'Hello, little explorers! My name is InSight. I am a special robot sent all the way to Mars, but I don\'t drive around! I have a very special job: I listen to the heartbeats of Mars deep inside the planet!',
        highlightFacts: [
          'First mission dedicated to investigating the deep interior of Mars',
          'Landed in Elysium Planitia at coordinates 4.5024° N, 135.9012° E',
          'Carried the most sensitive seismometer ever built for planetary exploration'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'Checking Mars\' Vital Signs: Crust, Mantle, and Core',
        juniorTitle: 'Taking Mars to the Doctor! ',
        documentaryText: 'While Earth has plate tectonics that erase ancient geological history, Mars is a "fossil planet" whose interior has remained largely unchanged for 4 billion years. InSight was designed like a planetary stethoscope to measure marsquakes, internal heat, and planetary wobbles.',
        juniorText: 'Have you ever had a doctor use a stethoscope to listen to your heartbeat? InSight did the exact same thing for Mars! Scientists wanted to know: Does Mars have a liquid core? Does it shake with Marsquakes? InSight went to listen!',
        highlightFacts: [
          'Engineered by Lockheed Martin with French (CNES) and German (DLR) instruments',
          'SEIS seismometer can detect ground movements smaller than the width of a single atom',
          'Required a location so smooth it was nicknamed the "parking lot of Mars"'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Deploying the Seismometer: Humanity\'s First Extraterrestrial Stethoscope',
        juniorTitle: 'Placing the Magic Ear on the Ground! ',
        documentaryText: 'Shortly after landing, InSight used its 1.9-meter robotic arm to lift the SEIS dome off the lander deck and place it directly onto the soil. It then covered SEIS with a white aerodynamic wind and thermal shield to block howling Martian gusts.',
        juniorText: 'InSight reached out with its robotic arm, picked up its round seismometer dome, and placed it gently on the ground! Then it covered it with a special shield so the howling Martian winds wouldn\'t tickle its ears!',
        highlightFacts: [
          'First time a robotic arm deployed instruments onto the ground of another planet',
          'Wind and Thermal Shield protected SEIS from -100°C temperature swings',
          'HP3 "mole" hammered into the soil to measure geothermal heat flow'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: '1,319 Marsquakes: Mapping the Red Planet\'s Hidden Heart',
        juniorTitle: 'RUMBLE! Mars is Shaking! ',
        documentaryText: 'SEIS detected 1,319 marsquakes over its mission. Seismic wave refractions revealed that Mars\' crust is 25 to 40 km thick with two or three sub-layers, and its molten liquid iron-nickel core has a radius of roughly 1,830 kilometers.',
        juniorText: 'Rumble, shake! InSight listened and detected over 1,300 real Marsquakes shaking deep inside the planet! It proved that Mars is still alive inside, with hot magma moving and cracking rocks deep underground!',
        highlightFacts: [
          'Detected over 1,319 marsquakes during its 4-year mission',
          'Proved Mars has a liquid metallic core with radius of ~1,830 km',
          'Record May 4, 2022 magnitude 4.7 marsquake echoed for 10 hours'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Choked by Dust: The Poignant Final Whisper',
        juniorTitle: 'Covered in Martian Dust ',
        documentaryText: 'Unlike rovers that encountered cleaning dust devils, InSight\'s solar panels steadily accumulated thick coats of red dust. By late 2022, power dropped from 5,000 watt-hours to under 400. InSight transmitted its final reading on December 15, 2022.',
        juniorText: 'Over four years, the dusty Martian wind blew red sand all over InSight\'s solar wings. The solar panels couldn\'t catch enough sunlight anymore. On December 15, 2022, InSight sent its last beautiful photo and said: "My power\'s really low, so this may be the last image I can send... Don\'t worry about me."',
        highlightFacts: [
          'Operated for 1,440 sols (more than double its planned 708 sols)',
          'Solar power dropped from 600W at landing to under 50W',
          'Mission officially concluded on December 21, 2022'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Elysium Planitia: The Silent Stethoscope',
        juniorTitle: 'InSight Still Rests on Mars! ',
        documentaryText: 'InSight\'s body, solar arrays, and the SEIS dome remain in Homestead Hollow at Elysium Planitia, coated in red dust. The data it sent back will be analyzed by geophysicists for decades to come.',
        juniorText: 'InSight is still resting quietly in Elysium Planitia on Mars today, covered in red dust. It gave humanity a map of what is hiding deep inside another planet, and scientists will study its discoveries forever!',
        highlightFacts: [
          'Coordinates: 4.5024° N, 135.9012° E',
          'SEIS dome sits permanently on the Martian soil',
          'Photographed from orbit by the Mars Reconnaissance Orbiter'
        ]
      }
    ],
    instruments: [
      { id: 'seis_instrument', name: 'Seismic Experiment for Interior Structure', acronym: 'SEIS', purpose: 'Measures seismic ground motions down to picometers', discovery: 'Recorded 1,319 Marsquakes and mapped core/mantle boundaries', status: 'Operated 1,440 sols' },
      { id: 'hp3_instrument', name: 'Heat Flow and Physical Properties Package', acronym: 'HP3', purpose: 'Measures geothermal heat escaping from interior', discovery: 'Determined thermal conductivity of upper Martian regolith', status: 'Decommissioned 2021' }
    ],
    artifacts: [
      { name: 'InSight Lander Body & SEIS Dome', description: 'Hexagonal lander and deployed surface seismometer dome', condition: 'Dust-covered in Elysium Planitia', coordinates: '4.5024° N, 135.9012° E', significance: 'First geophysical observatory on another world' }
    ]
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity',
    codeName: 'Ginny / Mars Helicopter',
    spacecraftName: 'Ingenuity Mars Helicopter',
    spacecraftType: 'Helicopter',
    celestialBody: 'mars',
    archiveChapter: 'martian',
    launchDate: 'July 30, 2020',
    landingDate: 'February 18, 2021 (deployed April 3, 2021)',
    missionEndDate: 'January 18, 2024 (officially concluded January 25, 2024)',
    coordinates: {
      lat: 18.4457,
      lng: 77.4508,
      elevationKm: -2.5,
      siteName: 'Jezero Crater (Airfield 72)',
      selectionReason: 'Jezero Crater contains an ancient preserved river delta where Perseverance searches for biosignatures; flat ground at Wright Brothers Field allowed safe initial flight testing.',
      geologicalFeatures: ['Jezero ancient river delta', 'Séítah dune fields', 'Wright Brothers Field (Airfield 1)', 'Airfield 72 (final landing)'],
      nearbyMissions: []
    },
    summary: 'The historic first aircraft to achieve powered, controlled aerodynamic flight on another planetary body. Planned as a 30-day technology demonstration with 5 flights, Ingenuity flew 72 missions over nearly three years, flying 17 km across Mars and scouting paths for Perseverance.',
    juniorHook: 'Spin those blades! Ingenuity was a brave little 1.8 kg helicopter that made history by flying across the Martian sky 72 times—the very first aircraft ever to fly on another planet!',
    storyTitle: 'Ingenuity: The Little Helicopter That Flew on Mars!',
    storyText: 'Arriving on Mars tucked beneath Perseverance in February 2021, Ingenuity was a tiny 1.8 kilogram helicopter with a big dream: to fly on another planet! Because Mars has such a thin atmosphere, nobody knew if controlled flight was possible. On April 19, 2021, Ingenuity spun its blades and lifted off, making history as the first powered flight on another planet! NASA planned only five test flights, but Ingenuity soared an incredible 72 times across the Martian sky, proving even the smallest wings can take you on the biggest adventure!',
    audioUrl: '/audio/v11.mp3',
    badgeEmoji: 'Ingenuity',
    primaryColor: '#818cf8',
    accentColor: '#4f46e5',
    modelConfig: {
      modelUrl: '/models/ingenuity.glb',
      modelType: 'gltf',
      scale: 1.2,
      position: [0, -0.2, 0],
      hotspots: [
        { id: 'rotor_blades', name: 'Coaxial Carbon-Fiber Blades', position: [0, 0.45, 0], description: 'Two 1.2-meter counter-rotating carbon-fiber blades spinning at 2,400 RPM to generate lift in Mars\' ultra-thin air.' },
        { id: 'solar_panel_ginny', name: 'Solar Cell Array', position: [0, 0.55, 0], description: 'Top-mounted solar panel that charged six Sony lithium-ion batteries to survive -90°C Martian nights.' },
        { id: 'avionics_box', name: 'Fuselage & Avionics', position: [0, 0.1, 0], description: 'Insulated 14 cm cube packed with smartphone processors, laser altimeter, and downward navigation camera.' },
        { id: 'wright_fabric', name: 'Wright Brothers Flyer Fabric', position: [0, 0.28, 0], description: 'A tiny swatch of muslin fabric from the original 1903 Wright Flyer wing was taped underneath the solar panel!' }
      ]
    },
    technicalSpecs: {
      massKg: '1.8 kg (4.0 lb on Earth; 0.68 kg on Mars)',
      powerSource: 'Solar panel charging six lithium-ion batteries (350 Watts peak power)',
      missionDuration: '1,043 sols / 1,071 Earth days (almost 3 years!)',
      distanceTraveled: '17.0 km (10.6 miles) flown across 72 total flights',
      communicationsFreq: 'Zigbee radio (914 MHz) communicating with Perseverance rover up to 1 km away'
    },
    lifetime: {
      sols: 1043,
      earthDays: 1071,
      earthYears: '2.9 years',
      plannedDuration: '30 Sols (5 test flights)',
      achievedRatio: '3,476% (72 flights completed)',
      notes: 'Designed for only 5 short technology demonstration flights over 30 days; flew 72 times over 1,043 sols, becoming an active aerial scout for the Perseverance rover!'
    },
    timeline: [
      { date: 'July 30, 2020', title: 'Launch aboard Atlas V', description: 'Ingenuity launches tucked inside the belly of the Perseverance rover.', type: 'launch' },
      { date: 'February 18, 2021', title: 'Touchdown in Jezero Crater', description: 'Perseverance lands safely at Octavia E. Butler Landing.', type: 'landing' },
      { date: 'April 3, 2021', title: 'Dropped onto Surface', description: 'Rover drops Ingenuity onto the dirt at Wright Brothers Field and drives away.', type: 'milestone' },
      { date: 'April 19, 2021 (07:34 UTC)', title: 'First Powered Flight on Mars', description: 'Spins rotors to 2,400 RPM, climbs to 3 meters, hovers for 39.1 seconds, and lands safely. Humanity\'s Wright Brothers moment on another world!', type: 'milestone' },
      { date: 'May 7, 2021 (Flight 5)', title: 'Completes Tech Demo', description: 'Completes its 5th flight and transitions from test experiment to operational aerial scout.', type: 'milestone' },
      { date: 'April 2022 (Flight 25)', title: 'Record 704m Flight', description: 'Flies 704 meters across the Séítah dunes at a speed of 5.5 m/s (12 mph).', type: 'milestone' },
      { date: 'January 18, 2024 (Flight 72)', title: 'Final Flight & Blade Damage', description: 'During emergency landing on sandy terrain, one or more rotor blades strike the surface.', type: 'end' },
      { date: 'January 25, 2024', title: 'Mission Officially Concluded', description: 'NASA Administrator Bill Nelson announces the end of mission after 72 historic flights.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Ingenuity helicopter resting at Airfield 72 in Jezero Crater',
        'Carbon-fiber rotor blades with historic 1903 Wright Flyer fabric piece',
        'Composite landing legs standing upright on the sand'
      ],
      scientificInstruments: [
        'High-resolution color Return-to-Earth (RTE) camera (13 MP)',
        'Downward-looking black-and-white navigation camera',
        'Laser altimeter and dual inclinometers'
      ],
      keyDiscoveries: [
        'Proved powered, controlled aerodynamic flight is possible in Mars\' thin atmosphere (less than 1% of Earth\'s density)',
        'Pioneered aerial reconnaissance, scouting rover driving routes, sand dunes, and rock hazards from the sky',
        'Completed 72 flights, totaled 128.8 minutes of airtime, flew 17.0 km, and reached altitudes up to 24 meters'
      ],
      ongoingSignificance: 'Revolutionized future planetary exploration architecture, laying the groundwork for sample retrieval helicopters and the Dragonfly nuclear rotorcraft to Titan.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Ingenuity: Wings Over the Red Planet',
        juniorTitle: 'Ingenuity: The Little Flying Helicopter! ',
        documentaryText: 'On April 19, 2021, a tiny 1.8 kg helicopter named Ingenuity spun its twin carbon-fiber blades at 2,400 RPM, lifted off the surface of Jezero Crater, and made history by achieving the first powered, controlled flight on another planet.',
        juniorText: 'Hello, little explorers! My name is Ingenuity. I am a small helicopter that weighs only 1.8 kilograms! But I did something nobody thought was possible: I became the very first aircraft in history to fly in the sky of another planet!',
        highlightFacts: [
          'First powered, controlled flight on another planet in human history',
          'Flew 72 times across Mars, totaling 17 kilometers',
          'Carried a swatch of fabric from the Wright Brothers\' original 1903 airplane'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Physics of Mars Flight: Beating 1% Atmosphere',
        juniorTitle: 'Can You Fly on Mars? ',
        documentaryText: 'Flying on Mars is extraordinarily difficult: its atmosphere has less than 1% of Earth\'s density, equivalent to flying at 100,000 feet on Earth (higher than any helicopter has ever flown). To produce lift, Ingenuity required ultra-light carbon-fiber blades spinning ten times faster than normal helicopters.',
        juniorText: 'Did you know that Mars has very little air? It\'s like flying higher than the highest clouds on Earth! Many scientists thought flying there was impossible. But NASA engineers gave me giant blades that spin super-duper fast—2,400 times a minute!',
        highlightFacts: [
          'Blades spun at 2,400 RPM (vs 450 RPM on Earth)',
          'Total weight on Mars was only 680 grams (1.5 lb)',
          'Equipped with autonomous navigation because radio signals take up to 20 minutes to reach Earth'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'The Historic First Flight: April 19, 2021',
        juniorTitle: 'LIFTOFF! Flying on Mars! ',
        documentaryText: 'After dropping from Perseverance\'s belly, Ingenuity survived its first freezing -90°C night alone. On April 19, 2021, it spun its rotors, ascended to 3 meters, hovered, and touched down smoothly, proving powered flight on Mars was a reality.',
        juniorText: 'On April 19, 2021, I started spinning my blades… Faster and faster! And suddenly… I LIFTED OFF! I hovered in the Martian air, looked down at the red dirt, and landed safely! I had made history as the first flying machine on another world!',
        highlightFacts: [
          'First flight lasted 39.1 seconds at 3 meters altitude',
          'Perseverance rover filmed the flight from 64 meters away',
          'Airfield named Wright Brothers Field by the International Civil Aviation Organization'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'From Technology Demo to Rover Scout: 72 Epic Flights',
        juniorTitle: 'Five Flights? No, 72! ',
        documentaryText: 'NASA originally planned for Ingenuity to perform only five test flights before being abandoned. But the helicopter performed so flawlessly that NASA converted it into an active scout, flying ahead of Perseverance to photograph geological formations and navigate safe driving corridors.',
        juniorText: 'At first, NASA expected me to make only 5 test flights. But I was having so much fun that they let me keep flying! I flew over sand dunes, scouted paths for my big friend Perseverance, and completed 72 AMAZING FLIGHTS across 17 kilometers!',
        highlightFacts: [
          'Completed 72 flights totaling over 2 hours of flight time',
          'Reached a maximum altitude of 24 meters (79 ft)',
          'Top speed of 36 km/h (22.4 mph) across the Martian landscape'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Flight 72 & The Damaged Blade Tip',
        juniorTitle: 'My Final Flight ',
        documentaryText: 'On January 18, 2024, during its 72nd flight over featureless sand dunes, Ingenuity experienced a navigational anomaly during descent. The blades struck the surface, snapping the tips off one or more rotor blades. NASA announced the conclusion of flight operations on January 25, 2024.',
        juniorText: 'On January 18, 2024, I went on my 72nd flight. But during landing in the sand, one of my blades struck the ground and got chipped. I couldn\'t fly again, but my story was a huge success! I had done something nobody had ever done before!',
        highlightFacts: [
          'Exceeded planned operational lifespan by 3,476%',
          'Downlink photo showed shadow of a broken blade tip',
          'Avionics and solar panels remain fully functional for stationary weather logging'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Airfield 72: A Permanent Monument to Flight',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Ingenuity stands upright on its landing legs at Airfield 72 in Jezero Crater, surrounded by rolling sand ripples. Its tiny swatch of Wright Brothers fabric rests beneath its solar panel, an eternal beacon of aeronautical courage.',
        juniorText: 'My little helicopter body is still standing proudly on Mars today at Airfield 72! I showed humanity that the sky is not the limit—it\'s just the beginning. Even the smallest wings can take you on the biggest adventure!',
        highlightFacts: [
          'Resting at coordinates 18.4447° N, 77.4508° E in Jezero Crater',
          'Carried piece of 1903 Wright Flyer wing fabric',
          'Paved the way for future aerial exploration fleets across the solar system'
        ]
      }
    ],
    instruments: [
      { id: 'rte_camera', name: 'Return-to-Earth Color Camera', acronym: 'RTE', purpose: 'High-resolution 13 MP horizon and terrain imaging', discovery: 'Returned aerial panoramas of ancient river delta cliffs', status: 'Operated 72 flights' },
      { id: 'nav_camera', name: 'Downwards Navigation Camera', acronym: 'NAV', purpose: 'Black-and-white optical tracking of ground texture at 30 FPS', discovery: 'Enabled real-time autonomous flight stabilization without GPS', status: 'Operated 72 flights' }
    ],
    artifacts: [
      { name: 'Ingenuity Mars Helicopter', description: 'Four-legged coaxial carbon-fiber rotorcraft', condition: 'Standing upright at Airfield 72', coordinates: '18.4447° N, 77.4508° E', significance: 'First aircraft to fly on another planetary body' },
      { name: 'Wright Flyer Muslin Fabric Swatch', description: 'Piece of 1903 aircraft wing fabric', condition: 'Affixed beneath solar panel', coordinates: 'Airfield 72', significance: 'Symbolic link between Earth\'s first flight and Mars\' first flight' }
    ]
  }
];
