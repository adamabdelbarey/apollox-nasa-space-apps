export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface MissionQuiz {
  missionId: string;
  missionName: string;
  badgeTitle: string;
  badgeDescription: string;
  questions: QuizQuestion[];
}

export const MISSION_QUIZZES: Record<string, MissionQuiz> = {
  // =========================================================================
  // LUNAR EXPEDITION QUIZZES
  // =========================================================================
  'apollo-11': {
    missionId: 'apollo-11',
    missionName: 'Apollo 11 Lunar Module / EASEP',
    badgeTitle: 'Eagle Moon Pioneer Badge',
    badgeDescription: 'Awarded for mastering the historic first human landing on the Sea of Tranquility.',
    questions: [
      {
        id: 'a11-q1',
        question: 'What was the name of the lunar module spaceship that landed Neil Armstrong and Buzz Aldrin on the Moon?',
        options: ['Eagle', 'Falcon', 'Columbia', 'Dragon'],
        correctIndex: 0,
        explanation: 'The Lunar Module was named Eagle, while Michael Collins stayed in the Command Module Columbia above the Moon.',
        funFact: 'When touching down on July 20, 1969, Neil Armstrong radioed: "Houston, Tranquility Base here. The Eagle has landed!"',
      },
      {
        id: 'a11-q2',
        question: 'Where on the Moon did Eagle touch down safely?',
        options: ['Sea of Tranquility', 'Ocean of Storms', 'Olympus Mons', 'Tycho Crater'],
        correctIndex: 0,
        explanation: 'Eagle landed in Mare Tranquillitatis (Sea of Tranquility), an ancient flat volcanic plain chosen for maximum landing safety.',
        funFact: 'Eagle touched down with only about 25 seconds of descent fuel left in its fuel tanks!',
      },
    ],
  },

  'apollo-12': {
    missionId: 'apollo-12',
    missionName: 'Apollo 12 Lunar Module / ALSEP',
    badgeTitle: 'Lunar Detective Badge',
    badgeDescription: 'Awarded for uncovering how Apollo 12 turned the Moon into an active science laboratory.',
    questions: [
      {
        id: 'a12-q1',
        question: 'What was the special set of science detective instruments that Apollo 12 set up on the Moon called?',
        options: ['ALSEP', 'RADAR', 'MER', 'SOJOURNER'],
        correctIndex: 0,
        explanation: 'ALSEP was the Apollo Lunar Surface Experiments Package, filled with sensors studying moonquakes and solar particles.',
        funFact: 'These science instruments sent data back to Earth continuously for 8 years until NASA switched them off in 1977!',
      },
      {
        id: 'a12-q2',
        question: 'What discovery happened when scientists detected vibrations after the astronauts crashed the empty lunar module stage?',
        options: [
          'Vibrations revealed secrets deep inside the Moon (moonquakes)',
          'They found frozen water lakes on the surface',
          'A giant dust cloud flew all the way to Earth',
          'It woke up a sleeping robot',
        ],
        correctIndex: 0,
        explanation: 'The impact created artificial seismic waves that taught scientists what the Moon is like deep below its surface.',
        funFact: 'The vibrations lasted so long that scientists described the Moon as ringing like a bell for over an hour!',
      },
    ],
  },

  'surveyor-3': {
    missionId: 'surveyor-3',
    missionName: 'Surveyor 3',
    badgeTitle: 'Lunar Robot Pioneer Badge',
    badgeDescription: 'Awarded for discovering how Surveyor 3 paved the safe path for human lunar landings.',
    questions: [
      {
        id: 's3-q1',
        question: 'What surprising bounce happened when Surveyor 3 made its landing on the Moon in 1967?',
        options: [
          'It bounced twice before landing safely',
          'It landed upside down on a rock',
          'It parachuted into an icy lake',
          'It slid down a mountain on skis',
        ],
        correctIndex: 0,
        explanation: 'Its landing engines fired slightly longer than expected, causing Surveyor 3 to bounce twice before safely resting in Oceanus Procellarum.',
        funFact: 'The robot took over 6,000 pictures and used a small robotic arm to dig into lunar soil to test its strength!',
      },
      {
        id: 's3-q2',
        question: 'Who visited the little Surveyor 3 robot two years later in 1969?',
        options: [
          'Apollo 12 astronauts (Charles Conrad & Alan Bean)',
          'Apollo 11 astronauts (Neil Armstrong & Buzz Aldrin)',
          'Nobody has ever visited it',
          'A Martian robot rover',
        ],
        correctIndex: 0,
        explanation: 'Apollo 12 pinpoint-landed right next to Surveyor 3, inspected its condition, and brought its camera back to Earth for scientists to study.',
        funFact: 'Surveyor 3 is the only probe on another world ever visited by human astronauts after its mission concluded!',
      },
    ],
  },

  'apollo-15': {
    missionId: 'apollo-15',
    missionName: 'Apollo 15 Lunar Module / ALSEP',
    badgeTitle: 'Lunar Rover Driver Badge',
    badgeDescription: 'Awarded for learning how astronauts drove the first Lunar Rover near the Apennine Mountains.',
    questions: [
      {
        id: 'a15-q1',
        question: 'What amazing vehicle did Apollo 15 astronauts take to explore farther than ever before?',
        options: [
          'The Lunar Rover (Moon car)',
          'A rocket skateboard',
          'A space bicycle',
          'A hovercraft drone',
        ],
        correctIndex: 0,
        explanation: 'The Lunar Roving Vehicle (LRV) allowed David Scott and James Irwin to drive 28 kilometers across the lunar surface.',
        funFact: 'The Lunar Rover had wire mesh tires made of zinc-coated piano wire with titanium treads for grip on lunar dust!',
      },
      {
        id: 'a15-q2',
        question: 'What was the name of the Apollo 15 Lunar Module that touched down at the foot of the mountains?',
        options: ['Falcon', 'Eagle', 'Intrepid', 'Columbia'],
        correctIndex: 0,
        explanation: 'The spacecraft was named Falcon, landing near Hadley Rille and the majestic Apennine Mountain range.',
        funFact: 'The astronauts collected the famous "Genesis Rock", an ancient white anorthosite rock over 4 billion years old!',
      },
    ],
  },

  // =========================================================================
  // MARTIAN EXPEDITION QUIZZES
  // =========================================================================
  'mars-pathfinder-sojourner': {
    missionId: 'mars-pathfinder-sojourner',
    missionName: 'Mars Pathfinder & Sojourner',
    badgeTitle: 'Airbag Bouncer Badge',
    badgeDescription: 'Awarded for discovering how Sojourner bounced across Ares Vallis on Mars.',
    questions: [
      {
        id: 'mp-q1',
        question: 'How did Mars Pathfinder protect the little rover Sojourner when touching down on Mars in 1997?',
        options: [
          'Giant bouncing airbags and a parachute',
          'Giant soft pillows',
          'Landing directly on rocket skates',
          'A water splashdown',
        ],
        correctIndex: 0,
        explanation: 'The lander inflated giant multi-layer airbags and bounced more than 15 times before settling safely on Martian soil!',
        funFact: 'Sojourner was only about the size of a microwave oven (10.5 kg), but it proved mobile rovers could explore other worlds!',
      },
      {
        id: 'mp-q2',
        question: 'Sojourner was planned to explore Mars for 7 days. How long did it actually explore?',
        options: ['83 days', 'Only 2 days', 'Exactly 7 days', '10 years'],
        correctIndex: 0,
        explanation: 'Sojourner worked for 83 Martian days (sols), exploring rocks like "Barnacle Bill" and "Yogi" until late September 1997.',
        funFact: 'Sojourner analyzed rounded pebbles in Ares Vallis that proved massive floods of liquid water flowed there billions of years ago!',
      },
    ],
  },

  'viking-1': {
    missionId: 'viking-1',
    missionName: 'Viking 1',
    badgeTitle: 'Martian Surface Pioneer Badge',
    badgeDescription: 'Awarded for exploring the first spacecraft to operate for years on the Martian surface.',
    questions: [
      {
        id: 'v1-q1',
        question: 'Viking 1 had two spacecraft parts working together. What were their missions?',
        options: [
          'One orbited Mars taking pictures while the other landed on the surface',
          'Both stayed in space orbiting the planet',
          'Both drove around on wheels',
          'One flew back to Earth with rocks',
        ],
        correctIndex: 0,
        explanation: 'The Viking Orbiter mapped the planet from space, while the Viking Lander touched down on Chryse Planitia on July 20, 1976.',
        funFact: 'Viking 1 returned the first ever clear color photographs taken from the surface of Mars!',
      },
      {
        id: 'v1-q2',
        question: 'What tool did the Viking 1 lander use to collect and test red Martian dirt?',
        options: [
          'A long robotic arm with a scoop',
          'A giant vacuum hose',
          'A laser beam drill',
          'A magnet net',
        ],
        correctIndex: 0,
        explanation: 'Its 3-meter robotic arm extended out, scooped up Martian soil, and deposited it into onboard biological and chemical test ovens.',
        funFact: 'Viking 1 operated on the surface for over 6 Earth years (2,245 sols), far longer than anyone expected!',
      },
    ],
  },

  'viking-2': {
    missionId: 'viking-2',
    missionName: 'Viking 2',
    badgeTitle: 'Utopia Explorer Badge',
    badgeDescription: 'Awarded for mastering the twin Viking expedition to Utopia Planitia on Mars.',
    questions: [
      {
        id: 'v2-q1',
        question: 'Where did the Viking 2 lander touch down on the Martian surface in September 1976?',
        options: ['Utopia Planitia', 'Sea of Tranquility', 'Gusev Crater', 'Eros Asteroid'],
        correctIndex: 0,
        explanation: 'Viking 2 touched down in Utopia Planitia, about 4,000 miles away from Viking 1.',
        funFact: 'Viking 2 found thin layers of water-frost coating the rocks and ground during the cold Martian winter!',
      },
      {
        id: 'v2-q2',
        question: 'Together, what amazing achievement did the Viking orbiters complete from space?',
        options: [
          'Photographed and mapped almost the entire planet Mars',
          'Discovered alien cities',
          'Mapped Earth oceans',
          'Created a road map for cars',
        ],
        correctIndex: 0,
        explanation: 'The orbiters took over 50,000 photographs, providing the first global high-resolution maps of Martian volcanoes and canyons.',
        funFact: 'Their maps revealed Valles Marineris, a canyon system 4 times deeper and 10 times longer than the Grand Canyon!',
      },
    ],
  },

  'spirit': {
    missionId: 'spirit',
    missionName: 'Spirit MER-A Rover',
    badgeTitle: 'Hot Spring Detective Badge',
    badgeDescription: 'Awarded for uncovering ancient Martian hot springs with the robot twin Spirit.',
    questions: [
      {
        id: 'sp-q1',
        question: 'Where on Mars did the robot rover Spirit land in January 2004?',
        options: ['Gusev Crater', 'Hadley Rille', 'Ares Vallis', 'Sea of Tranquility'],
        correctIndex: 0,
        explanation: 'Spirit landed in Gusev Crater, a giant impact basin scientists believed was once filled with a vast ancient lake.',
        funFact: 'Spirit was designed to survive 90 days, but it kept roving and exploring for over 6 years!',
      },
      {
        id: 'sp-q2',
        question: 'What unexpected discovery did Spirit make when its front wheel stopped turning and dragged in the dirt?',
        options: [
          'Bright white silica formed by ancient hot springs',
          'A buried treasure chest',
          'Solid ice cream',
          'A puddle of fresh liquid water',
        ],
        correctIndex: 0,
        explanation: 'The stuck wheel churned up bright white soil that was 90% pure silica, proof that ancient volcanic hot springs or steam vents existed there.',
        funFact: 'Scientists consider Spirit’s dragging wheel one of the greatest accidental discoveries in space history!',
      },
    ],
  },

  'opportunity': {
    missionId: 'opportunity',
    missionName: 'Opportunity MER-B Rover',
    badgeTitle: '15-Year Marathon Rover Badge',
    badgeDescription: 'Awarded for traveling a marathon distance across the red plains of Meridiani Planum.',
    questions: [
      {
        id: 'opp-q1',
        question: 'How long did the Opportunity rover explore Mars, setting a record for planetary rovers?',
        options: ['Nearly 15 years', 'Only 90 days', '6 months', '50 years'],
        correctIndex: 0,
        explanation: 'Opportunity landed in January 2004 and operated until a global dust storm in June 2018—almost 15 years of exploration!',
        funFact: 'Opportunity drove 45.16 kilometers (28.06 miles), more than a full Earth marathon!',
      },
      {
        id: 'opp-q2',
        question: 'What tiny spherical minerals did Opportunity find that proved water once soaked the ground?',
        options: [
          'Hematite "blueberries"',
          'Glass marbles',
          'Plastic beads',
          'Rubber dots',
        ],
        correctIndex: 0,
        explanation: 'Opportunity discovered millions of small, round hematite spheres nicknamed "blueberries" that precipitated inside water-soaked rock.',
        funFact: 'Opportunity also examined giant craters like Endurance and Victoria, peering deep into billions of years of Martian geology!',
      },
    ],
  },

  'insight': {
    missionId: 'insight',
    missionName: 'InSight Lander',
    badgeTitle: 'Marsquake Listener Badge',
    badgeDescription: 'Awarded for listening to the heartbeat and tremors deep inside Mars with InSight.',
    questions: [
      {
        id: 'ins-q1',
        question: 'Unlike rovers that drive on wheels, what was InSight’s special mission on Mars?',
        options: [
          'Listening to tremors and Marsquakes deep inside the planet',
          'Driving through sand dunes',
          'Flying through the atmosphere',
          'Drilling for oil',
        ],
        correctIndex: 0,
        explanation: 'InSight placed an ultra-sensitive seismometer on the surface to listen to vibrations deep beneath the Martian crust.',
        funFact: 'InSight detected more than 1,300 Marsquakes, proving that Mars is seismically active!',
      },
      {
        id: 'ins-q2',
        question: 'Why did InSight finally conclude its mission in December 2022?',
        options: [
          'Martian dust covered its solar panels, blocking sunlight energy',
          'It ran out of wheels',
          'It fell into a deep canyon',
          'It rocketed back to Earth',
        ],
        correctIndex: 0,
        explanation: 'Red Martian dust slowly coated its wide solar panels over 4 years, eventually reducing power until it sent its final message.',
        funFact: 'InSight discovered that the crust of Mars is layered and measured the exact size of Mars’ liquid core!',
      },
    ],
  },

  'ingenuity': {
    missionId: 'ingenuity',
    missionName: 'Ingenuity Mars Helicopter',
    badgeTitle: '72-Flight Martian Aviator Badge',
    badgeDescription: 'Awarded for celebrating the first powered aircraft flight on another planetary world.',
    questions: [
      {
        id: 'ing-q1',
        question: 'What historic aviation milestone did Ingenuity achieve on April 19, 2021?',
        options: [
          'First powered, controlled flight on another planet',
          'First rover to climb a mountain',
          'First satellite in orbit',
          'First human landing on Mars',
        ],
        correctIndex: 0,
        explanation: 'Ingenuity lifted off into the ultra-thin air of Mars, proving powered flight is possible beyond Earth!',
        funFact: 'Because Mars’ air is 99% thinner than Earth’s, Ingenuity’s counter-rotating blades had to spin at an incredible 2,400 RPM!',
      },
      {
        id: 'ing-q2',
        question: 'Planned for only 5 test flights, how many flights did Ingenuity actually complete across Mars?',
        options: ['72 flights', 'Only 5 flights', '12 flights', '300 flights'],
        correctIndex: 0,
        explanation: 'Ingenuity exceeded all expectations by flying 72 times, traveling 17 kilometers across Jezero Crater.',
        funFact: 'Ingenuity carried a tiny swatch of muslin fabric from the Wright Brothers’ historic 1903 Flyer taped under its solar panel!',
      },
    ],
  },

  'near-shoemaker': {
    missionId: 'near-shoemaker',
    missionName: 'NEAR Shoemaker',
    badgeTitle: 'Asteroid Touchdown Badge',
    badgeDescription: 'Awarded for exploring the first spacecraft ever to orbit and land on an asteroid.',
    questions: [
      {
        id: 'near-q1',
        question: 'What tumbling space world did NEAR Shoemaker orbit and study in the year 2000?',
        options: [
          'An asteroid named Eros',
          'A moon of Jupiter',
          'A ring of Saturn',
          'The tail of a comet',
        ],
        correctIndex: 0,
        explanation: 'NEAR Shoemaker traveled to asteroid 433 Eros, becoming the first spacecraft in history to orbit an asteroid.',
        funFact: 'Eros is a peanut-shaped asteroid about 34 kilometers long covered in craters and boulders!',
      },
      {
        id: 'near-q2',
        question: 'What unexpected feat did NEAR Shoemaker perform on February 12, 2001?',
        options: [
          'Safely landed on the asteroid surface even though not built to land',
          'Flew into the Sun',
          'Turned into an asteroid itself',
          'Landed on Mars instead',
        ],
        correctIndex: 0,
        explanation: 'Engineers guided NEAR down to a gentle 4 mph touchdown on Eros, and it continued transmitting science signals from the surface for 2 weeks!',
        funFact: 'NEAR proved that humans can navigate and gently dock with asteroids, paving the way for planetary defense missions!',
      },
    ],
  },
};
