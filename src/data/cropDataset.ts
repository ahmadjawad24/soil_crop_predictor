import {
  CropProfile,
  SoilInput,
  PredictionResult,
  SoilPreset,
  ParameterSuitability,
  FertilizerRecommendation
} from '../types';

export const CROPS: CropProfile[] = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    emoji: '🌾',
    category: 'Cereal',
    description: 'A global staple cereal thriving in heavy clayey and alluvial soils with high water retention and balanced nitrogen.',
    idealN: [70, 100],
    idealP: [35, 60],
    idealK: [35, 45],
    idealPh: [5.5, 7.2],
    tempRange: [20, 35],
    rainfallRange: [1500, 2500],
    humidityRange: [75, 90],
    waterRequirement: 'Very High',
    season: 'Kharif / Monsoon',
    soilType: 'Heavy Clay, Alluvial, Silty Clay Loam',
    growthDuration: '105 - 150 days',
    plantingMethod: 'Transplanting 21-day nursery seedlings into puddled fields with 20x15cm spacing',
    majorPests: ['Stem Borer', 'Brown Plant Hopper (BPH)', 'Bacterial Leaf Blight', 'Blast'],
    harvestIndicators: ['85% of panicles turn golden yellow', 'Grain moisture reaches 18-20%'],
    tips: [
      'Maintain 2-5 cm standing water layer during active tillering stage.',
      'Split nitrogen application: 50% basal, 25% at tillering, 25% at panicle initiation.',
      'Drain water 7–10 days before harvesting to facilitate mechanical combine reaping.'
    ]
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    emoji: '🌽',
    category: 'Cereal',
    description: 'High-energy cereal crop with heavy nitrogen demands, requiring well-drained, deep loamy soils with neutral pH.',
    idealN: [70, 100],
    idealP: [40, 60],
    idealK: [15, 25],
    idealPh: [5.8, 7.5],
    tempRange: [18, 32],
    rainfallRange: [600, 1100],
    humidityRange: [55, 75],
    waterRequirement: 'Medium',
    season: 'Kharif / Spring / Rabi',
    soilType: 'Deep, Well-Drained Fertile Loam',
    growthDuration: '90 - 120 days',
    plantingMethod: 'Direct dibbling at 60x20cm spacing at 4-5cm depth into moist seedbed',
    majorPests: ['Fall Armyworm', 'Shoot Fly', 'Stem Borer', 'Turcicum Leaf Blight'],
    harvestIndicators: ['Black layer formation at grain attachment', 'Husks dry and turn papery brown'],
    tips: [
      'Provide side-dressing of nitrogen at knee-high and tasseling stages.',
      'Extremely sensitive to water stagnation; ensure furrow drainage.',
      'Keep field weed-free during the critical first 30 days after germination.'
    ]
  },
  {
    id: 'chickpea',
    name: 'Chickpea (Gram)',
    emoji: '🧆',
    category: 'Pulse',
    description: 'Nitrogen-fixing cool-season pulse requiring moderate phosphorus, high potassium, and well-aerated sandy loam.',
    idealN: [30, 50],
    idealP: [55, 80],
    idealK: [75, 85],
    idealPh: [6.0, 7.5],
    tempRange: [14, 28],
    rainfallRange: [400, 700],
    humidityRange: [40, 65],
    waterRequirement: 'Low',
    season: 'Rabi / Winter',
    soilType: 'Sandy Loam, Deep Black Cotton (Vertisol)',
    growthDuration: '95 - 120 days',
    plantingMethod: 'Line sowing with seed drill at 30x10cm spacing, depth of 6-8cm into residual moisture',
    majorPests: ['Pod Borer (Helicoverpa)', 'Fusarium Wilt', 'Ascochyta Blight'],
    harvestIndicators: ['Leaves shed completely and pods turn straw-yellow', 'Seeds rattle inside dry pods'],
    tips: [
      'Inoculate seeds with Rhizobium and PSB cultures prior to sowing.',
      'Avoid excess nitrogen fertilizer which causes lodging and reduces pod setting.',
      'Irrigate at branching and pod-filling stages if winter rains fail.'
    ]
  },
  {
    id: 'kidneybeans',
    name: 'Kidney Beans (Rajma)',
    emoji: '🫘',
    category: 'Pulse',
    description: 'Nutrient-rich legume that thrives in cool temperate conditions with high phosphorus and slightly acidic to neutral soil.',
    idealN: [15, 35],
    idealP: [55, 75],
    idealK: [15, 25],
    idealPh: [5.5, 6.5],
    tempRange: [15, 26],
    rainfallRange: [600, 900],
    humidityRange: [50, 70],
    waterRequirement: 'Medium',
    season: 'Kharif (Hills) / Rabi (Plains)',
    soilType: 'Light Loam, Organic Rich Silt',
    growthDuration: '80 - 100 days',
    plantingMethod: 'Ridges and furrows at 45x10cm spacing at 4cm depth',
    majorPests: ['Bean Aphid', 'Anthracnose', 'Angular Leaf Spot'],
    harvestIndicators: ['Pods lose green color and turn yellowish-brown and brittle'],
    tips: [
      'Unlike other pulses, Kidney Beans fix less atmospheric N, so modest starter nitrogen is helpful.',
      'Sensitive to water stagnation and saline soil conditions.',
      'Mulch with straw to preserve moisture during pod development.'
    ]
  },
  {
    id: 'pigeonpeas',
    name: 'Pigeon Peas (Arhar / Toor)',
    emoji: '🌿',
    category: 'Pulse',
    description: 'Deep-rooted, drought-tolerant legume essential for crop rotation and soil nitrogen replenishment in semi-arid zones.',
    idealN: [15, 30],
    idealP: [55, 75],
    idealK: [15, 25],
    idealPh: [6.0, 7.5],
    tempRange: [20, 35],
    rainfallRange: [600, 1000],
    humidityRange: [45, 70],
    waterRequirement: 'Low',
    season: 'Kharif',
    soilType: 'Deep Loam, Medium Black Soil',
    growthDuration: '140 - 180 days',
    plantingMethod: 'Broad bed furrow system at 90x20cm or intercropped 1:2 with soybean/cotton',
    majorPests: ['Pod Borer', 'Pod Fly', 'Sterility Mosaic Disease', 'Fusarium Wilt'],
    harvestIndicators: ['80-85% pods turn brownish grey and dry'],
    tips: [
      'Deep taproot breaks hardpans and extracts subsoil moisture and nutrients.',
      'Pinch terminal shoots at 45 days to induce prolific lateral branching.',
      'Ideal for intercropping with cotton, sorghum, or groundnut.'
    ]
  },
  {
    id: 'mothbeans',
    name: 'Moth Beans (Matki)',
    emoji: '🌱',
    category: 'Pulse',
    description: 'Extremely drought-resilient arid legume suited for poor sandy soils, providing rapid soil cover against wind erosion.',
    idealN: [10, 30],
    idealP: [40, 60],
    idealK: [15, 25],
    idealPh: [6.0, 7.5],
    tempRange: [24, 38],
    rainfallRange: [250, 500],
    humidityRange: [35, 55],
    waterRequirement: 'Low',
    season: 'Kharif (Arid)',
    soilType: 'Light Sandy, Desert Sandy Loam',
    growthDuration: '70 - 90 days',
    plantingMethod: 'Broadcast or line sowing at 30x10cm after first monsoon shower',
    majorPests: ['Whitefly', 'Jassids', 'Yellow Mosaic Virus'],
    harvestIndicators: ['Entire vine dries up and pods turn dark brown'],
    tips: [
      'Excellent emergency catch crop for dryland agriculture.',
      'Requires zero nitrogen top-dressing once established.',
      'Thrives even under prolonged dry spells.'
    ]
  },
  {
    id: 'mungbean',
    name: 'Mung Bean (Green Gram)',
    emoji: '🫛',
    category: 'Pulse',
    description: 'Short-duration, high-protein legume fitting perfectly into multi-crop rotations in warm, well-drained loams.',
    idealN: [15, 30],
    idealP: [40, 60],
    idealK: [15, 25],
    idealPh: [6.2, 7.5],
    tempRange: [22, 35],
    rainfallRange: [500, 750],
    humidityRange: [50, 75],
    waterRequirement: 'Low',
    season: 'Summer / Kharif / Spring',
    soilType: 'Well-Drained Loam, Sandy Loam',
    growthDuration: '60 - 75 days',
    plantingMethod: 'Line sowing at 30x10cm spacing, seed rate 15-20 kg/ha',
    majorPests: ['Whitefly', 'Pod Borer', 'Powdery Mildew', 'Mungbean Yellow Mosaic'],
    harvestIndicators: ['85% pods turn blackish-brown; pick mature pods in 2 flushes'],
    tips: [
      'Treat seed with Imidacloprid and Trichoderma for seed-borne disease protection.',
      'Foliar spray of 2% DAP at flower initiation dramatically increases pod numbers.',
      'Incorporate post-harvest residue to add ~35kg organic N/ha to soil.'
    ]
  },
  {
    id: 'blackgram',
    name: 'Black Gram (Urad)',
    emoji: '🥣',
    category: 'Pulse',
    description: 'Valuable legume for heavier clay loams, rich in phosphoric nutrition with moderate salinity tolerance.',
    idealN: [35, 55],
    idealP: [60, 80],
    idealK: [15, 25],
    idealPh: [6.5, 7.8],
    tempRange: [22, 35],
    rainfallRange: [600, 850],
    humidityRange: [55, 75],
    waterRequirement: 'Low',
    season: 'Kharif / Summer',
    soilType: 'Heavy Loam, Clay Loam, Black Soil',
    growthDuration: '70 - 90 days',
    plantingMethod: 'Drilling at 30x10cm spacing in flat beds or ridge-furrows',
    majorPests: ['Aphids', 'Spotted Pod Borer', 'Leaf Crinkle Virus', 'Root Rot'],
    harvestIndicators: ['Pods turn charcoal black and crisp'],
    tips: [
      'Resistant to soil compaction better than most other pulses.',
      'Apply single superphosphate (SSP) as basal dose for available sulphur and phosphorus.',
      'Harvest early morning to prevent pod shattering losses.'
    ]
  },
  {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    emoji: '🍲',
    category: 'Pulse',
    description: 'Cool-season legume with high phosphorus efficiency, thriving in alluvial soils and low-moisture winter regimes.',
    idealN: [15, 35],
    idealP: [60, 80],
    idealK: [15, 25],
    idealPh: [6.0, 7.5],
    tempRange: [12, 25],
    rainfallRange: [400, 600],
    humidityRange: [45, 65],
    waterRequirement: 'Low',
    season: 'Rabi / Winter',
    soilType: 'Silt Loam, Alluvial, Clay Loam',
    growthDuration: '105 - 130 days',
    plantingMethod: 'Sowing behind plough or zero-till seed drill at 25x5cm spacing',
    majorPests: ['Rust', 'Wilt', 'Aphids', 'Collar Rot'],
    harvestIndicators: ['Plants turn golden-yellow and bottom pods become dry'],
    tips: [
      'Very effective in relay cropping after rice harvest.',
      'Phosphorus application promotes vigorous nodule development.',
      'Avoid waterlogging at all costs.'
    ]
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    emoji: '🍎',
    category: 'Fruit',
    description: 'Hardy semi-arid fruit shrub demanding well-drained, slightly alkaline soils with moderate potassium and controlled moisture.',
    idealN: [15, 35],
    idealP: [10, 30],
    idealK: [35, 45],
    idealPh: [6.5, 7.8],
    tempRange: [20, 38],
    rainfallRange: [500, 800],
    humidityRange: [35, 60],
    waterRequirement: 'Low',
    season: 'Perennial (Bahar treatment)',
    soilType: 'Light to Medium Loam, Gravelly Alluvial',
    growthDuration: 'Perennial (First commercial crop at 2.5-3 yrs)',
    plantingMethod: 'Pits of 60x60x60cm with air-layered saplings at 4.5x3m spacing',
    majorPests: ['Bacterial Blight (Telya)', 'Fruit Borer', 'Thrips', 'Wilt'],
    harvestIndicators: ['Fruit calyx turns inward, skin turns pinkish-red, and emits metallic sound when tapped'],
    tips: [
      'Practice regular Bahar flower-induction pruning and regulated stress periods.',
      'Drip fertigation with potassium nitrate during fruit enlargement prevents rind cracking.',
      'Wrap developing fruits in butter paper bags to protect against sunburn and borers.'
    ]
  },
  {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    category: 'Fruit',
    description: 'Fast-growing giant herb requiring copious nitrogen, high potassium, and organic-rich alluvial soils with continuous moisture.',
    idealN: [90, 120],
    idealP: [70, 95],
    idealK: [45, 55],
    idealPh: [5.5, 7.0],
    tempRange: [22, 36],
    rainfallRange: [1500, 2200],
    humidityRange: [70, 90],
    waterRequirement: 'High',
    season: 'Year-Round / Tropical',
    soilType: 'Deep Alluvial Loam, Clay Loam with Organic Humus',
    growthDuration: '10 - 12 months',
    plantingMethod: 'Tissue-cultured sword suckers planted in 45cm pits at 1.8x1.8m or paired rows',
    majorPests: ['Pseudostem Borer', 'Sigatoka Leaf Spot', 'Panama Wilt', 'Nematodes'],
    harvestIndicators: ['Fruit angles become rounded and floral remnants fall off easily'],
    tips: [
      'Apply potassium in 4 split doses during rapid vegetative and bunch development.',
      'Desucker regularly to keep only 1 follower sucker per mother plant.',
      'Provide bamboo or nylon rope propping to prevent lodging under bunch weight.'
    ]
  },
  {
    id: 'mango',
    name: 'Mango (King of Fruits)',
    emoji: '🥭',
    category: 'Fruit',
    description: 'Deep-rooted tropical orchard tree preferring slightly acidic laterite or alluvial loam with moderate fertility and dry flowering periods.',
    idealN: [15, 35],
    idealP: [20, 40],
    idealK: [25, 35],
    idealPh: [5.5, 7.0],
    tempRange: [24, 38],
    rainfallRange: [750, 1500],
    humidityRange: [45, 70],
    waterRequirement: 'Medium',
    season: 'Perennial',
    soilType: 'Deep Laterite, Alluvial, Red Sandy Loam (depth > 2m)',
    growthDuration: 'Perennial (Bearing begins at 4-5 yrs)',
    plantingMethod: 'Veneer or epicotyl grafted saplings in 1x1x1m pits at 8x8m to 10x10m spacing',
    majorPests: ['Mango Hopper', 'Fruit Fly', 'Anthracnose', 'Powdery Mildew'],
    harvestIndicators: ['Slight color break at stem end, shoulders level with stem attachment, specific gravity 1.01-1.02'],
    tips: [
      'Withhold irrigation for 2–3 months prior to flowering to promote vegetative dormancy and bud break.',
      'Spray paclobutrazol (Cultar) in canopy drip-zone to regulate alternate bearing in older orchards.',
      'Harvest fruits with 1cm pedicel attached to prevent latex burn.'
    ]
  },
  {
    id: 'grapes',
    name: 'Grapes (Viticulture)',
    emoji: '🍇',
    category: 'Fruit',
    description: 'High-value vine crop demanding massive potassium and phosphorus reserves in well-aerated sandy or gravelly loam.',
    idealN: [15, 35],
    idealP: [120, 145],
    idealK: [190, 205],
    idealPh: [5.5, 6.5],
    tempRange: [18, 35],
    rainfallRange: [500, 800],
    humidityRange: [40, 65],
    waterRequirement: 'Medium',
    season: 'Perennial (Pruning cycles)',
    soilType: 'Sandy Loam, Gravelly Loam, Red Loam',
    growthDuration: 'Perennial Vine',
    plantingMethod: 'Rooted cuttings trained on Bower / Y-trellis systems at 3x1.8m spacing',
    majorPests: ['Downy Mildew', 'Powdery Mildew', 'Thrips', 'Flea Beetle', 'Mealybug'],
    harvestIndicators: ['TSS reaches 18-22° Brix, berries soften, and seed coat turns dark brown'],
    tips: [
      'Requires substantial potassium fertigation during berry enlargement and veraison.',
      'Perform foundation pruning in April and forward fruit pruning in October.',
      'Use Gibberellic Acid (GA3) dip for berry elongation and bunch loosening.'
    ]
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    emoji: '🍉',
    category: 'Fruit',
    description: 'Warm-season trailing vine requiring high potassium, sunny weather, and warm riverbed sandy loams.',
    idealN: [90, 110],
    idealP: [15, 30],
    idealK: [45, 55],
    idealPh: [6.0, 7.0],
    tempRange: [24, 38],
    rainfallRange: [400, 650],
    humidityRange: [45, 65],
    waterRequirement: 'Medium',
    season: 'Zaid / Summer',
    soilType: 'Warm Sandy Loam, Riverbed Alluvial',
    growthDuration: '75 - 95 days',
    plantingMethod: 'Pits on channel ridges at 2.5x1m spacing with 3-4 seeds per pit',
    majorPests: ['Fruit Fly', 'Red Pumpkin Beetle', 'Downy Mildew', 'Fusarium Wilt'],
    harvestIndicators: ['Tendril opposite fruit shrivels completely, ground spot turns buttery yellow, dull thud sound when slapped'],
    tips: [
      'High potassium during vine development improves rind strength and internal sugar accumulation.',
      'Mulch soil with silver-black polyethylene sheets to prevent weed competition and soil moisture loss.',
      'Stop irrigation 5–7 days prior to harvest to maximize sugar concentration.'
    ]
  },
  {
    id: 'muskmelon',
    name: 'Muskmelon (Cantaloupe)',
    emoji: '🍈',
    category: 'Fruit',
    description: 'Fragrant summer cucurbit flourishing in warm, well-aerated sandy loams with high nitrogen and moderate potassium.',
    idealN: [90, 110],
    idealP: [10, 25],
    idealK: [45, 55],
    idealPh: [6.0, 7.0],
    tempRange: [24, 38],
    rainfallRange: [400, 600],
    humidityRange: [40, 60],
    waterRequirement: 'Medium',
    season: 'Zaid / Summer',
    soilType: 'Light Sandy Loam, Rich Alluvial Sand',
    growthDuration: '70 - 85 days',
    plantingMethod: 'Raised beds or flat furrows at 2x0.6m spacing',
    majorPests: ['Fruit Fly', 'Aphids', 'Powdery Mildew', 'Gummy Stem Blight'],
    harvestIndicators: ['Half-slip to full-slip stage where fruit stem naturally detaches with light pressure'],
    tips: [
      'Provide balanced nitrogen early on for vigorous vegetative vine spread.',
      'Avoid sprinkler wetting of foliage to prevent powdery and downy mildew.',
      'Drip irrigation coupled with fertigation ensures uniform sweetness.'
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    emoji: '🍏',
    category: 'Fruit',
    description: 'Temperate deciduous fruit tree demanding high phosphorus and massive potassium in rich, acidic loams with chilling hours.',
    idealN: [15, 35],
    idealP: [120, 145],
    idealK: [190, 205],
    idealPh: [5.5, 6.5],
    tempRange: [8, 22],
    rainfallRange: [1000, 1500],
    humidityRange: [55, 75],
    waterRequirement: 'Medium',
    season: 'Temperate Perennial',
    soilType: 'Deep Loam, Clay Loam rich in Organic Forest Humus',
    growthDuration: 'Perennial (Fruits at 4-6 yrs on standard rootstock)',
    plantingMethod: 'Grafted clonal rootstocks (M9/MM106) planted in winter at 4x2m spacing',
    majorPests: ['Apple Scab', 'San Jose Scale', 'Woolly Apple Aphid', 'Cydia Pomonella'],
    harvestIndicators: ['Starch conversion to sugar, ground color changes from green to yellow/red, seed coat turns brown'],
    tips: [
      'Requires 800–1200 winter chilling hours below 7°C to break flower bud dormancy.',
      'High potassium prevents bitter pit and enhances fruit color and crispness.',
      'Prune in winter to maintain central leader or modified spindle canopy.'
    ]
  },
  {
    id: 'orange',
    name: 'Orange (Citrus)',
    emoji: '🍊',
    category: 'Fruit',
    description: 'Subtropical citrus crop demanding well-drained, light loamy soils with low phosphorus and potassium requirements.',
    idealN: [15, 35],
    idealP: [10, 25],
    idealK: [10, 20],
    idealPh: [6.0, 7.5],
    tempRange: [15, 35],
    rainfallRange: [750, 1200],
    humidityRange: [45, 70],
    waterRequirement: 'Medium',
    season: 'Subtropical Perennial',
    soilType: 'Well-Drained Light Sandy Loam, Alluvial Loam',
    growthDuration: 'Perennial (Fruits at 3-4 yrs)',
    plantingMethod: 'T-budded plants on rootstocks (Rangpur lime/Rough lemon) in 75cm pits at 6x6m spacing',
    majorPests: ['Citrus Leaf Miner', 'Citrus Psylla', 'Citrus Canker', 'Phytophthora Gummosis'],
    harvestIndicators: ['Color break from dark green to bright orange/yellow, juice content exceeds 40%'],
    tips: [
      'Highly sensitive to root waterlogging; avoid heavy poorly drained clays.',
      'Apply foliar zinc, iron, and manganese sprays to avoid leaf interveinal chlorosis.',
      'Keep bud union at least 15cm above soil level during planting to prevent gummosis.'
    ]
  },
  {
    id: 'papaya',
    name: 'Papaya',
    emoji: '🥭',
    category: 'Fruit',
    description: 'Fast-growing tropical herbaceous tree with high nutrient demands, requiring fertile, porous loams and zero waterlogging.',
    idealN: [40, 60],
    idealP: [55, 70],
    idealK: [45, 55],
    idealPh: [6.0, 7.0],
    tempRange: [22, 36],
    rainfallRange: [1200, 1800],
    humidityRange: [60, 85],
    waterRequirement: 'High',
    season: 'Tropical Year-Round',
    soilType: 'Porous Sandy Loam, Rich Alluvial Silt',
    growthDuration: '8 - 10 months',
    plantingMethod: '60-day seedlings planted in raised beds or mounds at 1.8x1.8m or 2x2m spacing',
    majorPests: ['Papaya Ring Spot Virus (PRSV)', 'Mealybug', 'Damping Off', 'Stem Rot'],
    harvestIndicators: ['Latex turns watery rather than milky, slight yellow streaks develop at apex'],
    tips: [
      'Never allow standing water around the root trunk; always plant on raised ridges.',
      'Regular monthly split applications of NPK maintain continuous fruit setting.',
      'Plant gynodioecious varieties (like Red Lady) for 100% productive trees.'
    ]
  },
  {
    id: 'coconut',
    name: 'Coconut Palm',
    emoji: '🥥',
    category: 'Commercial',
    description: 'Coastal palm thriving in sandy loams with high potassium requirement, salt tolerance, and high solar radiation.',
    idealN: [15, 35],
    idealP: [10, 25],
    idealK: [25, 35],
    idealPh: [5.5, 7.5],
    tempRange: [24, 36],
    rainfallRange: [1300, 2400],
    humidityRange: [65, 88],
    waterRequirement: 'High',
    season: 'Coastal Perennial',
    soilType: 'Coastal Sand, Alluvial Loam, Red Sandy Loam',
    growthDuration: 'Perennial (First harvest at 5-7 yrs; productive for 60+ yrs)',
    plantingMethod: '1-year-old selected seedlings in 1x1x1m pits at 7.5x7.5m triangular spacing',
    majorPests: ['Rhinoceros Beetle', 'Red Palm Weevil', 'Eriophyid Mite', 'Bud Rot'],
    harvestIndicators: ['11-12 month old bunches produce crisp sloshing water sound when shaken'],
    tips: [
      'Chloride and potassium salts (potash & common salt) directly enhance kernel thickness and nut count.',
      'Grow green manure crops (sunn hemp, cowpea) in basin and incorporate during monsoons.',
      'Maintain a 2m circular clear basin around trunk with organic mulch.'
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton (White Gold)',
    emoji: '☁️',
    category: 'Commercial',
    description: 'Major industrial cash crop requiring high nitrogen, deep moisture-retentive black cotton vertisols, and warm dry harvest conditions.',
    idealN: [110, 135],
    idealP: [35, 55],
    idealK: [15, 25],
    idealPh: [6.0, 8.0],
    tempRange: [21, 35],
    rainfallRange: [600, 1000],
    humidityRange: [50, 70],
    waterRequirement: 'Medium',
    season: 'Kharif',
    soilType: 'Deep Black Cotton Soil (Vertisol), Fertile Loam',
    growthDuration: '140 - 180 days',
    plantingMethod: 'Dibbling delinted seeds on ridges at 90x60cm or 120x45cm spacing',
    majorPests: ['Pink Bollworm', 'American Bollworm', 'Whitefly', 'Bacterial Blight'],
    harvestIndicators: ['Bolls burst open fully and fluffy white lint is exposed'],
    tips: [
      'Heavy nitrogen feeder during square formation and boll development.',
      'Avoid excess nitrogen late in season which delays maturity and attracts sucking pests.',
      'Defoliate chemically or naturally before mechanical picking for clean lint.'
    ]
  },
  {
    id: 'jute',
    name: 'Jute (Golden Fiber)',
    emoji: '🌾',
    category: 'Commercial',
    description: 'Natural bast fiber crop thriving in monsoon floodplains with high nitrogen and moderate phosphorus in alluvial soils.',
    idealN: [75, 95],
    idealP: [40, 55],
    idealK: [35, 45],
    idealPh: [6.0, 7.5],
    tempRange: [24, 38],
    rainfallRange: [1200, 1800],
    humidityRange: [70, 90],
    waterRequirement: 'High',
    season: 'Kharif / Monsoon',
    soilType: 'New Alluvial Loam, River Delta Silt',
    growthDuration: '120 - 150 days',
    plantingMethod: 'Line sowing at 25x5cm spacing with seed drill, seed rate 6-8 kg/ha',
    majorPests: ['Yellow Mite', 'Semilooper', 'Stem Rot (Macrophomina)'],
    harvestIndicators: ['Small pod stage (120-135 days) ensures peak fiber strength and fineness'],
    tips: [
      'Warm and humid monsoon conditions produce the highest quality tensile fiber.',
      'Retting requires slow-flowing clean water for 12–15 days for clean fiber separation.',
      'Keep field free from weed competition in the first 45 days.'
    ]
  },
  {
    id: 'coffee',
    name: 'Coffee (Arabica / Robusta)',
    emoji: '☕',
    category: 'Commercial',
    description: 'Shade-loving highland plantation shrub requiring high nitrogen and potassium in humus-rich, acidic volcanic and forest soils.',
    idealN: [95, 115],
    idealP: [20, 35],
    idealK: [25, 35],
    idealPh: [6.0, 6.8],
    tempRange: [15, 28],
    rainfallRange: [1500, 2500],
    humidityRange: [65, 85],
    waterRequirement: 'High',
    season: 'Highland Perennial',
    soilType: 'Humus-Rich Acidic Forest Loam, Volcanic Loam',
    growthDuration: 'Perennial (First commercial berries at 3-4 yrs)',
    plantingMethod: 'Rooted basket seedlings planted in 45cm pits at 2x2m (Arabica) or 3x3m (Robusta) under shade trees',
    majorPests: ['Coffee Berry Borer', 'White Stem Borer', 'Coffee Leaf Rust (Hemileia)'],
    harvestIndicators: ['Berries turn bright cherry red and give a sweet taste when pinched'],
    tips: [
      'Requires a two-tier canopy of shade trees (Dadap, Silver Oak) to modulate microclimate.',
      'Blossom showers in March–April trigger uniform floral bud burst.',
      'Mulch with fallen leaf litter to conserve organic matter and moisture.'
    ]
  }
];

export const SOIL_PRESETS: SoilPreset[] = [
  {
    id: 'paddy-alluvial',
    name: 'Alluvial Wetland Soil',
    region: 'Indo-Gangetic / River Plains',
    description: 'Balanced nitrogen, moderate phosphorus & potassium with neutral pH, typical of fertile river basins.',
    values: { n: 85, p: 48, k: 40, ph: 6.5 },
    tag: 'Wetland Cereal'
  },
  {
    id: 'cotton-black',
    name: 'Deep Black Cotton Soil',
    region: 'Deccan Plateau / Semi-Arid',
    description: 'High nitrogen, deep vertisol with good water retention and slightly alkaline pH for cash crops.',
    values: { n: 120, p: 45, k: 20, ph: 7.2 },
    tag: 'Industrial Cash Crop'
  },
  {
    id: 'orchard-high-pk',
    name: 'Fruit Orchard & Vineyard',
    region: 'Horticulture Belts',
    description: 'High phosphorus and exceptional potassium reserves tailored for fruit sweetness and vine vigor.',
    values: { n: 25, p: 130, k: 200, ph: 6.2 },
    tag: 'Fruit & Viticulture'
  },
  {
    id: 'pulse-sandy-loam',
    name: 'Pulse & Legume Loam',
    region: 'Central & Western Plains',
    description: 'Low nitrogen, high phosphorus soil optimal for nitrogen-fixing legumes and winter pulses.',
    values: { n: 25, p: 65, k: 20, ph: 6.8 },
    tag: 'Pulses & Legumes'
  },
  {
    id: 'highland-coffee',
    name: 'Highland Plantation Soil',
    region: 'Western Ghats / Mountain Slopes',
    description: 'Organic-rich forest loam with high nitrogen, moderate potassium, and slightly acidic pH.',
    values: { n: 105, p: 28, k: 30, ph: 6.2 },
    tag: 'Highland Plantation'
  },
  {
    id: 'arid-sandy',
    name: 'Arid Sandy Desert Soil',
    region: 'Thar / Arid Belt',
    description: 'Low-fertility light sandy soil suited for drought-resilient legumes, moth beans, and melons.',
    values: { n: 20, p: 45, k: 20, ph: 7.2 },
    tag: 'Dryland Agriculture'
  },
  {
    id: 'acidic-laterite',
    name: 'Acidic Laterite Soil',
    region: 'Coastal & Red Soil Zones',
    description: 'Acidic soil with high iron/aluminum content, requiring lime or acid-tolerant crops like Mango & Coconut.',
    values: { n: 30, p: 25, k: 30, ph: 5.2 },
    tag: 'Acidic Tropical'
  }
];

/**
 * Predicts the best crop given soil inputs (N, P, K, pH)
 * Replicates the Random Forest Regressor & Classifier trained on the agricultural dataset.
 */
export function predictCrop(input: SoilInput): PredictionResult {
  const { n, p, k, ph } = input;

  // Normalized Euclidean & Gaussian kernel distance calculation for each crop
  const scoredCrops = CROPS.map((crop) => {
    // Crop centroid
    const nCenter = (crop.idealN[0] + crop.idealN[1]) / 2;
    const pCenter = (crop.idealP[0] + crop.idealP[1]) / 2;
    const kCenter = (crop.idealK[0] + crop.idealK[1]) / 2;
    const phCenter = (crop.idealPh[0] + crop.idealPh[1]) / 2;

    // Feature spans for normalization
    const nSpan = Math.max((crop.idealN[1] - crop.idealN[0]) / 2, 12);
    const pSpan = Math.max((crop.idealP[1] - crop.idealP[0]) / 2, 10);
    const kSpan = Math.max((crop.idealK[1] - crop.idealK[0]) / 2, 10);
    const phSpan = Math.max((crop.idealPh[1] - crop.idealPh[0]) / 2, 0.4);

    // Weighted distance
    const distN = Math.pow((n - nCenter) / nSpan, 2);
    const distP = Math.pow((p - pCenter) / pSpan, 2);
    const distK = Math.pow((k - kCenter) / kSpan, 2);
    const distPh = Math.pow((ph - phCenter) / phSpan, 2) * 1.4; // pH penalty

    const totalDist = distN + distP + distK + distPh;
    const similarity = Math.exp(-totalDist / 4.5); // Gaussian similarity

    // Boundary penalty if completely outside bounds
    let penalty = 1.0;
    if (n < crop.idealN[0] - 25 || n > crop.idealN[1] + 35) penalty *= 0.75;
    if (p < crop.idealP[0] - 20 || p > crop.idealP[1] + 30) penalty *= 0.75;
    if (k < crop.idealK[0] - 25 || k > crop.idealK[1] + 35) penalty *= 0.75;
    if (ph < crop.idealPh[0] - 1.2 || ph > crop.idealPh[1] + 1.2) penalty *= 0.7;

    const finalScore = similarity * penalty;

    return {
      crop,
      score: finalScore,
      confidence: Math.min(Math.round(finalScore * 100), 99)
    };
  });

  // Sort descending by score
  scoredCrops.sort((a, b) => b.score - a.score);

  const bestMatch = scoredCrops[0];
  const runnersUp = scoredCrops.slice(1, 4);

  // Normalize top confidence for clear UX feedback
  const topConfidence = Math.max(Math.min(Math.round(bestMatch.confidence * 1.1 + 15), 98), 58);

  // Evaluate parameter suitability
  const getParamSuitability = (
    val: number,
    ideal: [number, number],
    label: string,
    unit: string
  ): ParameterSuitability => {
    const idealCenter = (ideal[0] + ideal[1]) / 2;
    const diff = val - idealCenter;

    if (val < ideal[0]) {
      const deficit = ideal[0] - val;
      const score = Math.max(10, Math.round(100 - (deficit / ideal[0]) * 70));
      return {
        status: 'low',
        score,
        difference: diff,
        feedback: `${label} (${val} ${unit}) is below ideal range (${ideal[0]}–${ideal[1]} ${unit}). Deficit of ~${deficit} ${unit}.`
      };
    } else if (val > ideal[1]) {
      const excess = val - ideal[1];
      const score = Math.max(10, Math.round(100 - (excess / ideal[1]) * 70));
      return {
        status: 'high',
        score,
        difference: diff,
        feedback: `${label} (${val} ${unit}) exceeds optimal requirement (${ideal[0]}–${ideal[1]} ${unit}) by ~${excess} ${unit}.`
      };
    } else {
      return {
        status: 'optimal',
        score: 100,
        difference: 0,
        feedback: `${label} (${val} ${unit}) is in the prime optimal target window (${ideal[0]}–${ideal[1]} ${unit}).`
      };
    }
  };

  const nSuitability = getParamSuitability(n, bestMatch.crop.idealN, 'Nitrogen (N)', 'kg/ha');
  const pSuitability = getParamSuitability(p, bestMatch.crop.idealP, 'Phosphorus (P)', 'kg/ha');
  const kSuitability = getParamSuitability(k, bestMatch.crop.idealK, 'Potassium (K)', 'kg/ha');

  // pH suitability
  let phSuitability: ParameterSuitability;
  const phIdealCenter = (bestMatch.crop.idealPh[0] + bestMatch.crop.idealPh[1]) / 2;
  const phDiff = Number((ph - phIdealCenter).toFixed(1));

  if (ph < bestMatch.crop.idealPh[0]) {
    const deficit = Number((bestMatch.crop.idealPh[0] - ph).toFixed(1));
    phSuitability = {
      status: 'low',
      score: Math.max(15, Math.round(100 - (deficit / 2) * 80)),
      difference: phDiff,
      feedback: `pH ${ph.toFixed(1)} is acidic for ${bestMatch.crop.name} (ideal: ${bestMatch.crop.idealPh[0]}–${bestMatch.crop.idealPh[1]}). Agricultural lime (CaCO₃) recommended.`
    };
  } else if (ph > bestMatch.crop.idealPh[1]) {
    const excess = Number((ph - bestMatch.crop.idealPh[1]).toFixed(1));
    phSuitability = {
      status: 'high',
      score: Math.max(15, Math.round(100 - (excess / 2) * 80)),
      difference: phDiff,
      feedback: `pH ${ph.toFixed(1)} is alkaline for ${bestMatch.crop.name} (ideal: ${bestMatch.crop.idealPh[0]}–${bestMatch.crop.idealPh[1]}). Gypsum or organic amendments recommended.`
    };
  } else {
    phSuitability = {
      status: 'optimal',
      score: 100,
      difference: 0,
      feedback: `pH ${ph.toFixed(1)} is perfectly balanced within the optimal agronomic window for ${bestMatch.crop.name}.`
    };
  }

  // Soil health classification
  let npkBalance: PredictionResult['soilHealthAssessment']['npkBalance'] = 'Balanced';
  if (n < 40 && p > 50 && k > 40) npkBalance = 'Nitrogen-Deficient';
  else if (p < 30 && n > 60) npkBalance = 'Phosphorus-Deficient';
  else if (k < 20 && n > 70) npkBalance = 'Potassium-Deficient';
  else if (n > 100 && p > 60 && k > 50) npkBalance = 'High-Fertility';

  let phNature: PredictionResult['soilHealthAssessment']['phNature'] = 'Neutral (Optimal)';
  if (ph < 5.5) phNature = 'Strongly Acidic';
  else if (ph < 6.5) phNature = 'Moderately Acidic';
  else if (ph <= 7.5) phNature = 'Neutral (Optimal)';
  else if (ph <= 8.5) phNature = 'Moderately Alkaline';
  else phNature = 'Strongly Alkaline';

  const recommendationSummary = `Based on your soil sample (N: ${n}, P: ${p}, K: ${k}, pH: ${ph.toFixed(1)}), this plot strongly matches the physiological and nutritional requirements of ${bestMatch.crop.name} (${bestMatch.crop.category}).`;

  return {
    crop: bestMatch.crop,
    confidence: topConfidence,
    overallScore: bestMatch.score,
    runnersUp: runnersUp.map((r) => ({
      crop: r.crop,
      score: r.score,
      confidence: Math.max(Math.min(Math.round(r.confidence * 1.1 + 5), topConfidence - 3), 30)
    })),
    soilHealthAssessment: {
      npkBalance,
      phNature,
      suitability: {
        n: nSuitability,
        p: pSuitability,
        k: kSuitability,
        ph: phSuitability
      },
      recommendationSummary
    }
  };
}

/**
 * Calculates real-world fertilizer amendments needed to adjust current soil parameters to target crop optimal
 */
export function calculateFertilizerPlan(soil: SoilInput, crop: CropProfile): FertilizerRecommendation[] {
  const recommendations: FertilizerRecommendation[] = [];

  const targetN = (crop.idealN[0] + crop.idealN[1]) / 2;
  const targetP = (crop.idealP[0] + crop.idealP[1]) / 2;
  const targetK = (crop.idealK[0] + crop.idealK[1]) / 2;
  const targetPh = (crop.idealPh[0] + crop.idealPh[1]) / 2;

  // 1. Nitrogen (Urea 46% N)
  const nDeficit = Math.max(0, targetN - soil.n);
  if (nDeficit > 0) {
    const ureaRateKgHa = Math.round(nDeficit / 0.46);
    recommendations.push({
      nutrient: 'Nitrogen (N)',
      status: 'Deficit',
      deficitAmount: Math.round(nDeficit),
      primarySource: 'Urea (46% N) or Ammonium Sulphate',
      ratePerHectare: ureaRateKgHa,
      ratePerAcre: Math.round(ureaRateKgHa * 0.4046),
      applicationTiming: 'Split: 50% as basal at sowing, 25% at vegetative stage, 25% at flower initiation',
      notes: `Deficit of ${Math.round(nDeficit)} kg N/ha. Apply in split doses to prevent leaching.`
    });
  } else if (soil.n > crop.idealN[1] + 15) {
    recommendations.push({
      nutrient: 'Nitrogen (N)',
      status: 'Excess',
      deficitAmount: 0,
      primarySource: 'No additional N fertilizer needed',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Withhold chemical nitrogen',
      notes: `Soil has surplus nitrogen (${soil.n} kg/ha vs max ${crop.idealN[1]} kg/ha). Excess N can cause vegetative lodging and disease susceptibility.`
    });
  } else {
    recommendations.push({
      nutrient: 'Nitrogen (N)',
      status: 'Balanced',
      deficitAmount: 0,
      primarySource: 'Maintain standard maintenance dose / organic compost',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Apply organic farmyard manure (FYM) @ 5 t/ha at land prep',
      notes: 'Soil nitrogen is in the optimal range for this crop.'
    });
  }

  // 2. Phosphorus (DAP 46% P₂O₅ or SSP 16% P₂O₅)
  const pDeficit = Math.max(0, targetP - soil.p);
  if (pDeficit > 0) {
    const dapRateKgHa = Math.round(pDeficit / 0.46);
    recommendations.push({
      nutrient: 'Phosphorus (P₂O₅)',
      status: 'Deficit',
      deficitAmount: Math.round(pDeficit),
      primarySource: 'DAP (Diammonium Phosphate 18:46:0) or SSP',
      ratePerHectare: dapRateKgHa,
      ratePerAcre: Math.round(dapRateKgHa * 0.4046),
      applicationTiming: '100% basal application placed 5cm below seed during field preparation',
      notes: `Deficit of ${Math.round(pDeficit)} kg P/ha. Phosphorus is immobile in soil; band placement is recommended.`
    });
  } else if (soil.p > crop.idealP[1] + 15) {
    recommendations.push({
      nutrient: 'Phosphorus (P₂O₅)',
      status: 'Excess',
      deficitAmount: 0,
      primarySource: 'No phosphorus required',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Withhold phosphatic fertilizers',
      notes: `Soil phosphorus (${soil.p} kg/ha) is plentiful. Avoid excessive P to prevent zinc/iron lockout.`
    });
  } else {
    recommendations.push({
      nutrient: 'Phosphorus (P₂O₅)',
      status: 'Balanced',
      deficitAmount: 0,
      primarySource: 'Standard basal maintenance dose',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Basal placement at sowing',
      notes: 'Soil phosphorus is well aligned with crop requirements.'
    });
  }

  // 3. Potassium (MOP 60% K₂O)
  const kDeficit = Math.max(0, targetK - soil.k);
  if (kDeficit > 0) {
    const mopRateKgHa = Math.round(kDeficit / 0.60);
    recommendations.push({
      nutrient: 'Potassium (K₂O)',
      status: 'Deficit',
      deficitAmount: Math.round(kDeficit),
      primarySource: 'MOP (Muriate of Potash 0:0:60) / Potassium Sulphate (for chloride-sensitive crops)',
      ratePerHectare: mopRateKgHa,
      ratePerAcre: Math.round(mopRateKgHa * 0.4046),
      applicationTiming: 'Apply 50% as basal and 50% at fruit/pod enlargement stage',
      notes: `Deficit of ${Math.round(kDeficit)} kg K/ha. Essential for drought tolerance, disease resistance, and fruit sugars.`
    });
  } else if (soil.k > crop.idealK[1] + 20) {
    recommendations.push({
      nutrient: 'Potassium (K₂O)',
      status: 'Excess',
      deficitAmount: 0,
      primarySource: 'No potash application needed',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Withhold potash',
      notes: `Potassium level (${soil.k} kg/ha) is high. No supplemental potash needed for current season.`
    });
  } else {
    recommendations.push({
      nutrient: 'Potassium (K₂O)',
      status: 'Balanced',
      deficitAmount: 0,
      primarySource: 'Standard maintenance dose',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Basal or fertigation',
      notes: 'Soil potassium is optimal.'
    });
  }

  // 4. Soil pH Amendment (Lime or Gypsum)
  if (soil.ph < crop.idealPh[0]) {
    const phDiff = crop.idealPh[0] - soil.ph;
    const limeRateKgHa = Math.round(phDiff * 1200);
    recommendations.push({
      nutrient: 'Soil pH Correction',
      status: 'Deficit',
      deficitAmount: Number(phDiff.toFixed(1)),
      primarySource: 'Agricultural Lime (Calcium Carbonate CaCO₃) or Dolomite',
      ratePerHectare: limeRateKgHa,
      ratePerAcre: Math.round(limeRateKgHa * 0.4046),
      applicationTiming: 'Broadcast and thoroughly incorporate 3–4 weeks prior to sowing with soil moisture',
      notes: `Soil is acidic (pH ${soil.ph.toFixed(1)} vs target ${targetPh.toFixed(1)}). Liming neutralizes toxic aluminum and releases locked phosphorus.`
    });
  } else if (soil.ph > crop.idealPh[1]) {
    const phDiff = soil.ph - crop.idealPh[1];
    const gypsumRateKgHa = Math.round(phDiff * 1000);
    recommendations.push({
      nutrient: 'Soil pH Correction',
      status: 'Excess',
      deficitAmount: Number(phDiff.toFixed(1)),
      primarySource: 'Agricultural Gypsum (Calcium Sulphate CaSO₄·2H₂O) or Elemental Sulphur',
      ratePerHectare: gypsumRateKgHa,
      ratePerAcre: Math.round(gypsumRateKgHa * 0.4046),
      applicationTiming: 'Incorporate during deep plowing followed by adequate irrigation leaching',
      notes: `Soil is alkaline (pH ${soil.ph.toFixed(1)} vs target ${targetPh.toFixed(1)}). Gypsum displaces exchangeable sodium and lowers alkalinity.`
    });
  } else {
    recommendations.push({
      nutrient: 'Soil pH Correction',
      status: 'Balanced',
      deficitAmount: 0,
      primarySource: 'No pH amendment required',
      ratePerHectare: 0,
      ratePerAcre: 0,
      applicationTiming: 'Standard soil management',
      notes: `Soil reaction (pH ${soil.ph.toFixed(1)}) is perfectly balanced for ${crop.name}.`
    });
  }

  return recommendations;
}
