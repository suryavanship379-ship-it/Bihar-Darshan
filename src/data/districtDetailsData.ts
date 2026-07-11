  export interface SeasonRow {
    season: string;
    months: string;
    weather: string;
    whyVisit: string;
  }

  export interface DistrictDetail {
    name: string;
    tagline: string;
    introduction: string;
    richHistory: string;
    topTouristAttraction: {
      name: string;
      details: string;
    };
    seasonalVisit: SeasonRow[];
    whyInTouristList: string[];
    topAttractions: {
  name: string;
  district?: string;
  image: string;
  shortDescription?: string;
  description: string;
  rating?: number;
  bestTime?: string;
}[];
    howToReach: {
      air: string;
      rail: string;
      road: string;
    };
  }

  export const staticDistrictDetails: Record<string, DistrictDetail> = {
    patna: {
      name: "Patna",
      tagline: "The Timeless Capital of Bihar",
      introduction: "Patna, situated on the southern bank of the river Ganges, is the oldest continuously inhabited place in Bihar. Running as a megacity of commerce and administration, it serves as the state’s dynamic urban hub.",
      richHistory: "Known anciently as Pataliputra, it was the proud capital of major empires including the Nanda, Maurya, Shunga, Gupta, and Pala dynasties. It was from here that Emperor Ashoka ruled, and scholars like Aryabhata and Chanakya shaped ancient Indian science and administration. Patna also holds immense religious significance as the birthplace of the tenth Sikh Guru, Guru Gobind Singh Ji.",
      topTouristAttraction: {
        name: "Golghar",
        details: "A massive, beehive-shaped granary built by Captain John Garstin in 1786. It offers a panoramic view of the city and the river Ganga from its summit."
      },
      seasonalVisit: [
        { season: "Winter", months: "October to February", weather: "Pleasant, temperatures range from 10–25°C", whyVisit: "Ideal for sightseeing, boat rides, and outdoor activities" },
        { season: "Summer", months: "March to June", weather: "Scorching heat and high humidity", whyVisit: "Carry sun protection gear if visiting" },
        { season: "Monsoon", months: "June to September", weather: "Heavy rainfall, occasional thundershowers, strong winds", whyVisit: "Lush riverbanks and green parks at their best" }
      ],
      whyInTouristList: [
        "Witness the confluence of historical eras dating back over 2,500 years.",
        "Visit Takht Sri Patna Sahib, one of the holiest shrines in Sikhism.",
        "Explore the Bihar Museum, showing world-class archaeological treasures from antiquity.",
        "Take a serene boat cruise along the banks of the Ganges."
      ],
      topAttractions: [
        { name: "Takht Sri Patna Sahib", image: "/src/assets/patna-sahib.png", description: "One of the five Takhts (seats of authority) in Sikhism, this gurdwara marks the birthplace of the tenth and last Sikh Guru, Guru Gobind Singh Ji. It houses sacred relics including his iron arrow, golden shoes, and royal cradle. The present building was constructed in the early 19th century by Maharaja Ranjit Singh. The shrine draws lakhs of pilgrims annually from across India and the world. Its golden domes are a defining landmark of Patna's riverfront skyline." },
        { name: "Bihar Museum", image: "/src/assets/bihar-monument.png", description: "The Bihar Museum is a world-class modern institution showcasing 2,500 years of Bihar's rich civilizational history. Its signature exhibit is the celebrated Didarganj Yakshi, a stunning Mauryan-period polished sandstone sculpture. Designed by the Maki and Associates firm from Japan, the museum has gleaming galleries across six themed zones. Rare artefacts from the Maurya, Gupta, and Pala periods are displayed with contemporary curatorial finesse. It stands as one of India's finest state museums, rivaling international standards." },
        { name: "Kumhrar", image: "/src/assets/bihar-heritage.png", description: "Kumhrar is the primary archaeological site in Patna revealing the ancient splendour of Pataliputra, the Mauryan capital. Here lie the remains of the famous 80-pillared assembly hall, believed to be built by Emperor Chandragupta Maurya. Excavations have uncovered wood floors, terracotta figurines, punch-marked coins, and ring wells. A small museum on site displays the most important recovered artifacts. Visiting Kumhrar is equivalent to walking through early Indian political history." },
        { name: "Sanjay Gandhi Jaivik Udyan", image: "/src/assets/bihar-mountains.png", description: "One of the most expansive zoological parks and botanical gardens in Eastern India, spread over 153 acres along the Ganga riverside. The zoo houses Bengal tigers, leopards, gharials, the Indian python, and a diverse collection of exotic bird species. Walking pathways snake through lush greenery encompassing a central lake with resident waterfowl. A special aquarium pavilion and a toy train make it popular with families and children. It offers a serene nature retreat in the heart of busy Patna city." }
      ],
      howToReach: {
        air: "Patna is connected by Jay Prakash Narayan International Airport, which runs daily direct flights to major Indian cities like Delhi, Mumbai, Kolkata, and Bengaluru.",
        rail: "Patna Junction (PNBE) is a major railway hub of East India, connected to all parts of the country via express and superfast trains.",
        road: "Patna is well-connected by highways including NH 19, NH 20, and NH 31. Regular state bus services link Patna to neighboring states and cities."
      }
    },
    gaya: {
      name: "Gaya",
      tagline: "The Land of Enlightenment and Salvation",
      introduction: "Gaya is a city of immense spiritual energy, revered globally by Buddhists and Hindus alike. Surrounded by small rocky hills and the Falgu river, it provides a quiet sanctuary of devotion.",
      richHistory: "Mentioned in the Ramayana and Mahabharata, Gaya is where Lord Rama offered pind-daan for his father. Neighboring Bodh Gaya is the sacred site where Prince Siddhartha Gautama attained supreme enlightenment under the Bodhi Tree to become the Buddha, establishing a philosophy that transformed Asia.",
      topTouristAttraction: {
        name: "Mahabodhi Temple Complex",
        details: "A UNESCO World Heritage site centered around the ancient temple and the holy Bodhi Tree where Buddha attained enlightenment."
      },
      seasonalVisit: [
        { season: "Winter", months: "November to February", weather: "Cool and dry, 10–22°C — peak pilgrim season", whyVisit: "Overlap with major Buddhist prayers and congregations worldwide" },
        { season: "Summer", months: "March to June", weather: "Intense heat reaching 40°C", whyVisit: "Avoid outdoor exploration; temple interiors still accessible" },
        { season: "Monsoon", months: "July to October", weather: "Moderate to heavy rainfall, occasional flooding", whyVisit: "Scenic greenery around the Falgu river; fewer crowds" }
      ],
      whyInTouristList: [
        "Sit under the sacred Bodhi Tree where Buddhism was born.",
        "Perform ancestral rites (Pind Daan) at the Vishnupad Temple on the banks of Falgu.",
        "Marvel at the giant 80-foot Great Buddha Statue constructed in the Japanese style.",
        "Visit diverse monasteries built by nations like Thailand, Tibet, and Japan."
      ],
      topAttractions: [
        { name: "Vishnupad Temple", image: "/src/assets/bihar-temple.png", description: "One of the holiest Hindu temples in Bihar, Vishnupad is built over a footprint of Lord Vishnu embedded in solid basalt rock. The current silver-plated temple was constructed in 1787 by Queen Ahilya Bai Holkar of Indore. It stands at the edge of the Falgu river and is encircled by 44 carved pillars supporting an 30-metre tall spire. Hindus from across India visit to perform Pind Daan rituals for their ancestors on the banks of the Falgu river. It is a deeply revered site of intersection between mythology, architecture, and living faith." },
        { name: "Great Buddha Statue", image: "/src/assets/bodh-gaya.png", description: "This colossal 80-foot stone statue of Gautama Buddha dominates the Bodh Gaya skyline and attracts pilgrims and visitors from global Buddhist communities. Built by Daijokyo Buddhist Society of Japan and unveiled in 1989, the statue depicts the Dhyana Mudra pose symbolizing deep meditation. Encircling the statue are ten smaller sandstone statues of Buddha in various mudras. The surrounding park is beautifully landscaped with flowering trees and meditation walks. The statue is visible across much of the Gaya plain and has become an iconic symbol of Bihar's Buddhist heritage." },
        { name: "Dungeshwari Cave Temples", image: "/src/assets/bihar-heritage.png", description: "These ancient cave temples are carved into an imposing rocky hill about 12 km from Bodh Gaya. The caves are revered as the site where Siddhartha Gautama undertook six years of severe ascetic practice before finally descending to Bodh Gaya for enlightenment. A small Hindu shrine dedicated to Dungeshwari Devi sits alongside the Buddhist cave shrines, reflecting a beautiful coexistence of faiths. Tibetan Buddhist monasteries have been established near the caves and maintain them actively today. The dramatic natural rock formations and peaceful surroundings make for a profoundly atmospheric spiritual experience." },
        { name: "Barabar Caves", image: "/src/assets/bihar-mountains.png", description: "The Barabar Caves are the oldest surviving rock-cut cave temples in India, dating to the Mauryan Empire period around 3rd century BCE. Commissioned by Emperor Ashoka, these polished granite hollows were given to the Ajivika sect of Hindu ascetics for their meditation. The interiors are polished to a mirror shine using the famous Mauryan stone-polishing technique, creating exceptional acoustics. Four caves have been preserved — Lomas Rishi, Sudama, Vishvakarma, and Karn Chopar — each with inscriptions in Brahmi script. British author E.M. Forster was so inspired by these caves that he modelled the mysterious Marabar Caves in his novel \"A Passage to India\"." }
      ],
      howToReach: {
        air: "Gaya Airport is the second largest airport in Bihar, offering local flights and international seasonal charters to Southeast Asian countries.",
        rail: "Gaya Junction is a major station on the Grand Chord route, regular trains run from Delhi, Kolkata, Patna, and Ranchi.",
        road: "Gaya is connected to Patna via State Highway 1 and is located near national highway GT road (NH 19) linking Delhi and Kolkata."
      }
    },
    nalanda: {
      name: "Nalanda",
      tagline: "The Sanctuary of Knowledge and Wisdom",
      introduction: "Nalanda is synonymous with India's golden academic age. It invites travelers to walk through the ruins of the world’s first residential university.",
      richHistory: "Founded in the 5th century CE under the patronage of the Gupta Empire, Nalanda University flourished for over 700 years as the premier seat of learning in Asia, housing 10,000 students and 2,000 teachers from China, Korea, and Central Asia before its tragic library burnings.",
      topTouristAttraction: {
        name: "Nalanda University Ruins",
        details: "A UNESCO World Heritage site consisting of ancient red-brick monasteries, temples, and lecture halls."
      },
      seasonalVisit: [
        { season: "Winter", months: "October to March", weather: "Clear skies, 8–24°C — ideal excavation weather", whyVisit: "Best time for outdoor exploration of the archaeological park" },
        { season: "Summer", months: "April to June", weather: "Hot and dusty, up to 42°C", whyVisit: "Visit early morning; museum interiors provide cool respite" },
        { season: "Monsoon", months: "July to September", weather: "Heavy rainfall, green surroundings", whyVisit: "Reduced footfall; ruins look dramatically atmospheric after rain" }
      ],
      whyInTouristList: [
        "Witness the ruins of a library so vast that it burned for three months.",
        "Walk the paths where Chinese scholar Xuanzang studied and taught.",
        "Explore the Xuanzang Memorial Hall, representing Sino-Indian friendship and culture.",
        "Visit Pawapuri, the sacred site of Mahavira’s nirvana nearby."
      ],
      topAttractions: [
        { name: "Nalanda Archaeological Museum", image: "/src/assets/nalanda.png", description: "Located adjacent to the excavated ruins, the Nalanda Archaeological Museum was established in 1917 and houses over 13,500 antiquities excavated from the Nalanda University site. Collections include rare bronze statues of Buddha and Bodhisattvas, terracotta tablets, coins, and thousands of pottery fragments. A prized exhibit is the 9th-century copper plate inscription recording land grants from the Pala king Devapala. The museum provides essential context for the architectural grandeur of the ruins outside. It is a must-visit before or after touring the park to fully appreciate the historical depth." },
        { name: "Xuanzang Memorial Hall", image: "/src/assets/bihar-heritage.png", description: "The Xuanzang Memorial Hall was built in 1957 to honour the famous 7th-century Chinese Buddhist monk Xuanzang, who spent years studying at Nalanda. The hall was constructed as a symbol of Sino-Indian cultural friendship and contains a relic of Xuanzang in a specially gifted Chinese brass casket. Its Chinese-style curved tiled roof and ornamental gates are unique architectural elements in the region. A life-size statue of Xuanzang stands prominently in the courtyard, staff in hand. This site reminds visitors of Nalanda's global reach and its role as a bridge between ancient Asia's civilizations." },
        { name: "Kundalpur", image: "/src/assets/pawapuri.png", description: "Kundalpur is a small but religiously significant village located about 26 km from Nalanda, revered by Jains as the birthplace of Vardhamana Mahavira, the 24th Tirthankara of Jainism. The site contains beautifully maintained Jain temples with white marble interiors and intricate stone carvings. Thousands of Jain devotees make the pilgrimage to Kundalpur, especially during the festival of Mahavir Jayanti. The peaceful green surroundings contrast with the deeply spiritual atmosphere inside the temple complex. This sacred site makes an important addition to any heritage circuit through Nalanda district." },
        { name: "Pawapuri Jal Mandir", image: "/src/assets/pawapuri.png", description: "The Jal Mandir of Pawapuri is a stunning white marble temple located at the centre of a large, flower-filled lotus tank and connected to the shore by a narrow marble causeway. This tranquil site holds extraordinary significance in Jainism — it is the exact spot where Lord Mahavira, the 24th Tirthankara, attained nirvana and was cremated in 500 BCE. According to legend, so many devotees gathered to collect the sacred soil that a lake formed in its place. Today, the pink lotus blooms that cover the tank make for an extraordinarily beautiful and serene setting. The reflections of the white marble temple in the still water create an unforgettable visual experience." }
      ],
      howToReach: {
        air: "The nearest airport is Jay Prakash Narayan International Airport in Patna (about 90 km away) or Gaya Airport (about 95 km away).",
        rail: "Rajgir Railway Station and Bihar Sharif Junction are the closest major railway points, with daily trains connecting Patna and Delhi.",
        road: "Nalanda is connected via NH 120 and state double-lane roads with Patna, Gaya, and other historical tourism sites."
      }
    },
    vaishali: {
      name: "Vaishali",
      tagline: "The Cradle of Democracy and Peace",
      introduction: "Vaishali is a small, peaceful district holding a massive footprint in human history as the birthplace of the world's first republic.",
      richHistory: "Established in the 6th century BCE by the Licchavi dynasty, Vaishali pioneered democratic self-governance. It is deeply revered in Jainism as the birthplace of Lord Mahavira, and in Buddhism as the site of Lord Buddha's last sermon.",
      topTouristAttraction: {
        name: "Ashokan Pillar",
        details: "A perfectly preserved monolithic polished sandstone pillar crowned by a single lion facing northwards."
      },
      seasonalVisit: [
        { season: "Winter", months: "October to March", weather: "Mild and pleasant, 10–24°C", whyVisit: "Perfect for walking the brick stupa ground and meditation pools" },
        { season: "Summer", months: "April to June", weather: "Hot dry spell, up to 40°C", whyVisit: "Carry water; morning hours are enjoyable" },
        { season: "Monsoon", months: "July to September", weather: "Moderate rains, lush green landscape", whyVisit: "Wetlands flourish — excellent for birdwatching around the tank" }
      ],
      whyInTouristList: [
        "Stand on the soil of the world's very first republic (republic of Licchavis).",
        "View the relic stupa which once housed the ashes of the Buddha.",
        "Visit the birth soil of Lord Mahavira at Kundalpur/Kshatriyakund.",
        "See the Abhishek Pushkarini, the coronation tank of Vaishali's ancient rulers."
      ],
      topAttractions: [
        { name: "Relic Stupa", image: "/src/assets/vaishali.png", description: "One of the eight original stupas built over the mortal remains of the Buddha, the Relic Stupa of Vaishali is revered as one of the most sacred Buddhist monuments in the world. The Licchavi rulers received their share of the cremated relics and enshrined them within this ancient circular brick mound. Excavations in 1958 revealed a stone reliquary casket containing bones, charcoal, soil, and other sacred material. The stupa stands within a tranquil archaeological park dotted with ancient brick structures and Ashokan monuments. Its cultural and spiritual weight is immense for both Buddhist and Jain pilgrims who visit year-round." },
        { name: "Kundanpur", image: "/src/assets/pawapuri.png", description: "Kundanpur, also called Kshatriyakund, is revered in Jainism as the exact birthplace of Lord Mahavira, the 24th Tirthankara. Tall, ornate Jain temples with gilded spires and white marble interiors dominate this pilgrimage site. Intricate stone murals depicting scenes from Mahavira's life cover the inner sanctum walls. Thousands of Jain pilgrims flock here every year, especially during the auspicious Mahavir Jayanti celebration. The serene green surroundings and the deeply spiritual atmosphere make this a profoundly moving destination." },
        { name: "Coronation Tank (Abhishek Pushkarini)", image: "/src/assets/vaishali.png", description: "The Abhishek Pushkarini is an ancient rectangular water pool where the elected officials of the Licchavi republic were ceremonially anointed before taking office. This makes it one of the world's oldest surviving symbols of democratic ceremonial practice. The tank's still, sacred waters are surrounded by well-maintained gardens and ancient brick embankments. Just steps away stands the magnificent Ashokan Pillar, forming a profound historical ensemble. The site powerfully connects modern visitors to the inception of representative governance over 2,500 years ago." },
        { name: "Vishwa Shanti Stupa", image: "/src/assets/vaishali.png", description: "The Vishwa Shanti Stupa, or World Peace Pagoda, is a gleaming white hemispherical dome built by the Japanese Buddhist organization Nipponzan Myohoji. It stands in a beautifully maintained park near the Ashokan Pillar and is one of 80 such peace pagodas built globally by this organization. Four gilded statues of the Buddha representing birth, enlightenment, first sermon, and nirvana adorn its outer perimeter at the four cardinal points. The stupa is a popular site for walking meditation, yoga practitioners, and Buddhist retreat groups. Its luminous white exterior against the open Bihar sky creates an unforgettable visual impression." }
      ],
      howToReach: {
        air: "Patna Airport is the closest airport (approx 55 km away). Cabs and taxis are readily available for transport across the Ganga river.",
        rail: "Hajipur Junction is the closest main railway terminal (approx 25 km away), connected to all divisions of East Central Railway.",
        road: "Vaishali is linked to Hajipur and Patna by National Highway 19, crossing the historic Mahatma Gandhi Setu bridge."
      }
    },
    bhagalpur: {
      name: "Bhagalpur",
      tagline: "The Famous Silk City of East India",
      introduction: "Bhagalpur, situated on the plains of the Ganges, is nationally famous for its Tussar Silk industry and its biodiversity hotspots.",
      richHistory: "Anciently part of Anga, ruled by Maharaja Karna of Mahabharata lore, the region has been a major trade gateway since Gupta times. It is also home to the ruins of Vikramshila University, founded by King Dharmapala.",
      topTouristAttraction: {
        name: "Vikramshila University Ruins",
        details: "Rivaling Nalanda, this ancient university was the premier center for Vajrayana Buddhist tantric research."
      },
      seasonalVisit: [
        { season: "Winter", months: "October to February", weather: "Cool and dry, 10–22°C", whyVisit: "Best season for Gangetic dolphin sightings on the river Ganga" },
        { season: "Summer", months: "March to June", weather: "Very hot and humid, up to 43°C", whyVisit: "Silk market shopping best in cooler morning hours" },
        { season: "Monsoon", months: "July to September", weather: "Heavy rainfall; swollen Gangetic banks", whyVisit: "River views are dramatic; avoid riverbank trekking in floods" }
      ],
      whyInTouristList: [
        "Witness the legendary ruins of Vikramshila, a global Buddhist university.",
        "Explore the Vikramshila Gangetic Dolphin Sanctuary, India’s only protected reserve for national aquatic animals.",
        "Shop authentic, handloom Bhagalpuri Tussar Silk directly from local weavers.",
        "View the sacred temple on Mandar Hill, tied to the myth of the Ocean Churning (Samudra Manthan)."
      ],
      topAttractions: [
        { name: "Vikramshila Gangetic Dolphin Sanctuary", image: "/src/assets/bhagalpur-district.png", description: "Stretching across 50 km of the Ganges, this sanctuary is India's only dedicated wildlife reserve for the critically endangered South Asian River Dolphin, the national aquatic animal. Boat rides through the sanctuary offer magical glimpses of dolphins leaping above the Ganges currents in the early morning light. The sanctuary supports over 150 dolphins, one of the world's most important river dolphin populations. Seasonal birds like migratory terns and giant kingfishers add rich biodiversity to this riverside habitat. The sanctuary is jointly managed by the Forest Department and engaged local conservation communities." },
        { name: "Mandar Hill", image: "/src/assets/bihar-mountains.png", description: "Mandar Hill is a dramatic 750-foot granite monolith, traditionally used as a churning rod by gods and demons during the mythological Samudra Manthan as described in the Vishnu Purana. Ancient carvings of Varaha, Madhusudan, and other Vishnu avatars are etched directly into the bare granite rock face of the hill. A scenic climb up 700 rough-hewn steps rewards visitors with panoramic views of the green Bhagalpur countryside and glittering rivers below. Three sacred ponds called Papharni, Ama, and Sita Kund lie at the base, attracting pilgrims year-round. The Makara Mela festival every January draws massive crowds from across Bihar and Jharkhand." },
        { name: "Kupeshwar Nath Temple", image: "/src/assets/bihar-temple.png", description: "One of East Bihar's most ancient Shaivite pilgrimage shrines, this remarkable temple is named after a legendary bottomless well within its complex believed to connect to the underworld. The temple complex faces the Ganga river and is encircled by ancient terracotta plaques, Nandi statues, and eroded medieval stone carvings. It is a key destination during Mahashivaratri, when thousands of devotees arrive for night-long vigils and ceremonial bathing of the Shivalinga. The riverside aarti performed at dusk on the adjacent Ganga ghat is a deeply moving spiritual spectacle. The overall complex has an atmosphere of extreme antiquity and sacredness." },
        { name: "Ajgaibinath Temple (Sultanganj)", image: "/src/assets/bhagalpur-district.png", description: "This remarkable Shiva temple perches atop an ancient granite island rising dramatically from the middle of the Ganga at Sultanganj, accessible only by boat. The rocky island is a geological marvel — untouched by monsoon floods for thousands of years and considered divinely protected. During the auspicious Shravan month, this is the starting point of the Kanwar Yatra, during which millions of barefoot pilgrims walk 105 km to Deoghar carrying Ganga water. The nearby Sultanganj Buddha, a stunning 1,500-year-old Gupta-era bronze statue, was discovered in this very area and is now displayed in Birmingham Museum. The boat crossing through the strong river currents to reach the temple is an adventure in itself." }
      ],
      howToReach: {
        air: "Patna Airport is the nearest commercial airport (about 235 km away). Bagdogra Airport in West Bengal is also an alternative options.",
        rail: "Bhagalpur Junction (BGP) is a major railway station connecting North-Eastern regions with Patna, Kolkata, and Delhi.",
        road: "National Highway 80 crosses Bhagalpur directly, making it highly connected via local express buses and highway state networks."
      }
    },
    muzaffarpur: {
      name: "Muzaffarpur",
      tagline: "The Lychee Capital of India",
      introduction: "Muzaffarpur is the commercial capital of North Bihar, globally recognized for its sweet Shahi Lychees and its rich agricultural influence.",
      richHistory: "Created in the 19th century and named after Muzaffar Khan, the region boasts archaeological connectives to the ancient kingdom of Mithila. It has always played a vital role in cultural trade routes connecting India to Nepal.",
      topTouristAttraction: {
        name: "Baba Garibnath Temple",
        details: "One of the most famous temples dedicated to Lord Shiva in North Bihar, which displays immense crowded festivals during Shravan."
      },
      seasonalVisit: [
        { season: "Winter", months: "November to March", weather: "Cool and pleasant, 8–22°C", whyVisit: "Ideal for touring the city and visiting lychee orchards in bloom" },
        { season: "Summer (Lychee Season)", months: "April to June", weather: "Hot and humid, up to 41°C", whyVisit: "Peak lychee harvest — visit farms for direct tasting experience" },
        { season: "Monsoon", months: "July to October", weather: "Heavy rainfall, humid conditions", whyVisit: "Lush green outskirts; Baba Garibnath temple attracts huge crowds during Shravan" }
      ],
      whyInTouristList: [
        "Visit Baba Garibnath Temple, an important spiritual hub of Shaivism in Bihar.",
        "Dwell in the sweet orchards yielding the famous, sweet Shahi Lychees in the summer.",
        "Browse and purchase specialized traditional Bihari clothes and Lahthi (lac bangles) from local artisans.",
        "Explore the peaceful Buddhist relic stupas in Kesaria and surrounding archaeological locations."
      ],
      topAttractions: [
        { name: "Baba Garibnath Temple", image: "/src/assets/bihar-temple.png", description: "One of the most famous and heavily visited Shiva temples in North Bihar, dedicated to the folk deity Baba Garibnath revered as a compassionate protector of the poor. During the auspicious Shravan month, lakhs of Kanwar pilgrims converge here for ceremonial bathing of the Shivalinga with Ganga water carried on foot from distant ghats. The temple compound is adorned year-round with marigold garlands, saffron flags, and the sound of devotional chanting. Dawn and dusk aartis at the inner sanctum attract large congregations of devotees. Additional shrines for Hanuman, Durga, and Ganesha within the compound create a complete spiritual enclosure." },
        { name: "Litchi Gardens", image: "/src/assets/bihar-mountains.png", description: "Muzaffarpur and its surrounding rural belt form the world's most celebrated litchi-growing zone, producing the GI-tagged Shahi Lychee famous for its thin crimson skin, melt-in-the-mouth texture, and intensely sweet floral aroma. During the brief peak harvest of May to June, orchards open for farm visits where visitors can pluck and taste lychees directly from the branches. The Geographical Indication status protects the Shahi Lychee as exclusively from this region, with exports to the UAE, Netherlands, UK, and beyond. Vast litchi orchards stretch across the landscape of the Muzaffarpur countryside, painting it in deep lush green. A visit during harvest season is a truly sensory experience unlike any other agricultural journey." },
        { name: "Ramchandra Shahi Museum", image: "/src/assets/bihar-heritage.png", description: "Named after zamindari ruler Raj Shri Ramchandra Shah, this district museum holds one of Bihar's older regional heritage collections spanning ancient coins, terracotta statuettes, stone inscriptions, Buddhist bronzes, and Maithili manuscripts. A gallery dedicated to the regional independence movement contains signed letters, photographs, and personal effects of local leaders who sacrificed for India's freedom. The museum's curated antiquities reveal the deep cultural prestige of the Mithila cultural zone across centuries. Being rarely crowded, it provides a peaceful and contemplative afternoon alternative to the city's busy markets. History enthusiasts will find its depth of archives and artefacts genuinely satisfying." },
        { name: "Kesaria Stupa", image: "/src/assets/bihar-heritage.png", description: "Located 110 km from Muzaffarpur, Kesaria Stupa is one of the largest Buddhist stupas in the world — quite possibly the globally tallest ancient stupa surviving today at over 32 metres. Traditionally believed to mark the site where the Buddha said his final farewell to the Lichchhavi followers before departing for Kushinagar, it occupies an extraordinarily significant place in Buddhist geography. The stupa consists of six tiered terraces with carved niches that once contained hundreds of Buddha statues, now mostly empty from erosion. Archaeological excavations have uncovered terracotta seals, pottery, and copper plates indicating multiple periods of habitation and renovation. Its immense scale, remote location, and serene surroundings make it a pilgrimage for history enthusiasts willing to venture off the beaten track." }
      ],
      howToReach: {
        air: "The nearest international airport is Patna Airport (approx 75 km away). Taxis run regularly via the toll highway corridor.",
        rail: "Muzaffarpur Junction (MFP) is an important A1 class railway station, forming the divisional office of East Central Railway with direct trains to major Indian capitals.",
        road: "Connected directly via NH 28, NH 57, and NH 77, linking Muzaffarpur directly to Nepal, Patna, and Eastern India."
      }
    },
    darbhanga: {
      name: "Darbhanga",
      tagline: "The Cultural Capital of Mithila",
      introduction: "Darbhanga is a historic city famous for its royal palaces, Mithila painting galleries, and vibrant folk music.",
      richHistory: "Serving as the capital of the Darbhanga Raj, one of the wealthiest landlord estates in British India, the district exhibits magnificent modern and ancient structural ruins. It is the core custodian of Maithili traditions, languages, and paintings.",
      topTouristAttraction: {
        name: "Darbhanga Royal Palaces",
        details: "A series of majestic palaces including the Lalit Narayan Mithila University campus and the surrounding Kameshwar Singh Fort."
      },
      seasonalVisit: [
        { season: "Winter", months: "October to March", weather: "Cool and festive, 8–22°C", whyVisit: "Coincides with Kali Puja, Kojagari Lok Utsav, and Mithila art fairs" },
        { season: "Summer", months: "April to June", weather: "Very hot and humid, reaching 42°C", whyVisit: "Visit museums and palace interiors to stay sheltered from the heat" },
        { season: "Monsoon", months: "July to September", weather: "Heavy rainfall, waterlogged roads possible", whyVisit: "Kusheshwar Asthan wetlands host spectacular migratory birds" }
      ],
      whyInTouristList: [
        "Stroll through the grand palaces built by the royal family of Darbhanga.",
        "Savor authentic regional dishes including mangoes, Makhana (fox nuts), and fish.",
        "Discover the roots of the world-famous Mithila (Madhubani) art forms.",
        "Visit Chandradhari Museum, which displays royal weapons and artifacts."
      ],
      topAttractions: [
        { name: "Darbhanga Raj Fort", image: "/src/assets/darbhanga-district.png", description: "The Darbhanga Raj Fort and palace complex served as the regal seat of the Darbhanga Maharajas, among the most powerful feudal lords of colonial India. Its imposing walls, reminiscent of those in Delhi's Red Fort, enclose palaces, temples, private ponds, and administrative buildings across a sweeping compound. Rare paintings, royal manuscripts in Sanskrit and Maithili, antique weapons, and royal furniture are preserved within the residential sections. The Anand Bagh zone features a celebrated private garden and a royal music pavilion used by classical musicians. The complex is partly occupied by Lalit Narayan Mithila University, giving it a uniquely living significance." },
        { name: "Ahilya Asthan", image: "/src/assets/bihar-temple.png", description: "Ahilya Asthan is a mythologically charged pilgrimage site believed to be where sage Gautama's wife Ahilya was cursed to stone and later liberated by the footsteps of Lord Rama, as recounted in the Ramayana. A revered local temple flanked by dense sacred groves marks this ancient location with a deeply serene woodland ambiance. Thousands of devotees arrive during Ram Navami and Vivah Panchami for large-scale devotional celebrations with music and kirtans filling the air. A sacred kund adjacent to the temple is used for ritual bathing by pilgrims seeking blessings. The site carries multiple layers of mythological depth and quiet, unquestioned devotion that is uniquely Bihar." },
        { name: "Chandradhari Museum", image: "/src/assets/bihar-heritage.png", description: "Named after Maharaj Chandradhari Sinha, this museum holds one of the most important district-level heritage collections in Bihar. Royal weaponry including swords, shields, and flintlock muskets sit alongside exquisite ivory artifacts, carved wooden panels, and photographs documenting Darbhanga Raj society at the height of the British Indian period. A rare gallery of palm-leaf manuscripts in Maithili preserves literary traditions of the Mithila cultural zone that stretch back many centuries. The museum's historical photographs are particularly illuminating, offering a window into the opulent feudal court life of North Bihar. It is a uniquely compelling destination for those curious about the cultural richness of the Mithila royal legacy." },
        { name: "Kusheshwar Asthan Bird Sanctuary", image: "/src/assets/bihar-mountains.png", description: "This 68 sq km shallow wetland lake transforms every winter from October to March into one of the most spectacular waterbird habitats in Eastern India. Thousands of migratory species from Central Asia, China, and Siberia — including bar-headed geese, pintail ducks, great cormorants, and painted storks — arrive here annually in extraordinary numbers. Local boatmen guide birdwatchers silently through the reed beds for up-close sightings of sarus cranes and rare wintering waders. Freshwater turtles and river otters complete the rich biodiversity profile of this important wetland ecosystem. The surrounding landscape of fishing villages, open paddy fields, and vast skies reflects the timeless agrarian character of rural Mithila." }
      ],
      howToReach: {
        air: "Darbhanga Airport (DBG) is an operational civil airport connecting the Mithila region directly to cities like Delhi, Mumbai, Bengaluru, and Kolkata.",
        rail: "Darbhanga Junction (DBG) connects directly to Delhi, Patna, Kolkata, and Mumbai via the Samastipur-Darbhanga line.",
        road: "Beautifully accessible via NH 57 (East-West Corridor road networks) and regular private and state bus terminals."
      }
    }
  };

  export const getDistrictDetail = (districtName: string): DistrictDetail => {
    const normalized = districtName.toLowerCase().replace(/\s+/g, "").trim();
    const searchName = districtName.includes("(") ? districtName.split(" (")[0] : districtName;

    // Search in static details
    for (const key of Object.keys(staticDistrictDetails)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return staticDistrictDetails[key];
      }
    }

    // Fallback dynamic generator if the district is not specifically coded
    return {
      name: searchName,
      tagline: `Discover the Heritage of ${searchName}`,
      introduction: `${searchName} is one of the administrative regions of Bihar, rich in local community traditions, agricultural vitality, and historical stories nested within local folklore.`,
      richHistory: `${searchName} has witnessed centuries of regional growth, transitioning through eras of ancient empires and British administration. Modern developments reside next to traditional landmarks, keeping its historical roots alive.`,
      topTouristAttraction: {
        name: `Ancient Temple of ${searchName}`,
        details: `A highly revered local religious site that boasts historical architecture and serves as a major gathering point for regional festivals.`
      },
      seasonalVisit: [
        { season: "Winter", months: "October to March", weather: "Pleasant and cool, 10–24°C", whyVisit: "Best weather for sightseeing, festivals, and outdoor exploration" },
        { season: "Summer", months: "April to June", weather: "Hot and dry, up to 42°C", whyVisit: "Early morning visits to temples and parks recommended" },
        { season: "Monsoon", months: "July to September", weather: "Moderate to heavy rainfall", whyVisit: "Lush green landscape; local culture very active during festivals" }
      ],
      whyInTouristList: [
        `Experience the authentic, welcoming rural culture and community life of ${searchName}.`,
        `Explore unique local temples, historical sites, and regional natural spots.`,
        `Witness beautiful local festivals and rituals celebrated with high devotion.`,
        `Savor regional culinary specialties unique to this district of Bihar.`
      ],
      topAttractions: [
        { name: `${searchName} Central Market`, image: "/src/assets/bihar-heritage.png", description: `The central marketplace of ${searchName} is a vibrant hub of local commerce and culture, where artisan crafters, spice traders, and street food vendors bring the district's identity alive. Narrow lanes are packed with colorful stalls selling traditional handicrafts, terracotta pottery, handloom textiles, and locally grown agricultural produce. The market comes alive at its most festive during regional celebrations and harvest seasons. Sampling local street food here — including sattu-based snacks, thekua, and regional sweets — offers an authentic culinary window into Bihar's flavors. A morning walk through this market is one of the most unscripted, immersive ways to experience the soul of ${searchName}.` },
        { name: "Historic Memorial Park", image: "/src/assets/bihar-monument.png", description: `The Historic Memorial Park commemorates the local heroes and important historical moments that shaped ${searchName}'s identity and contributed to the broader story of Bihar and India. Stone plinths, bronze statues, and inscribed tablets dot the well-maintained gardens honoring freedom fighters, social reformers, and cultural icons from the region. The park is a popular morning and evening gathering space for residents of all ages. Cultural events, civic commemorations, and Republic Day celebrations are frequently held within its manicured grounds. Visiting here gives context to the community pride and historical roots of the district.` },
        { name: "River Ganga Ghat", image: "/src/assets/bihar-mountains.png", description: `The ghats along the river banks near ${searchName} offer a deeply peaceful encounter with Bihar's timeless riverine culture. At dawn, the air fills with the fragrance of incense as devotees perform ritual bathing and aarti ceremonies at the water's edge. Fishing boats glide silently across the wide expanse of river as the morning light turns its surface golden. The ghat's stone steps descend into clear water flanked by ancient temples and meditation platforms. Evenings bring community gatherings, storytelling sessions, and occasional folk music performances under the canopy of stars.` },
        { name: "Local Folk Center", image: "/src/assets/bihar-folk-dance.png", description: `The Local Folk Center is a dedicated cultural institution preserving and promoting the traditional arts, music, and crafts unique to ${searchName} and the broader Mithila region. Live demonstrations by master artisans showcase Madhubani painting, clay idol making, bamboo weaving, and traditional silk dyeing techniques passed down through generations. A permanent exhibition hall displays curated historical artifacts, folk costumes, and festival memorabilia. Regular workshops invite visitors to try their hand at local crafts under artisan guidance. The Center acts as a living bridge between the district's heritage past and its contemporary cultural identity.` }
      ],
      howToReach: {
        air: "Nearest air connectivity is available via Jay Prakash Narayan International Airport in Patna.",
        rail: `${searchName} Junction connects directly to the regional railway lines network of the East Central Railway division.`,
        road: `${searchName} is connected by regional asphalt state highways and links directly to adjacent district road hubs.`
      }
    };
  };
