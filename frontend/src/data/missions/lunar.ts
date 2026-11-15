import { Mission } from '../../types';

export const LUNAR_MISSIONS: Mission[] = [
  {
    id: 'apollo-11',
    name: 'Apollo 11 Lunar Module / EASEP',
    codeName: 'Eagle & Columbia',
    spacecraftName: 'Lunar Module LM-5 "Eagle"',
    spacecraftType: 'Lunar Module',
    celestialBody: 'moon',
    archiveChapter: 'lunar',
    launchDate: 'July 16, 1969',
    landingDate: 'July 20, 1969',
    missionEndDate: 'July 24, 1969',
    crew: ['Neil A. Armstrong (Commander)', 'Edwin "Buzz" Aldrin Jr. (Lunar Module Pilot)', 'Michael Collins (Command Module Pilot)'],
    coordinates: {
      lat: 0.674,
      lng: 23.473,
      elevationKm: -1.4,
      siteName: 'Sea of Tranquility (Mare Tranquillitatis)',
      selectionReason: 'Smooth, flat mare basalt terrain selected by Apollo site selectors for maximum landing safety during humanity\'s maiden lunar touchdown.',
      geologicalFeatures: ['Mare basalt plain', 'Cat\'s Paw craters', 'Little West Crater boulder field'],
      nearbyMissions: ['surveyor-5']
    },
    summary: 'Humanity\'s historic maiden crewed lunar landing. Eagle touched down on the Sea of Tranquility while Michael Collins orbited in Columbia, proving human explorers can visit and walk upon another planetary body.',
    juniorHook: 'The greatest adventure in human history! Meet Eagle, the little spacecraft that carried Neil Armstrong and Buzz Aldrin to take the very first footsteps on the Moon!',
    storyTitle: 'Eagle: The Little Spaceship That Went to the Moon',
    storyText: 'A long time ago, in 1969, NASA sent three astronauts on a big adventure to the Moon: Neil Armstrong, Buzz Aldrin, and Michael Collins. When they reached the Moon, two astronauts got inside a small spaceship called Eagle, while Michael stayed in the bigger spaceship above the Moon. On July 20, Eagle slowly landed on the Moon! Neil and Buzz got out, walked on the Moon, collected Moon rocks, and did some experiments. After finishing their adventure, they climbed back into Eagle and used its upper part to fly back up and meet Michael. Together, the three astronauts started their journey back to Earth. Eagle played a very important role in making history because it helped humans land on the Moon for the first time!',
    audioUrl: '/audio/v1.mp3',
    archiveImageUrl: '/images/moon/apollo-11.jpg',
    archiveImageCaption: 'Historic NASA photograph of Apollo 11 Lunar Module "Eagle" on the Sea of Tranquility with astronaut unpacking experiments at the equipment bay.',
    badgeEmoji: 'Eagle',
    primaryColor: '#38bdf8',
    accentColor: '#0284c7',
    technicalSpecs: {
      massKg: '15,103 kg (Lunar Module at separation)',
      powerSource: 'Silver-Zinc electrical batteries (Descent: 400 Ah, Ascent: 296 Ah)',
      missionDuration: '8 days, 3 hours, 18 minutes (Surface stay: 21.6 hours)',
      distanceTraveled: 'EVA walking distance: ~1.0 km around the lander',
      communicationsFreq: 'S-band 2287.5 MHz (voice/telemetry), VHF 296.8 MHz'
    },
    lifetime: {
      earthDays: 8.14,
      plannedDuration: '8 days',
      achievedRatio: '100%',
      notes: 'Lunar surface stay: 21 hours, 36 minutes. Moonwalk EVA: 2 hours, 31 minutes.'
    },
    timeline: [
      { date: 'July 16, 1969 (13:32 UTC)', title: 'Saturn V Liftoff', description: 'Apollo 11 launches from Launch Complex 39A at Kennedy Space Center.', type: 'launch' },
      { date: 'July 19, 1969', title: 'Lunar Orbit Insertion', description: 'Spacecraft enters lunar orbit behind the Moon.', type: 'transit' },
      { date: 'July 20, 1969 (20:17 UTC)', title: 'Touchdown at Tranquility Base', description: 'Neil Armstrong pilots Eagle past a crater field: "Houston, Tranquility Base here. The Eagle has landed."', type: 'landing' },
      { date: 'July 21, 1969 (02:56 UTC)', title: 'First Human Footprint', description: 'Armstrong steps onto the surface: "That\'s one small step for man, one giant leap for mankind."', type: 'milestone' },
      { date: 'July 21, 1969 (17:54 UTC)', title: 'Lunar Ascent Liftoff', description: 'Eagle\'s upper stage launches from the descent stage to rendezvous with Columbia.', type: 'milestone' },
      { date: 'July 24, 1969 (16:50 UTC)', title: 'Splashdown in Pacific', description: 'Command Module Columbia splashes down safely 1,400 km southwest of Hawaii.', type: 'end' }
    ],
    legacy: {
      hardwareRemaining: [
        'Eagle descent stage (base with gold Kapton foil & ladder)',
        'United States nylon flag with horizontal telescopic wire',
        'Apollo 11 Commemorative Plaque: "Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind"',
        'Silicon disc etched with goodwill messages from 73 world leaders',
        'Two portable life-support system (PLSS) backpacks discarded to lighten ascent stage'
      ],
      scientificInstruments: [
        'Laser Ranging Retroreflector (LRRR - 100 quartz corner-cube prisms, still active today!)',
        'Passive Seismic Experiment Package (PSEP)',
        'Solar Wind Composition experiment (SWC aluminum foil sheet)'
      ],
      keyDiscoveries: [
        'Proved that humans can safely walk, navigate, and work on another world without sinking into dust',
        'Returned 21.55 kg of pristine lunar rock and regolith samples, identifying ancient titanium-rich ilmenite basalts',
        'Discovered the Moon is completely devoid of water and organic life at the landing site',
        'LRRR laser reflector established the Moon is spiraling away from Earth at 3.8 cm per year'
      ],
      ongoingSignificance: 'Tranquility Base remains humanity\'s paramount cultural and archaeological heritage site off Earth, with the LRRR experiment continuously fired by terrestrial observatories for over 50 years.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'The First Footprints: Apollo 11 & Lunar Module Eagle',
        juniorTitle: 'Eagle: The Little Spaceship That Went to the Moon! ',
        documentaryText: 'On July 20, 1969, the Apollo 11 Lunar Module "Eagle" separated from Command Module "Columbia" and descended to the lunar surface. Commander Neil Armstrong and Lunar Module Pilot Buzz Aldrin safely piloted the craft past boulder fields to touch down at the Sea of Tranquility, while Michael Collins kept lone vigil in orbit aboard Columbia.',
        juniorText: 'A long time ago, in 1969, NASA sent three brave astronauts on a giant adventure to the Moon! Their names were Neil Armstrong, Buzz Aldrin, and Michael Collins. When they reached the Moon, Neil and Buzz got inside a special spaceship called Eagle, while Michael stayed in the mother spaceship above the Moon. On July 20, Eagle slowly landed on the Moon!',
        highlightFacts: [
          'First crewed landing on another celestial body in human history',
          'Landed with only 25 seconds of descent fuel remaining',
          'Watched by an estimated 650 million people worldwide'
        ],
        scientificDetails: [
          { label: 'Spacecraft Mass', value: '15,103 kg' },
          { label: 'Landing Site', value: '0.6740° N, 23.4730° E' },
          { label: 'Surface Time', value: '21 hours, 36 minutes' }
        ],
        quote: {
          speaker: 'Neil Armstrong (touchdown)',
          text: 'Houston, Tranquility Base here. The Eagle has landed.'
        }
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Human Imperative: Fulfilling the National Goal & Proving Lunar Landings',
        juniorTitle: 'Why Did They Go? ',
        documentaryText: 'Announced by President John F. Kennedy in 1961, the Apollo program was designed to land humans on the Moon and return them safely before the decade was out. Eagle had to be engineered as an ultra-lightweight spacecraft operating exclusively in the vacuum of space, carrying two astronauts and scientific equipment.',
        juniorText: 'Scientists and dreamers wanted to find out: Could humans really travel to the Moon? What does the surface feel like? Could we walk there safely? Eagle was built like a flying taxi to safely carry the astronauts to the surface and bring them back home!',
        highlightFacts: [
          'Built by Grumman Aerospace on Long Island, New York',
          'Walls were as thin as two layers of aluminum foil in non-pressurized zones',
          'Only spacecraft designed exclusively for operating in the vacuum of space'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Descending to Tranquility: The 240,000-Mile Voyage',
        juniorTitle: 'Walking on the Moon! ',
        documentaryText: 'After an elliptical lunar orbit, Eagle began its Powered Descent Initiation. During the final moments, computer overload alarms (1202 and 1201) sounded, but MIT programming allowed the computer to shed low-priority tasks. Armstrong took manual control and glided past a football-field sized crater to set Eagle gently onto the basalt plain.',
        juniorText: 'Neil and Buzz climbed out of Eagle, walked down the ladder, and touched the powdery lunar dust! They collected Moon rocks, set up scientific experiments, and planted a special flag. Everything felt so light because the Moon has much less gravity than Earth—you can bounce high into the sky!',
        highlightFacts: [
          'Armstrong and Aldrin spent 2 hours and 31 minutes outside on the surface',
          'Collected 21.55 kg of pristine rocks and regolith',
          'Tested mobility, finding the two-footed kangaroo hop most efficient'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Unlocking the Ancient Crust: Mare Tranquillitatis Discoveries',
        juniorTitle: 'Super Old Moon Rocks! ',
        documentaryText: 'The samples brought back by Apollo 11 contained high concentrations of titanium and revealed that the dark lunar maria were ancient volcanic basalt flows formed 3.6 to 3.8 billion years ago. The passive seismometer detected lunar vibrations and micrometeorite impacts before battery depletion.',
        juniorText: 'The rocks Neil and Buzz collected were billions of years old—older than almost any rock found on Earth! Scientists discovered that the dark patches on the Moon were formed by ancient molten lava from long-extinct volcanoes!',
        highlightFacts: [
          'Basalts contained rare mineral Tranquillityite, named after the landing site',
          'Confirmed absence of water or prebiotic organic molecules',
          'Laser reflector still provides sub-centimeter Earth-Moon distance measurements'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Ascent & Reunion: Leaving the Cradle',
        juniorTitle: 'Flying Back to Earth! ',
        documentaryText: 'Eagle\'s ascent stage was powered by a hypergolic rocket engine that could not fail—there was no backup. On July 21 at 17:54 UTC, the ascent stage ignited, using the descent stage as a launch pad. Eagle docked with Columbia in orbit, the astronauts transferred their samples, and the ascent stage was jettisoned.',
        juniorText: 'After finishing their historic adventure, Neil and Buzz climbed back into Eagle and used its upper part like a rocket to zoom back up into space! They met Michael in Columbia, hugged their friend, and flew all the way back home to Earth!',
        highlightFacts: [
          'Engine fired flawlessly without a backup',
          'Ascent stage jettisoned into lunar orbit and eventually impacted the surface',
          'Astronauts quarantined for 21 days after return to ensure biological safety'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Tranquility Base Today: A Monument in the Dust',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Eagle\'s descent stage still stands silently at Tranquility Base, surrounded by Neil and Buzz\'s undisturbed footprints in the vacuum. Beside it rests the LRRR laser reflector, still sending back laser echoes to Earth observatories today.',
        juniorText: 'Eagle\'s lower golden legs and the astronauts\' footprints are still there right now! Because there is no wind or rain on the Moon, the footprints will stay there for millions of years. Next time you look up at the Moon at night, you know human footprints are resting upon it!',
        highlightFacts: [
          'Footprints remain undisturbed due to absence of lunar atmosphere and wind',
          'The LRRR retroreflector continues reflecting laser pulses over 55 years later',
          'Designated a historic site under the US One Small Step Act'
        ]
      }
    ],
    instruments: [
      { id: 'lrrr', name: 'Laser Ranging Retroreflector', acronym: 'LRRR', purpose: 'Reflects laser pulses from Earth observatories', discovery: 'Moon is drifting 3.8 cm farther away each year; measures lunar librations', status: 'Active (Only active Apollo hardware)' },
      { id: 'psep', name: 'Passive Seismic Experiment Package', acronym: 'PSEP', purpose: 'Measures moonquakes and meteorite impacts', discovery: 'Detected first natural moonquakes and verified low background seismic noise', status: 'Decommissioned after 21 days' },
      { id: 'swc', name: 'Solar Wind Composition Experiment', acronym: 'SWC', purpose: 'Trapped noble gas ions emitted by the Sun', discovery: 'Determined precise isotopic ratios of Helium-3 and Neon in the solar wind', status: 'Retrieved and returned to Earth' }
    ],
    artifacts: [
      { name: 'Eagle Descent Stage', description: 'Lower stage with landing legs and rocket nozzle wrapped in gold Kapton foil', condition: 'Intact, resting in vacuum', coordinates: '0.6740° N, 23.4730° E', significance: 'First spacecraft to land humans on another world' },
      { name: 'Commemorative Plaque', description: 'Stainless steel plaque affixed to landing ladder', condition: 'Pristine', coordinates: 'Tranquility Base', significance: 'Reads: "We came in peace for all mankind"' },
      { name: 'Laser Retroreflector Array', description: '100 fused silica corner-cube reflectors in aluminum case', condition: 'Operational', coordinates: 'Tranquility Base', significance: 'Actively used by observatories on Earth' }
    ]
  },
  {
    id: 'apollo-12',
    name: 'Apollo 12 Lunar Module / ALSEP',
    codeName: 'Intrepid',
    spacecraftName: 'Lunar Module LM-6 "Intrepid"',
    spacecraftType: 'Lunar Module',
    celestialBody: 'moon',
    archiveChapter: 'lunar',
    launchDate: 'November 14, 1969',
    landingDate: 'November 19, 1969',
    missionEndDate: 'November 24, 1969 (ALSEP active until Sept 1977)',
    crew: ['Charles "Pete" Conrad Jr. (Commander)', 'Alan L. Bean (Lunar Module Pilot)', 'Richard F. Gordon Jr. (Command Module Pilot)'],
    coordinates: {
      lat: -3.0128,
      lng: -23.4219,
      elevationKm: -1.2,
      siteName: 'Oceanus Procellarum area',
      selectionReason: 'Pinpoint landing verification right next to the robotic Surveyor 3 probe to retrieve materials exposed to space for 2.5 years.',
      geologicalFeatures: ['Surveyor Crater rim', 'Head Crater', 'Bench Crater', 'Sharp Crater'],
      nearbyMissions: ['surveyor-3']
    },
    summary: 'NASA\'s second crewed landing, demonstrating precision pinpoint landing within 180 meters of Surveyor 3 and deploying the first comprehensive nuclear-powered ALSEP science laboratory.',
    juniorHook: 'Imagine traveling to the Moon, not just to visit, but to build a secret science laboratory there! Meet Intrepid, the brave flying taxi!',
    storyTitle: 'Apollo 12: The Moon\'s Little Science Laboratory',
    storyText: 'Imagine travelling to the Moon, not just to explore it, but to build a science laboratory there! On November 19, 1969, Apollo 12 arrived on the Moon. It carried a special spacecraft called Intrepid, or the Lunar Module. Think of it as a flying taxi that carried two astronauts, Charles Conrad and Alan Bean, safely to the Moon and back! They brought something special called ALSEP, a collection of scientific instruments that they set up on the Moon to study moonquakes, dust, magnetic fields, and particles coming from the Sun. The astronauts left the instruments behind, sending scientific data back to Earth for years!',
    audioUrl: '/audio/v2.mp3',
    archiveImageUrl: '/images/moon/apollo-12.jpg',
    archiveImageCaption: 'Historic NASA photograph of the Apollo 12 Lunar Module ascent stage returning in lunar orbit high above the cratered surface.',
    badgeEmoji: 'ALSEP',
    primaryColor: '#38bdf8',
    accentColor: '#0284c7',
    technicalSpecs: {
      massKg: '15,235 kg (at separation)',
      powerSource: 'SNAP-27 Radioisotope Thermoelectric Generator (RTG) + Batteries',
      missionDuration: '10 days, 4 hours, 36 minutes (Surface stay: 31.6 hours)',
      distanceTraveled: 'Total EVA walking distance: 7.9 km',
      communicationsFreq: 'S-band 2282.5 MHz & VHF 296.8 MHz'
    },
    lifetime: {
      earthDays: 10.19,
      plannedDuration: '10 days (1 year ALSEP)',
      achievedRatio: '800% ALSEP lifetime',
      notes: 'Surface stay: 31.6 hours. ALSEP instruments transmitted continuous data for nearly 8 years until 1977.'
    },
    timeline: [
      { date: 'November 14, 1969', title: 'Lightning Strike Liftoff', description: 'Saturn V launched during a rainstorm; struck twice by atmospheric lightning at T+36s and T+52s. Quick restore via SCE to AUX.', type: 'launch' },
      { date: 'November 19, 1969 (06:54 UTC)', title: 'Pinpoint Landing', description: 'Intrepid touches down 180 meters from Surveyor 3 in the Ocean of Storms.', type: 'landing' },
      { date: 'November 19, 1969', title: 'EVA-1 ALSEP Deployment', description: 'Conrad and Bean set up the nuclear-powered ALSEP scientific instruments.', type: 'milestone' },
      { date: 'November 20, 1969', title: 'EVA-2 Surveyor 3 Visit', description: 'Astronauts walk to Surveyor 3, inspect its condition, and cut off its camera and scoop.', type: 'milestone' },
      { date: 'November 20, 1969 (14:25 UTC)', title: 'Ascent Stage Impact Test', description: 'Empty ascent stage crashed into Moon; seismic shock wave echoed for 72 continuous minutes.', type: 'milestone' },
      { date: 'November 24, 1969', title: 'Pacific Splashdown', description: 'Crew returns safely to Earth in Yankee Clipper.', type: 'end' },
      { date: 'September 30, 1977', title: 'ALSEP Turnoff', description: 'NASA officially powers down the ALSEP station after 7.8 years of continuous science.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Intrepid descent stage',
        'SNAP-27 Plutonium-238 RTG cask',
        'ALSEP Central Station and sensor array',
        'Solar Wind Spectrometer',
        'Apollo 12 plaque'
      ],
      scientificInstruments: [
        'Passive Seismic Experiment (PSE)',
        'Solar Wind Spectrometer (SWS)',
        'Lunar Surface Magnetometer (LSM)',
        'Suprathermal Ion Detector Experiment (SIDE)',
        'Cold Cathode Ion Gauge (CCIG)'
      ],
      keyDiscoveries: [
        'First artificial moonquake impact reverberated for 72 minutes, proving a rigid, fractured, dry lunar crust',
        'Returned parts of Surveyor 3 proved microscopic lunar dust pitting and radiation exposure over 2.5 years',
        'Measured local lunar magnetic fields up to 36 gammas, proving ancient remanent magnetism'
      ],
      ongoingSignificance: 'Demonstrated pinpoint navigational accuracy essential for all subsequent Apollo missions targeting complex terrain.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'The Moon\'s Little Science Laboratory: Apollo 12 & Intrepid',
        juniorTitle: 'Meet Intrepid, The Moon Taxi! ',
        documentaryText: 'On November 19, 1969, Apollo 12 arrived at Oceanus Procellarum (the Ocean of Storms). Piloted by Commander Pete Conrad and Lunar Module Pilot Alan Bean, the lunar module "Intrepid" performed the first precision landing in human history, touching down just 180 meters from the Surveyor 3 robotic probe.',
        juniorText: 'Imagine travelling to the Moon, not just to explore it, but to build a science laboratory there! On November 19, 1969, Apollo 12 arrived on the Moon. It carried a special spacecraft called Intrepid, or the Lunar Module. Think of it as a flying taxi that carried two astronauts, Charles Conrad and Alan Bean, safely to the Moon and back!',
        highlightFacts: [
          'Pinpoint landing within 180 meters (600 ft) of Surveyor 3',
          'First precision landing in human spaceflight',
          'Second crewed Moon landing in history'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Scientific Mandate: ALSEP & Precision Exploration',
        juniorTitle: 'Why Did They Go? ',
        documentaryText: 'While Apollo 11 proved humanity could reach the lunar surface, future missions needed precision landing to access mountainous areas. Scientists also needed long-term, multi-year geophysical data on moonquakes, magnetic fields, and solar wind.',
        juniorText: 'They didn\'t come just for a visit! They brought something special called ALSEP, a collection of scientific instruments that they set up on the Moon to help scientists understand it better. These instruments were like little detectives! They studied moonquakes, dust, magnetic fields, and particles coming from the Sun.',
        highlightFacts: [
          'Deploy the first nuclear-powered scientific station on another world',
          'Retrieve parts of Surveyor 3 to evaluate 2.5 years of space exposure',
          'Demonstrate pinpoint landing guidance'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Through Lightning to the Ocean of Storms',
        juniorTitle: 'The Lightning Storm & The Big Landing! ',
        documentaryText: 'Thirty-six seconds after liftoff, the Saturn V rocket was struck by lightning, knocking out electrical telemetry. Quick thinking by flight controller John Aaron ("Try SCE to AUX") restored power. Conrad and Bean landed on target in the Ocean of Storms and conducted two EVAs.',
        juniorText: 'Blast off! On the way up, a real lightning bolt hit the rocket, but the brave astronauts and ground controllers fixed it in seconds! They zoomed across 380,000 kilometers of deep black space, detached from the mother ship Yankee Clipper, and landed right on target in a place called the Ocean of Storms!',
        highlightFacts: [
          'Surviving two atmospheric lightning strikes during launch',
          '31.6 hours on the lunar surface with two moonwalks (EVAs)',
          'Astronauts visited the Surveyor 3 robot and removed its camera to bring back to Earth'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'The Bell That Rang: Unveiling Moonquakes & Lunar Interior',
        juniorTitle: 'The Moon Rang Like a Bell! ',
        documentaryText: 'When the empty ascent stage of Intrepid was intentionally steered to crash into the lunar surface 76 km away, the resulting impact generated seismic waves that echoed through the lunar crust for 72 continuous minutes! This revealed that the lunar crust is remarkably dry, rigid, and fractured.',
        juniorText: 'One amazing discovery happened when scientists detected vibrations after the astronauts crashed the Lunar Module\'s empty upper stage into the Moon! It helped them learn more about what was happening deep inside the Moon! The Moon rang like a giant church bell for over an hour, showing scientists that the Moon has a super solid, rocky crust with no water underneath!',
        highlightFacts: [
          'Seismometer recorded artificial moonquake lasting 72 minutes',
          'Measured local magnetic field proving ancient dynamo activity',
          'Collected 34.35 kg of lunar samples including exotic KREEP-rich basalts'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Ascent to Yankee Clipper & A 8-Year Legacy',
        juniorTitle: 'Heading Back Home! ',
        documentaryText: 'After 31.6 hours on the surface, Conrad and Bean fired Intrepid\'s ascent engine to rendezvous with Richard Gordon in Yankee Clipper. The descent stage remained behind, powering ALSEP through its RTG until NASA shut down the network in September 1977 due to budget constraints.',
        juniorText: 'The astronauts eventually left their instruments behind, and they sent scientific information back to Earth for years, until NASA switched them off in 1977. But their discoveries didn\'t end there! Scientists still study the data collected by ALSEP to understand the Moon\'s interior and environment.',
        highlightFacts: [
          'ALSEP powered by radioactive Plutonium-238 decay for nearly 8 years',
          'NASA turned off the station on September 30, 1977',
          'Intrepid ascent stage successfully crashed for science'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'The Procellarum Science Station Today',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Intrepid\'s descent stage, the ALSEP central station, the SNAP-27 RTG, and the Surveyor 3 probe rest together on the plains of Oceanus Procellarum, representing humanity\'s first extraterrestrial archaeological complex.',
        juniorText: 'Intrepid\'s golden landing base, the nuclear science station, and the Surveyor 3 robot are still resting together on the Moon today! They sit quietly in the silent cosmic vacuum, waiting for future astronauts to visit them again.',
        highlightFacts: [
          'Only landing site where astronauts visited a robotic probe sent years earlier',
          'Surveyor 3 camera is currently preserved in the Smithsonian National Air and Space Museum',
          'Descent stage resting at 3.0124° S, 23.4216° W'
        ]
      }
    ],
    instruments: [
      { id: 'pse', name: 'Passive Seismic Experiment', acronym: 'PSE', purpose: 'Measures natural moonquakes and artificial spacecraft impacts', discovery: 'Discovered lunar reverberation lasting over 1 hour', status: 'Operated until 1977' },
      { id: 'sws', name: 'Solar Wind Spectrometer', acronym: 'SWS', purpose: 'Detects solar wind electrons and protons', discovery: 'Characterized the solar wind interaction with the lunar surface', status: 'Operated until 1977' },
      { id: 'lsm', name: 'Lunar Surface Magnetometer', acronym: 'LSM', purpose: 'Measures steady and time-varying magnetic fields', discovery: 'Found local remanent magnetic fields far stronger than anticipated', status: 'Operated until 1977' }
    ],
    artifacts: [
      { name: 'Intrepid Descent Stage', description: 'Base section of LM-6 with landing gear', condition: 'Pristine in lunar vacuum', coordinates: '3.0124° S, 23.4216° W', significance: 'Second human spacecraft to land on the Moon' },
      { name: 'ALSEP Central Station', description: 'Nuclear-powered telemetry and transmitter hub', condition: 'Intact, powered off in 1977', coordinates: 'Ocean of Storms', significance: 'First long-term science station on another world' },
      { name: 'Surveyor 3 Spacecraft', description: '1967 robotic lander visited by Apollo 12', condition: 'Minus camera & scoop returned to Earth', coordinates: '180 meters from Intrepid', significance: 'Only robotic probe sampled by human hands off Earth' }
    ]
  },
  {
    id: 'surveyor-3',
    name: 'Surveyor 3',
    spacecraftName: 'Surveyor 3 Robotic Lunar Lander',
    spacecraftType: 'Lander',
    celestialBody: 'moon',
    archiveChapter: 'lunar',
    launchDate: 'April 17, 1967',
    landingDate: 'April 20, 1967',
    missionEndDate: 'May 4, 1967 (Visited by Apollo 12 in Nov 1969)',
    coordinates: {
      lat: -3.000,
      lng: -23.410,
      elevationKm: -1.2,
      siteName: "Oceanus Procellarum, near Apollo 12's landing site",
      selectionReason: 'Crater interior selected to verify lunar surface bearing strength and ensure astronauts would not sink into deep dust.',
      geologicalFeatures: ['Surveyor Crater interior slope', 'Basaltic regolith'],
      nearbyMissions: ['apollo-12']
    },
    summary: 'NASA\'s pioneering uncrewed robotic lander that proved the lunar surface was solid enough for human astronaut landings. Bounced twice before settling, and was visited 2.5 years later by Apollo 12.',
    juniorHook: 'Once upon a time, before humans ever walked on the Moon, a little robot named Surveyor 3 bounced onto the lunar surface to see if it was safe for astronauts!',
    storyTitle: 'Surveyor 3: The Little Moon Explorer',
    storyText: 'Once upon a time, NASA wanted to send astronauts to the Moon, but nobody knew if its ground was safe. So, in 1967, NASA sent a little robot called Surveyor 3 to explore it first! On April 17, Surveyor 3 started its journey aboard a powerful rocket. After three days, it reached the Moon. But its landing was exciting—it bounced twice before finally landing safely! Surveyor 3 became a space detective with a camera to take pictures and a robotic arm to dig into the Moon\'s soil. It proved the ground was strong enough for astronauts to land on. Two years later, Apollo 12 astronauts visited the little robot and brought parts back to Earth for scientists to study!',
    audioUrl: '/audio/v3.mp3',
    archiveImageUrl: '/images/moon/surveyor-3.jpg',
    archiveImageCaption: 'Historic NASA photograph of Apollo 12 astronaut Pete Conrad examining the unmanned Surveyor 3 lander with Lunar Module Intrepid on the crater rim.',
    badgeEmoji: 'Surveyor',
    primaryColor: '#38bdf8',
    accentColor: '#0284c7',
    technicalSpecs: {
      massKg: '302 kg (landing mass on surface)',
      powerSource: 'Solar array producing 89 Watts + Rechargeable silver-zinc battery',
      missionDuration: '14 days (first lunar day) + Visited by Apollo 12 in 1969',
      distanceTraveled: 'Stationary lander (bounced twice on touchdown)',
      communicationsFreq: 'S-band transponder 2295 MHz'
    },
    lifetime: {
      earthDays: 14,
      plannedDuration: '14 days (lunar daylight)',
      achievedRatio: '100%',
      notes: 'Operated through one full lunar day. Transmitted 6,315 television images before freezing during the lunar night.'
    },
    timeline: [
      { date: 'April 17, 1967', title: 'Launch', description: 'Launched atop an Atlas-Centaur rocket from Cape Canaveral.', type: 'launch' },
      { date: 'April 20, 1967', title: 'Touchdown with Double Bounce', description: 'Radar anomalies caused descent engines to stay fired; spacecraft bounced 10m high twice before settling on a 14-degree slope.', type: 'landing' },
      { date: 'April 21, 1967', title: 'Robotic Arm Digs Lunar Trenches', description: 'Surface sampler scoop dug trenches up to 17.5 cm deep into the soil.', type: 'milestone' },
      { date: 'May 3, 1967', title: 'Solar Eclipse Viewed from Moon', description: 'Surveyor 3 photographed the Earth eclipsing the Sun.', type: 'milestone' },
      { date: 'May 4, 1967', title: 'Lunar Sunset & Shutdown', description: 'Solar power ceased as lunar night began; lander entered permanent cold sleep.', type: 'end' },
      { date: 'November 20, 1969', title: 'Visited by Apollo 12 Astronauts', description: 'Pete Conrad and Alan Bean walked to the probe and salvaged its camera and scoop for return to Earth.', type: 'milestone' }
    ],
    legacy: {
      hardwareRemaining: [
        'Surveyor 3 tubular aluminum tripod structure',
        'Two landing footpads',
        'Vernier engine bells and fuel tanks',
        'Omni-directional antennas'
      ],
      scientificInstruments: [
        'Surveyor TV camera system (salvaged by Apollo 12, now in Smithsonian)',
        'Soil Mechanics Surface Sampler (robotic scoop arm)',
        'Landing gear strain gauges'
      ],
      keyDiscoveries: [
        'Proved lunar soil has a load-bearing strength of 0.7 kg/cm², proving the Apollo Lunar Module would not sink into regolith',
        'Dug four trenches and conducted bearing tests, proving soil cohesion increases with depth',
        'Retrieved optical glass and metal parts provided the first real-world empirical data on how space vacuum and radiation degrade materials over years'
      ],
      ongoingSignificance: 'The ultimate bridge between robotic exploration and human spaceflight. Apollo 12\'s retrieval of Surveyor 3 hardware remains a milestone in space archaeology.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Surveyor 3: The Robotic Scout That Paved the Way',
        juniorTitle: 'Surveyor 3: The Little Moon Explorer! ',
        documentaryText: 'Launched in April 1967, Surveyor 3 was an uncrewed lander engineered to determine whether the lunar ground was firm enough for astronauts. Landing on the gentle slopes of a 200-meter crater in Oceanus Procellarum, the spacecraft transmitted over 6,300 images and scooped the lunar regolith.',
        juniorText: 'Once upon a time, NASA wanted to send astronauts to the Moon, but nobody knew if its ground was safe. Would the heavy spaceship sink into deep dust? So, in 1967, NASA sent a brave little robot called Surveyor 3 to explore it first!',
        highlightFacts: [
          'Third soft lander of the American Surveyor program',
          'First spacecraft equipped with a robotic digging arm on the Moon',
          'Landed inside a 200-meter crater later named Surveyor Crater'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Precursor Mission: Soil Mechanics Before Humans',
        juniorTitle: 'Can We Walk on the Moon? ',
        documentaryText: 'Prior to Surveyor, prominent astronomers feared the lunar surface might consist of deep, treacherous dust deposits several meters thick that would swallow a landing spacecraft. Surveyor 3 was outfitted with a robotic scoop arm to dig, scratch, and compress the lunar soil.',
        juniorText: 'Scientists were worried that the Moon might be covered in super-deep powdery dust, like quicksand! Surveyor 3 had a special robotic arm with a scoop to dig holes in the ground and check if the rock was strong and solid.',
        highlightFacts: [
          'Engineered to test soil bearing strength',
          'Carried surface sampler that could apply up to 14 kg of pressure',
          'Provided ground-truth data for Apollo landing gear footpads'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'The Double-Bounce Touchdown & Digging the Dust',
        juniorTitle: 'BOING! A Bouncy Landing! ',
        documentaryText: 'During terminal descent on April 20, 1967, highly reflective lunar rocks confused the landing radar, preventing engine shutdown. Surveyor 3 bounced 10 meters into the air, touched down, bounced again, and finally settled safely when ground control sent manual engine cutoff commands.',
        juniorText: 'On April 20, Surveyor 3 reached the Moon. But OOPS! Its landing wasn\'t completely smooth. Its engines kept firing, so it bounced up in the air twice before finally landing safely on a gentle crater slope!',
        highlightFacts: [
          'First bounce: 10 meters high; Second bounce: 3 meters high',
          'Dug four trenches up to 17.5 cm deep',
          'Operated the robotic scoop arm for over 18 hours of surface work'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Confirming Safe Ground for Human Boots',
        juniorTitle: 'The Moon is Safe for Astronauts! ',
        documentaryText: 'Surveyor 3 demonstrated that lunar soil had a consistency similar to wet beach sand, capable of easily supporting the Apollo Lunar Module. The camera captured an eclipse of the Sun by Earth, with the atmosphere glowing as a brilliant celestial halo ring.',
        juniorText: 'Surveyor 3 became a space detective! It sent thousands of pictures back to Earth and proved the Moon\'s ground was strong enough for astronauts to land and walk on safely without sinking!',
        highlightFacts: [
          'Soil bearing capacity measured at ~0.7 kg/cm²',
          'Photographed solar eclipse from the lunar surface on May 3, 1967',
          'Transmitted 6,315 high-resolution television frames'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'Freezing Lunar Night & The Astronaut Visit',
        juniorTitle: 'A Deep Sleep & A Surprise Visitor! ',
        documentaryText: 'Surveyor 3 relied on solar panels and batteries that could not survive the two-week lunar night, when temperatures plunge to -170°C. The probe powered down on May 4, 1967. Two and a half years later, Apollo 12 astronauts Pete Conrad and Alan Bean hiked down into the crater to examine the sleeping probe.',
        juniorText: 'Sadly, the Moon became dark and extremely cold. Surveyor 3 needed warm sunlight to work, so it went to sleep and never woke up again. But its story didn\'t end! Two years later, Apollo 12 astronauts walked right over to the little robot to say hello!',
        highlightFacts: [
          'Operated through full 14-day lunar day',
          'Temperature dropped to -170°C during lunar night',
          'Visited on November 20, 1969 by Apollo 12'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'The Salvaged Robotic Artifact',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'Conrad and Bean used bolt cutters to sever Surveyor 3\'s television camera, surface scoop, and aluminum tubing, stowing them aboard Intrepid. Back on Earth, microbiologists studied the camera and found dormant Streptococcus mitis bacteria, spurring international planetary protection protocols.',
        juniorText: 'The little robot\'s body is still sitting on the Moon today inside Surveyor Crater! Its camera was brought back to Earth and is now on display in a museum for everyone to see. It showed that even a little robotic probe can prepare the way for giant human discoveries!',
        highlightFacts: [
          'Lander body remains on the slope of Surveyor Crater',
          'Camera is exhibited at the National Air and Space Museum in Washington, D.C.',
          'Coordinates: -3.000° S, -23.410° W'
        ]
      }
    ],
    instruments: [
      { id: 'surveyor_tv', name: 'Surveyor Television System', acronym: 'TV', purpose: 'Panoramic imaging of terrain and soil trenches', discovery: 'Sent 6,315 pictures and recorded solar eclipse', status: 'Salvaged and returned to Earth' },
      { id: 'soil_sampler', name: 'Surface Sampler Mechanism', acronym: 'SMSS', purpose: 'Robotic scoop with electric motors', discovery: 'Verified lunar regolith bearing strength', status: 'Partial scoop salvaged, frame on Moon' }
    ],
    artifacts: [
      { name: 'Surveyor 3 Lander Frame', description: 'Tubular aluminum tripod with solar panel mast', condition: 'Intact in Surveyor Crater', coordinates: '3.000° S, 23.410° W', significance: 'First precursor robot visited by human astronauts' }
    ]
  },
  {
    id: 'apollo-15',
    name: 'Apollo 15 Lunar Module / ALSEP',
    codeName: 'Falcon & Endeavour',
    spacecraftName: 'Lunar Module LM-10 "Falcon" & LRV-1',
    spacecraftType: 'Lunar Module',
    celestialBody: 'moon',
    archiveChapter: 'lunar',
    launchDate: 'July 26, 1971',
    landingDate: 'July 30, 1971',
    missionEndDate: 'August 7, 1971',
    crew: ['David R. Scott (Commander)', 'James B. Irwin (Lunar Module Pilot)', 'Alfred M. Worden (Command Module Pilot)'],
    coordinates: {
      lat: 26.1233,
      lng: 3.6333,
      elevationKm: -0.8,
      siteName: 'Mare Imbrium region at the foot of the Apennine mountain range',
      selectionReason: 'Exceptional geological diversity: 4,500m high Apennine Mountains and the 1.5km wide, 300m deep Hadley Rille gorge.',
      geologicalFeatures: ['Hadley Rille sinuous lava canyon', 'Apennine Mountains (Hadley Delta)', 'St. George Crater', 'Bridge Crater'],
      nearbyMissions: []
    },
    summary: 'The first "J-mission" dedicated to intensive scientific exploration, featuring the maiden deployment of the Lunar Roving Vehicle (LRV), discovery of the 4.1-billion-year-old Genesis Rock, and the classic Galileo hammer & feather drop in vacuum.',
    juniorHook: 'Imagine driving a cool electric Moon buggy across the craters and mountains of the Moon! Meet Falcon and the first Moon car on Apollo 15!',
    storyTitle: 'Apollo 15: The Moon Car Adventure',
    storyText: 'In 1971, NASA sent three astronauts on an exciting journey to the Moon called Apollo 15. When they reached the Moon, two astronauts, David Scott and James Irwin, entered a spacecraft called Falcon, while Alfred Worden stayed in another spacecraft above the Moon. On July 30, Falcon landed near a group of mountains called the Apennine Mountains. But this mission was special because they had something amazing: a small Moon car called the Lunar Rover! They used it to travel farther, collect Moon rocks, and explore places they could not easily reach on foot. After finishing their adventure, Scott and Irwin used Falcon\'s upper part to fly back into space and reunite with Worden!',
    audioUrl: '/audio/v4.mp3',
    archiveImageUrl: '/images/moon/apollo-15.jpg',
    archiveImageCaption: 'Historic NASA photograph of Apollo 15 Lunar Module "Falcon" at Hadley Rille with rover tracks against the towering Apennine mountain range.',
    badgeEmoji: 'Rover',
    primaryColor: '#38bdf8',
    accentColor: '#0284c7',
    technicalSpecs: {
      massKg: '16,432 kg (LM-10 Falcon at separation)',
      powerSource: 'SNAP-27 RTG nuclear generator for ALSEP + Silver-Zinc batteries',
      missionDuration: '12 days, 7 hours, 11 minutes (Surface stay: 66.9 hours)',
      distanceTraveled: 'LRV-1 driving distance: 27.76 km (17.25 miles)',
      communicationsFreq: 'S-band high-gain steerable antenna on LRV'
    },
    lifetime: {
      earthDays: 12.3,
      plannedDuration: '12 days',
      achievedRatio: '100%',
      notes: 'Surface stay: 66 hours, 55 minutes. Three EVAs totaling 18 hours, 35 minutes. Rover drove 27.76 km!'
    },
    timeline: [
      { date: 'July 26, 1971', title: 'Liftoff from Earth', description: 'Saturn V launches Apollo 15 on the first extended scientific "J-mission".', type: 'launch' },
      { date: 'July 30, 1971 (22:16 UTC)', title: 'Touchdown at Hadley Base', description: 'Falcon touches down gently near the foot of Mount Hadley.', type: 'landing' },
      { date: 'July 31, 1971', title: 'First Drive in the Lunar Rover', description: 'Scott and Irwin unfold the Moon buggy from Falcon\'s side and drive to Hadley Rille.', type: 'milestone' },
      { date: 'August 1, 1971', title: 'Discovery of Genesis Rock', description: 'Astronauts discover anorthosite sample 15415, dating back 4.1 billion years to the primordial lunar crust.', type: 'milestone' },
      { date: 'August 2, 1971', title: 'Galileo Hammer & Feather Drop', description: 'Dave Scott drops a 1.32 kg hammer and a 0.03 kg falcon feather simultaneously in vacuum; both hit ground at the exact same time.', type: 'milestone' },
      { date: 'August 2, 1971 (17:11 UTC)', title: 'Falcon Liftoff', description: 'Ascent stage lifts off, filmed live by the LRV\'s ground-controlled television camera.', type: 'milestone' },
      { date: 'August 7, 1971', title: 'Pacific Ocean Splashdown', description: 'Endeavour splashes down safely under two of three main parachutes.', type: 'end' }
    ],
    legacy: {
      hardwareRemaining: [
        'Falcon descent stage with gold foil insulation',
        'Lunar Roving Vehicle (LRV-1) parked 90 meters away at Hadley Base',
        '"Fallen Astronaut" memorial aluminum statuette and plaque commemorating 14 fallen astronauts and cosmonauts',
        'Laser Ranging Retroreflector (LRRR-15 array)',
        'ALSEP-15 central station and drilled heat-flow probes'
      ],
      scientificInstruments: [
        'Heat Flow Experiment (HFE)',
        'Lunar Surface Magnetometer',
        'Passive Seismic Experiment',
        'Cold Cathode Gauge',
        'Subsatellite launched into lunar orbit by Endeavour'
      ],
      keyDiscoveries: [
        'Genesis Rock (sample 15415) confirmed the "magma ocean" hypothesis of the Moon\'s primordial origin',
        'Drove 27.8 km along the edge of Hadley Rille gorge, proving it was an ancient collapsed volcanic lava tube',
        'Demonstrated that in a gravitational vacuum, objects fall at the identical acceleration regardless of mass (Galileo\'s principle)'
      ],
      ongoingSignificance: 'Revolutionized human lunar exploration by multiplying mobility by an order of magnitude, transforming lunar geology from local sampling into regional field exploration.'
    },
    stages: [
      {
        stageNumber: 1,
        stageTitle: 'Introduction',
        documentaryTitle: 'Falcon & The Lunar Rover: Exploring the Hadley–Apennine',
        juniorTitle: 'Falcon and The Great Moon Adventure (A Moon Car!) ',
        documentaryText: 'In July 1971, Apollo 15 embarked on the first extended "J-mission". Commander David Scott and Lunar Module Pilot James Irwin landed Lunar Module "Falcon" at the foot of the 4,500-meter Apennine Mountains beside the 300-meter deep gorge of Hadley Rille.',
        juniorText: 'In 1971, NASA sent an exciting mission to the Moon called Apollo 15! Falcon carried two brave astronauts, David Scott and James Irwin, to a breathtaking landing spot surrounded by giant mountains and a deep canyon called Hadley Rille. And best of all? They brought a real electric Moon Car with them!',
        highlightFacts: [
          'First use of the Lunar Roving Vehicle (LRV) on the Moon',
          'Landed next to the 4,500m (15,000 ft) high Apennine Mountains',
          'Three spacewalks totaling over 18 hours outside'
        ]
      },
      {
        stageNumber: 2,
        stageTitle: 'Why Created',
        documentaryTitle: 'The Need for Mobility: Transforming Planetary Field Geology',
        juniorTitle: 'Why Build a Moon Car? ',
        documentaryText: 'Previous Apollo missions were limited to how far astronauts could safely hike in bulky spacesuits (around 1 km). To explore mountains, deep gorges, and diverse crater rims, NASA and Boeing engineered the Lunar Roving Vehicle—a lightweight, folding electric car with wire-mesh wheels and individual electric drive motors.',
        juniorText: 'On earlier missions, astronauts could only walk as far as their legs could carry them. But the Moon has huge mountains and giant craters miles away! So NASA built a special electric car called the Lunar Rover that could fold up like an accordion against the side of the spaceship!',
        highlightFacts: [
          'Engineered by Boeing with Delco electronics',
          'Weighed only 210 kg on Earth (35 kg in Moon\'s gravity)',
          'Top speed of 12 km/h (8 mph) powered by zinc-silver oxide batteries'
        ]
      },
      {
        stageNumber: 3,
        stageTitle: 'Journey & Mission',
        documentaryTitle: 'Driving Across Hadley Plains & The Great Feather Drop',
        juniorTitle: 'Driving on the Moon & Dropping a Feather! ',
        documentaryText: 'Scott and Irwin unfolded the rover and drove 27.76 km across the undulating plains. At the conclusion of their final EVA, Scott held up a 1.32 kg geological aluminum hammer in one hand and a 0.03 kg falcon feather in the other, releasing them simultaneously to confirm Galileo\'s 400-year-old law of gravity.',
        juniorText: 'Vroom! Scott and Irwin unfolded their Moon Car and drove all over the Moon! They drove right up to the edge of a giant 300-meter-deep canyon! Then, Dave Scott did something magical: he dropped a heavy hammer and a light falcon feather at the exact same second. In the Moon\'s vacuum, they fell together and hit the ground at the EXACT same instant!',
        highlightFacts: [
          'Rover drove up steep 18-degree slopes of Mount Hadley Delta',
          'Galileo\'s experiment proved objects fall at the same rate in vacuum',
          'Collected 77 kg (170 lb) of lunar rock samples'
        ]
      },
      {
        stageNumber: 4,
        stageTitle: 'Scientific Discoveries',
        documentaryTitle: 'Finding the Genesis Rock: 4.1 Billion Years of History',
        juniorTitle: 'The 4-Billion-Year-Old Rock! ',
        documentaryText: 'While exploring Spur Crater on the slopes of Mount Hadley Delta, Scott spotted a gleaming white rock. It was anorthosite—pure plagioclase feldspar from the primordial crust of the Moon, dubbed the "Genesis Rock" (Sample 15415). It dated back 4.1 billion years.',
        juniorText: 'The astronauts spotted a gleaming white rock on the side of a mountain. When scientists tested it on Earth, they were stunned: it was 4.1 BILLION years old! It formed when the Moon was brand new and covered by a glowing ocean of hot liquid lava!',
        highlightFacts: [
          'Genesis Rock (sample 15415) confirmed Moon magma ocean hypothesis',
          'Sample 15016 basalt revealed ancient volcanic degassing bubbles',
          'Drilled 3 meters deep to extract lunar core history'
        ]
      },
      {
        stageNumber: 5,
        stageTitle: 'Why Mission Ended',
        documentaryTitle: 'The Rover\'s Final Stand: Filming Falcon\'s Liftoff',
        juniorTitle: 'The Moon Buggy Filmed Liftoff! ',
        documentaryText: 'After three days of exploration, Falcon was ready to leave. Scott parked the rover 90 meters away and aimed its color television camera at Falcon. When the ascent engine ignited, controllers in Houston tilted the camera up to broadcast the liftoff live to Earth.',
        juniorText: 'Before leaving, the astronauts parked the Moon Car a short distance away and pointed its camera right at Falcon. When Falcon blasted off to fly home, the Moon Car filmed the rocket engine lifting into the stars! Falcon rejoined Endeavour, and the astronauts flew safely home.',
        highlightFacts: [
          'First live television broadcast of a lunar module liftoff',
          'Falcon ascent stage subsequently crashed into Moon to register on ALSEP seismometers',
          'Safely splashed down on August 7, 1971'
        ]
      },
      {
        stageNumber: 6,
        stageTitle: 'What Remains',
        documentaryTitle: 'Hadley Base: The Parked Moon Buggy & Fallen Astronaut',
        juniorTitle: 'What is Still There? ',
        documentaryText: 'The Apollo 15 Lunar Roving Vehicle remains parked where Dave Scott left it at Hadley Base, pointing toward the mountains. Beside the rover rests "The Fallen Astronaut"—a 8.5 cm aluminum figurine placed by Scott and Irwin beside a plaque listing 14 American astronauts and Soviet cosmonauts who gave their lives in space exploration.',
        juniorText: 'The first Moon Car in human history is still parked at Hadley Base right now! Next to it is a tiny aluminum statue called "The Fallen Astronaut," honoring all the brave explorers from around the world who helped humanity reach for the stars.',
        highlightFacts: [
          'LRV-1 is parked at coordinates 26.1233° N, 3.6333° E',
          'Only art installation currently on the Moon (The Fallen Astronaut)',
          'High-gain antenna still aimed toward Earth'
        ]
      }
    ],
    instruments: [
      { id: 'lrv', name: 'Lunar Roving Vehicle (LRV-1)', acronym: 'LRV', purpose: 'Electric surface transportation vehicle', discovery: 'Enabled 27.8 km of scientific traverse across mountains and canyons', status: 'Parked at Hadley Base' },
      { id: 'hfe', name: 'Heat Flow Experiment', acronym: 'HFE', purpose: 'Measures heat escaping from the Moon interior', discovery: 'Calculated internal radioactive heat flux of the Moon', status: 'Decommissioned 1977' },
      { id: 'lrrr15', name: 'Laser Ranging Retroreflector-15', acronym: 'LRRR-15', purpose: '300-cube silica reflector for Earth laser ranging', discovery: 'Provides centimeter-precision lunar orbit measurements', status: 'Active today' }
    ],
    artifacts: [
      { name: 'Lunar Roving Vehicle LRV-1', description: 'Four-wheeled electric vehicle with wire mesh tires', condition: 'Parked at Hadley Base', coordinates: '26.1233° N, 3.6333° E', significance: 'First vehicle driven on another celestial body' },
      { name: 'The Fallen Astronaut', description: '8.5 cm aluminum statuette and memorial plaque', condition: 'Resting beside LRV', coordinates: 'Hadley Base', significance: 'Only memorial sculpture on the Moon' },
      { name: 'Falcon Descent Stage', description: 'Base section of LM-10', condition: 'Pristine in lunar vacuum', coordinates: 'Hadley Base', significance: 'Base station for the first J-mission' }
    ]
  }
];
