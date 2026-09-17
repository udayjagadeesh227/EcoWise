// Comprehensive database of household waste items and disposal practices
export const WASTE_CATEGORIES = {
  WET: {
    name: 'Wet Waste',
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#86EFAC',
    badgeText: 'Organic / Biodegradable',
    binColor: 'Green Bin',
    icon: 'Leaf'
  },
  DRY: {
    name: 'Dry Waste',
    color: '#0284C7',
    bg: '#E0F2FE',
    border: '#7DD3FC',
    badgeText: 'Non-Biodegradable Clean',
    binColor: 'Blue Bin',
    icon: 'Recycle'
  },
  RECYCLABLE: {
    name: 'Recyclable',
    color: '#059669',
    bg: '#D1FAE5',
    border: '#6EE7B7',
    badgeText: 'High Value Recycling',
    binColor: 'Blue / Recycling Bin',
    icon: 'Recycle'
  },
  E_WASTE: {
    name: 'E-Waste',
    color: '#7C3AED',
    bg: '#F3E8FF',
    border: '#C4B5FD',
    badgeText: 'Electronic Scrap',
    binColor: 'Designated E-Waste Drop-off',
    icon: 'Bot'
  },
  DONATE_REUSE: {
    name: 'Donate / Reuse',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FCD34D',
    badgeText: 'Upcycle / Thrift',
    binColor: 'Charity / Donation Bin',
    icon: 'Trophy'
  },
  HAZARDOUS: {
    name: 'Hazardous Disposal',
    color: '#DC2626',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    badgeText: 'Special Handling Required',
    binColor: 'Red / Hazardous Collection Center',
    icon: 'Trash2'
  }
};

export const WASTE_ITEMS = [
  // ===================== WET WASTE =====================
  {
    id: 'banana-peel',
    name: 'Banana Peel',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Place in home compost or Green municipal wet waste bin.',
    explanation: 'Organic and rich in potassium and nitrogen. Decomposes within 2 to 5 weeks when composted properly.',
    ecoTip: 'Use steeped banana peel water to nourish your indoor potted plants naturally!',
    aliases: ['banana', 'fruit peel', 'peel', 'fruit scrap', 'banana skin']
  },
  {
    id: 'vegetable-scraps',
    name: 'Vegetable Scraps',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Deposit into organic wet bin or kitchen bokashi/vermicompost bin.',
    explanation: 'Decomposes aerobically into rich, nutrient-dense humus soil amendment.',
    ecoTip: 'Freeze clean carrot ends, celery tops, and onion skins to brew rich homemade vegetable broth!',
    aliases: ['vegetable peel', 'veggies', 'carrot tops', 'onion skin', 'kitchen waste', 'food scraps', 'potato peel']
  },
  {
    id: 'fruit-peels',
    name: 'Fruit Peels & Citrus Rinds',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Compost in moderation or place in municipal green organic bin.',
    explanation: 'Contains essential organic fibers. Decomposes naturally, though citrus takes slightly longer due to citric oils.',
    ecoTip: 'Orange and lemon rinds infused in white vinegar create an all-natural degreasing kitchen cleaner.',
    aliases: ['orange peel', 'citrus peel', 'lemon peel', 'apple skin', 'melon rind', 'watermelon rind', 'fruit scrap']
  },
  {
    id: 'leftover-food',
    name: 'Leftover Food & Cooked Scraps',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Drain excess gravy/curry, compost in enclosed bin or deposit in green wet waste.',
    explanation: 'Cooked food scraps decompose rapidly. When diverted from landfills, they prevent methane emissions.',
    ecoTip: 'Plan weekly meals and practice "first-in, first-out" refrigeration to cut cooked food waste at the source.',
    aliases: ['cooked food', 'plate scrap', 'food waste', 'rice', 'bread', 'pasta', 'leftover meal']
  },
  {
    id: 'eggshells',
    name: 'Eggshells',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Rinse, crush finely, and add directly to compost or potting soil.',
    explanation: 'Composed of over 95% calcium carbonate, eggshells enrich garden soil and balance acidity.',
    ecoTip: 'Crushed eggshells scattered around garden plants naturally deter garden slugs and snails.',
    aliases: ['egg', 'eggs', 'egg shell', 'eggshell', 'egg shells', 'cracked eggs']
  },
  {
    id: 'tea-leaves',
    name: 'Used Tea Leaves & Coffee Grounds',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Empty loose leaves or grounds into compost (remove synthetic staple/bag tag if bagged).',
    explanation: 'Rich in nitrogen and beneficial organic carbon that boosts soil microorganism activity.',
    ecoTip: 'Coffee grounds are fantastic natural deodorizers for your refrigerator and a gentle abrasive sink scrub.',
    aliases: ['tea leaves', 'tea bag', 'coffee grounds', 'coffee powder', 'used tea', 'used coffee']
  },
  {
    id: 'spoiled-fruits-vegetables',
    name: 'Spoiled Fruits & Vegetables',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Discard directly into home compost or green organic wet waste collection.',
    explanation: 'Rotting and overripe produce breaks down quickly, returning vital micronutrients back to soil.',
    ecoTip: 'Separate overripe bananas and apples from fresh produce to prevent ethylene gas from spoiling other items.',
    aliases: ['spoiled fruits', 'spoiled vegetables', 'rotten apple', 'rotten potato', 'moldy food', 'bad tomato', 'decayed fruit']
  },
  {
    id: 'garden-leaves',
    name: 'Garden Leaves & Grass Clippings',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Use as "brown" carbon layer in compost or place in municipal garden yard trimmings bin.',
    explanation: 'Dry leaves provide the essential carbon ratio needed to balance nitrogen-heavy kitchen waste in compost piles.',
    ecoTip: 'Mulch fallen dry leaves directly over soil beds to retain moisture and suppress garden weeds.',
    aliases: ['dry leaves', 'garden leaves', 'grass clippings', 'pruned twigs', 'yard waste', 'lawn cuttings']
  },
  {
    id: 'flowers-withered',
    name: 'Withered Flowers & Bouquets',
    categoryKey: 'WET',
    category: 'Wet Waste',
    recommendedAction: 'Remove plastic ribbons/florist wire and add organic stems/petals to compost.',
    explanation: 'Organic cut floral arrangements decompose completely into garden soil nutrients within weeks.',
    ecoTip: 'Dry flower petals like roses or lavender to make fragrant potpourri or natural DIY bath salts.',
    aliases: ['flowers', 'withered flowers', 'pooja flowers', 'bouquet', 'dead plant', 'floral waste', 'flower petals']
  },

  // ===================== DRY WASTE =====================
  {
    id: 'milk-packet',
    name: 'Milk Packet (Pouch)',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Snip corner hinged (don’t cut off tiny tip), rinse clean of milk residue, dry flat, send for dry collection.',
    explanation: 'Made of recyclable Low-Density Polyethylene (LDPE). Detached small corners frequently choke stormwater drains.',
    ecoTip: 'Never snip the tiny corner completely off; keeping it attached ensures the full pouch gets recycled!',
    aliases: ['milk pouch', 'milk bag', 'dairy packet', 'curd pouch', 'milk packet']
  },
  {
    id: 'waste-paper',
    name: 'Paper & Discarded Notebook Pages',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Keep clean, dry, and flat. Place in blue dry bin or bundle for local paper recycling collector.',
    explanation: 'High-grade cellulose fibers can be re-pulped 5 to 7 times into printing sheets and tissue products.',
    ecoTip: 'Use blank sides of single-sided printouts for shopping lists, rough notes, and sketches.',
    aliases: ['paper', 'scrap paper', 'office paper', 'printer paper', 'notebook page', 'used paper', 'loose paper']
  },
  {
    id: 'newspapers',
    name: 'Old Newspapers',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Tie into neat flat bundles and hand over to raddi-wala (scrap dealer) or dry waste station.',
    explanation: 'Newsprint is easily de-inked and recycled into egg cartons, carton inserts, and fresh paperboard.',
    ecoTip: 'Old newspaper sheets work wonders for streak-free cleaning of window panes and glass mirrors.',
    aliases: ['newspaper', 'old newspaper', 'daily news', 'raddi', 'press paper']
  },
  {
    id: 'magazines',
    name: 'Magazines & Glossy Periodicals',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Bundle with dry paper recycling. Remove plastic sample packets or CD inserts.',
    explanation: 'Glossy magazine stock is coated with kaolin clay and polymers, recyclable in specialized paper facilities.',
    ecoTip: 'Donate recent, intact magazines to doctor clinics, school art classes, or community libraries.',
    aliases: ['magazine', 'glossy paper', 'brochure', 'catalog', 'pamphlet', 'journal']
  },
  {
    id: 'tissue-paper',
    name: 'Used Tissue Paper & Napkins',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Place lightly soiled tissues in dry waste bin. Greasy or contaminated tissues go to sanitary disposal.',
    explanation: 'Tissue paper fibers are too short to be recycled again in paper mills. Avoid littering.',
    ecoTip: 'Carry washable cotton handkerchiefs and cloth napkins to eliminate single-use tissue waste.',
    aliases: ['tissue', 'tissue paper', 'paper napkin', 'paper towel', 'serviette', 'facial tissue']
  },
  {
    id: 'paper-packaging',
    name: 'Paper Packaging & Brown Bags',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Flatten, remove any plastic tape or nylon handles, and deposit into dry paper recycling.',
    explanation: 'Kraft paper has strong tensile fibers that make high-value recycled cardboard and paper bags.',
    ecoTip: 'Reuse sturdy brown paper grocery bags as trash bin liners for dry recyclables.',
    aliases: ['brown bag', 'paper bag', 'kraft bag', 'paper packaging', 'delivery bag', 'shopping bag paper']
  },
  {
    id: 'plastic-wrappers',
    name: 'Plastic Wrappers & Film',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Empty crumbs, keep dry, place into dry waste bin for municipal multi-layer plastic processing.',
    explanation: 'Flexible plastic films require specialized cement kiln co-processing or plastic-to-fuel plants.',
    ecoTip: 'Gather all dry plastic film wrappers together inside one bread bag before disposing to simplify sorter handling.',
    aliases: ['wrapper', 'plastic wrapper', 'biscuit packet', 'candy wrapper', 'chocolate wrapper', 'cling film', 'shrink wrap']
  },
  {
    id: 'chips-packet',
    name: 'Potato Chips Packets (Metallized Plastic)',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Shake out salt/crumbs and deposit in dry waste bin for energy recovery/co-processing.',
    explanation: 'Made of Multi-Layered Plastics (MLP) combining polypropylene with vaporized aluminum foil.',
    ecoTip: 'Participate in brand take-back schemes or eco-brick projects that repurpose clean MLP wrappers.',
    aliases: ['chips packet', 'potato chips', 'snack packet', 'metallized packet', 'mlp wrapper', 'lays packet']
  },
  {
    id: 'food-packaging-containers',
    name: 'Food Delivery Containers (Dry Clean)',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Rinse oily residue with a drop of soap, dry thoroughly, and place in dry recyclables bin.',
    explanation: 'Polypropylene (PP #5) takeout containers are readily recyclable once food grease is rinsed off.',
    ecoTip: 'These sturdy food-grade containers make great organizers for nuts, bolts, sewing kits, or meal prep.',
    aliases: ['food container', 'takeout container', 'swiggy box', 'zomato box', 'plastic food box', 'meal box']
  },
  {
    id: 'thermocol-packaging',
    name: 'Thermocol & Styrofoam Packaging',
    categoryKey: 'DRY',
    category: 'Dry Waste',
    recommendedAction: 'Keep intact without breaking into small beads; surrender at designated dry waste centers.',
    explanation: 'Expanded Polystyrene (EPS #6) takes over 500 years to decompose. Breaking it creates microplastic hazards for birds.',
    ecoTip: 'Reuse molded foam blocks for insulating garage pipes or safe parcel shipping padding.',
    aliases: ['thermocol', 'styrofoam', 'eps foam', 'foam packaging', 'packing peanuts', 'expanded polystyrene']
  },

  // ===================== RECYCLABLE =====================
  {
    id: 'plastic-bottle',
    name: 'Plastic Bottle (PET #1)',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Empty liquids, rinse, crush, and place in Blue recycling bin with cap attached.',
    explanation: 'Polyethylene Terephthalate (PET) is the gold standard of mechanical recycling into fleece, fabrics, and new bottles.',
    ecoTip: 'Keep the cap screwed on after crushing so the tiny caps do not get lost on sorting conveyor belts.',
    aliases: ['water bottle', 'pet bottle', 'soda bottle', 'beverage bottle', 'plastic container', 'coke bottle']
  },
  {
    id: 'glass-bottle',
    name: 'Glass Bottle',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Rinse thoroughly, remove metal/plastic caps, place in glass recycling stream.',
    explanation: 'Glass is 100% infinitely recyclable without any loss in purity, clarity, or quality. Recycling glass saves 30% kiln energy.',
    ecoTip: 'Upcycle attractive glass jars and bottles into kitchen spice holders or plant propagation vases.',
    aliases: ['glass jar', 'beer bottle', 'wine bottle', 'glass container', 'liquor bottle']
  },
  {
    id: 'glass-jar',
    name: 'Glass Food Jar',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Rinse food/jam residue, separate the metal lid for metal recycling, place jar in glass recycling.',
    explanation: 'Heavy food-grade flint glass can be melted down countless times, preserving raw silica sand reserves.',
    ecoTip: 'Glass jars make airtight zero-waste bulk pantry containers for lentils, tea bags, and spices.',
    aliases: ['glass jar', 'jam jar', 'pickle jar', 'mason jar', 'sauce jar', 'mayo jar']
  },
  {
    id: 'aluminum-can',
    name: 'Aluminum Beverage Can',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Rinse clean, lightly flatten if desired, and drop into Blue recyclables bin.',
    explanation: 'Recycling aluminum consumes 95% less energy than mining and smelting virgin bauxite ore.',
    ecoTip: 'An aluminum can can be melted, rolled, filled, and returned to store shelves in under 60 days.',
    aliases: ['soda can', 'can', 'coke can', 'tin can', 'beverage can', 'beer can', 'aluminum']
  },
  {
    id: 'steel-can',
    name: 'Steel & Tin Food Can',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Rinse out food gravy, tuck lid inside can, deposit in metal recyclables.',
    explanation: 'Steel is magnetically separated in recycling facilities with 100% recycling efficiency into structural rebar.',
    ecoTip: 'Puncture drainage holes in clean tin cans and paint them to make rustic herb planters.',
    aliases: ['steel can', 'tin can', 'canned food', 'soup can', 'canned beans', 'metal can']
  },
  {
    id: 'cardboard-box',
    name: 'Cardboard Shipping Box',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Flatten box, remove excess plastic packing tape, keep dry, place in dry recycling.',
    explanation: 'Corrugated cardboard fibers can be recycled 5 to 7 times before the fibers become too short.',
    ecoTip: 'Great for sheet mulching your garden beds or reusing for mailing parcel shipments.',
    aliases: ['cardboard', 'carton', 'shipping box', 'delivery box', 'amazon box', 'corrugated box']
  },
  {
    id: 'paper-carton',
    name: 'Paper Beverage Carton (Tetra Pak)',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Push straw inside, flatten carton, rinse out milk/juice residue, place in dry recyclables.',
    explanation: 'Composed of 75% paperboard, 20% polyethylene, and 5% aluminum foil. Separated via hydro-pulping into paper and poly-Al roofing sheets.',
    ecoTip: 'Look for the FSC certification logo on cartons indicating responsibly managed tree forestry.',
    aliases: ['tetra pak', 'juice carton', 'milk carton', 'tetrapack', 'aseptic carton', 'frooti pack']
  },
  {
    id: 'metal-container',
    name: 'Metal Container & Biscuit Tin',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Wipe clean and send to metal recycling stream or scrap metal buyer.',
    explanation: 'Valuable tin-plated steel or aluminum that is endlessly recyclable into automotive or building parts.',
    ecoTip: 'Vintage metal biscuit and tea tins are timeless organizers for stationery, sewing buttons, and craft tools.',
    aliases: ['biscuit tin', 'metal box', 'cookie tin', 'metal container', 'tin box', 'steel container']
  },
  {
    id: 'clean-plastic-containers',
    name: 'Clean Plastic Containers & Jugs (HDPE #2 / PP #5)',
    categoryKey: 'RECYCLABLE',
    category: 'Recyclable',
    recommendedAction: 'Rinse residue, drain, keep cap attached, drop into Blue plastics bin.',
    explanation: 'High-Density Polyethylene (HDPE) and Polypropylene (PP) are robust thermoplastics easily granulated into plastic pellets.',
    ecoTip: 'Buy household detergents in bulk concentrate pouches to reuse heavy detergent jugs repeatedly.',
    aliases: ['hdpe bottle', 'shampoo bottle', 'detergent bottle', 'plastic tub', 'yogurt tub', 'lotion bottle']
  },

  // ===================== E-WASTE =====================
  {
    id: 'old-mobile-phone',
    name: 'Old Mobile Phone',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Factory reset personal data, remove SIM/microSD, surrender at certified e-waste drop-off center.',
    explanation: 'Contains precious metals (gold, palladium, copper, silver) alongside hazardous lead and cadmium that contaminate groundwater.',
    ecoTip: 'Many mobile phone retailers offer instant buyback vouchers or trade-in credits for old phones.',
    aliases: ['smartphone', 'cell phone', 'phone', 'iphone', 'android', 'old phone', 'mobile']
  },
  {
    id: 'phone-charger',
    name: 'Phone Charger & Power Adapter',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Deposit in designated electronic cords and peripherals collection kiosk.',
    explanation: 'Contains copper wiring, capacitors, transformers, and plastic casings that should never enter domestic trash.',
    ecoTip: 'Invest in multi-port GaN chargers so you only need a single charger for phone, tablet, and laptop.',
    aliases: ['charger', 'cable', 'usb cable', 'power adapter', 'cord', 'phone charger', 'fast charger']
  },
  {
    id: 'broken-laptop',
    name: 'Broken Laptop Computer',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Remove hard drive or shred data, surrender to authorized e-waste dismantling facility.',
    explanation: 'Laptops contain lithium-ion batteries, printed circuit boards, and LCD screens requiring regulated recycling.',
    ecoTip: 'Tech repair cafes can often salvage working screens, RAM, and SSD storage before you scrap the motherboard.',
    aliases: ['laptop', 'notebook', 'computer', 'macbook', 'broken laptop', 'pc laptop']
  },
  {
    id: 'keyboard',
    name: 'Computer Keyboard',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Send with peripherals to electronic scrap collection center.',
    explanation: 'Plastic keys, membrane switches, and copper wiring can be separated and recycled cleanly.',
    ecoTip: 'Clean sticky keyboards with isopropyl alcohol or mechanical keycap pullers to restore full function before discarding.',
    aliases: ['keyboard', 'computer keyboard', 'pc keyboard', 'mechanical keyboard', 'usb keyboard']
  },
  {
    id: 'mouse',
    name: 'Computer Mouse',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Remove AA/AAA battery (if wireless) and drop mouse into peripheral e-waste bin.',
    explanation: 'Contains microswitches, optical sensors, and ABS plastic casings.',
    ecoTip: 'If your mouse double-clicks accidentally, spraying contact cleaner on the microswitch often fixes it in seconds!',
    aliases: ['mouse', 'computer mouse', 'optical mouse', 'wireless mouse', 'trackpad']
  },
  {
    id: 'earphones',
    name: 'Earphones & In-Ear Buds',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Drop in specialized small electronics e-waste receptacle.',
    explanation: 'Contains neodymium magnets, delicate copper voice coils, and small lithium coin cells.',
    ecoTip: 'Use silicone cable protectors at strain points to stop wires from fraying prematurely.',
    aliases: ['earphones', 'earbuds', 'airpods', 'headphones', 'ear piece', 'wired earphones']
  },
  {
    id: 'headphones',
    name: 'Over-Ear Headphones',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Take to electronic recycling kiosk or manufacturer trade-in program.',
    explanation: 'Composite device containing copper wiring, magnets, leatherette foam, and rechargeable cells.',
    ecoTip: 'Worn ear cushions are almost always replaceable online for cheap, avoiding a whole new headphone purchase.',
    aliases: ['headphones', 'over ear headphones', 'headset', 'gaming headset', 'bluetooth headphones']
  },
  {
    id: 'usb-cable',
    name: 'USB Cable & Charging Cords',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Bundle neatly with a twist tie and deposit in e-waste cord drop-off bin.',
    explanation: 'High-purity copper wires inside PVC or braided nylon insulation are valuable for copper smelters.',
    ecoTip: 'Reinforce cracked cable joints with heat-shrink tubing to extend their functional life by years.',
    aliases: ['usb cable', 'type c cable', 'lightning cable', 'micro usb', 'charging cord', 'cable wire', 'cables']
  },
  {
    id: 'computer-components',
    name: 'Computer Components (Motherboards, RAM, GPU)',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Handle in anti-static bag and drop at authorized circuit board recycler.',
    explanation: 'Printed circuit boards have the highest concentration of recoverable gold, silver, and copper per kilogram.',
    ecoTip: 'PC enthusiast communities and hobbyists often buy older working components for retro gaming and homelabs.',
    aliases: ['motherboard', 'ram', 'graphics card', 'gpu', 'cpu', 'sound card', 'circuit board', 'pc parts']
  },
  {
    id: 'remote-control',
    name: 'Remote Control (TV / AC)',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Remove batteries first! Deposit remote shell and circuit in e-waste drop-off.',
    explanation: 'Contains silicone keypad pads, infrared LED diodes, and printed circuits.',
    ecoTip: 'Smartphone universal IR blaster apps can replace physical remotes entirely if your remote breaks.',
    aliases: ['remote', 'remote control', 'tv remote', 'ac remote', 'controller']
  },
  {
    id: 'printer-cartridge',
    name: 'Printer Ink & Toner Cartridges',
    categoryKey: 'E_WASTE',
    category: 'E-Waste',
    recommendedAction: 'Return to manufacturer cartridge recycling bin (HP, Canon, Epson) or refill kiosk.',
    explanation: 'Residual toner powders are respiratory irritants. Cartridge shells are precision engineered for refilling.',
    ecoTip: 'Choose continuous ink tank printers over small disposable cartridges to reduce plastic waste by 90%.',
    aliases: ['printer cartridge', 'ink cartridge', 'toner', 'toner cartridge', 'laser toner', 'printer ink']
  },

  // ===================== DONATE / REUSE =====================
  {
    id: 'old-clothes',
    name: 'Old Clothes & Apparel',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Wash and donate wearable clothing to local shelters, NGOs, or textile thrift banks.',
    explanation: 'Fast-fashion textiles produce immense carbon footprints and microfiber pollution in landfills. Tattered clothes can be shredded into industrial insulation.',
    ecoTip: 'Cut unwearable cotton t-shirts into reusable cleaning rags and floor dusters.',
    aliases: ['clothes', 'clothing', 'shirt', 'pants', 'textiles', 'garments', 'apparel', 'jeans', 'tshirt']
  },
  {
    id: 'working-old-laptop',
    name: 'Working Old Laptop',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Wipe personal data clean and donate to underprivileged students, schools, or refurbished tech charities.',
    explanation: 'Extending a computer’s life cycle by 3 to 4 years mitigates 70% of its total lifetime lifecycle carbon emissions.',
    ecoTip: 'Install lightweight Linux distributions (like Lubuntu or ChromeOS Flex) to give aging laptops lightning-fast speed for studying.',
    aliases: ['laptop', 'notebook', 'computer', 'macbook', 'old laptop', 'used pc']
  },
  {
    id: 'shoes-sneakers',
    name: 'Shoes & Sneakers',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Tie pairs together by laces and donate wearable shoes to community shoe drives.',
    explanation: 'Shoe soles contain complex vulcanized rubbers and EVA foams that resist biodegradation for over a century.',
    ecoTip: 'Many athletic footwear brands run sole-grinding programs that turn worn-out sneakers into playground turf.',
    aliases: ['shoes', 'sneakers', 'boots', 'sandals', 'footwear', 'slippers', 'sports shoes']
  },
  {
    id: 'books-novels',
    name: 'Books & Textbooks',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Donate to public libraries, school book drives, or neighborhood Little Free Libraries.',
    explanation: 'Books educate generations! Reusing books saves thousands of liters of paper-milling water.',
    ecoTip: 'Organize a neighborhood book-swap meet to refresh your reading shelf for zero cost and zero waste.',
    aliases: ['book', 'books', 'textbook', 'novel', 'reading book', 'story book', 'comics']
  },
  {
    id: 'toys-games',
    name: 'Toys & Board Games',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Sanitize, pack all pieces together in a box or bag, and donate to orphanages or daycares.',
    explanation: 'Most toys are durable molded ABS plastics that bring joy to many children across multiple years.',
    ecoTip: 'Missing game pieces can easily be substituted with buttons or 3D-printed replacements.',
    aliases: ['toys', 'toy', 'board game', 'action figure', 'doll', 'lego', 'puzzle']
  },
  {
    id: 'working-electronics',
    name: 'Working Small Appliances (Radio, Clock, Blender)',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Clean, wrap cord, and donate or list on freecycle/secondhand community boards.',
    explanation: 'Keeping functioning electric goods in service avoids manufacturing and shipping emissions of replacement goods.',
    ecoTip: 'Check appliance fuses and cords before giving up; a 50-cent fuse replacement often resurrects dead appliances.',
    aliases: ['small appliances', 'radio', 'alarm clock', 'blender', 'toaster', 'electric kettle', 'fan', 'table fan']
  },
  {
    id: 'furniture',
    name: 'Furniture (Chairs, Tables, Desks)',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Offer to local charities, shelters, or upcycle with a fresh coat of low-VOC paint.',
    explanation: 'Solid wood and metal furniture lasts for decades and saves trees from being cut for particleboard replacements.',
    ecoTip: 'Sanding and oiling old solid wood brings back its natural grain and luster instantly.',
    aliases: ['furniture', 'chair', 'table', 'desk', 'stool', 'wooden shelf', 'bookshelf', 'sofa']
  },
  {
    id: 'reusable-bags',
    name: 'Surplus Reusable Canvas Bags',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Wash and keep extra totes in car boot or drop at community food pantries.',
    explanation: 'A single organic cotton tote must be reused 50 to 100 times to offset its production footprint.',
    ecoTip: 'Gift items to friends inside reusable cloth tote bags instead of using disposable wrapping paper!',
    aliases: ['reusable bag', 'cloth bag', 'canvas tote', 'tote bag', 'shopping bag cloth', 'jute bag']
  },
  {
    id: 'household-utensils',
    name: 'Cookware & Kitchen Utensils',
    categoryKey: 'DONATE_REUSE',
    category: 'Donate / Reuse',
    recommendedAction: 'Clean thoroughly and donate stainless steel, ceramic, or cast iron cookware to community kitchens.',
    explanation: 'Metal cookware lasts a lifetime and provides immediate utility to families establishing new homes.',
    ecoTip: 'Rusty cast iron pans can be fully restored by scrubbing with coarse salt and re-seasoning with flaxseed or canola oil.',
    aliases: ['cookware', 'utensils', 'pots', 'pans', 'cutlery', 'steel plates', 'kitchen utensils', 'kadhai']
  },

  // ===================== HAZARDOUS DISPOSAL =====================
  {
    id: 'used-battery',
    name: 'Used Battery (Alkaline & Lithium)',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Tape terminal ends with clear tape and surrender to designated battery disposal kiosk.',
    explanation: 'Corrosive acids and toxic heavy metals (lithium, cadmium, nickel) pose acute fire risks in standard trash compactors.',
    ecoTip: 'Switch to rechargeable NiMH or USB-C rechargeable batteries to prevent dozens of single-use batteries each year.',
    aliases: ['battery', 'aa battery', 'lithium battery', 'cell battery', 'power cell', 'aaa battery', 'button cell', 'batteries']
  },
  {
    id: 'paint-containers',
    name: 'Paint Cans & Solvents',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Never pour down storm drains or toilets. Take liquid paints to municipal household hazardous waste collection.',
    explanation: 'Contains Volatile Organic Compounds (VOCs), solvents, and pigments that severely poison aquatic life and municipal sewage.',
    ecoTip: 'Let tiny residual amounts of latex paint dry rock-hard with the lid off before discarding the dried tin with scrap metal.',
    aliases: ['paint can', 'paint', 'oil paint', 'thinner', 'varnish', 'solvent', 'wood stain', 'turpentine']
  },
  {
    id: 'chemical-containers',
    name: 'Chemical & Pesticide Containers',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Triple-rinse only if instructed, keep in original labeled bottle, surrender to hazardous waste facility.',
    explanation: 'Residual harsh chemicals (bleach, drain opener, bug killer) create toxic chlorine gas if mixed and burn sanitation workers.',
    ecoTip: 'Switch to eco-certified natural cleaning substitutes like baking soda, vinegar, and castile soap for everyday cleaning.',
    aliases: ['chemical container', 'pesticide', 'bleach', 'insecticide', 'drain cleaner', 'weed killer', 'acid cleaner', 'cleaning chemical']
  },
  {
    id: 'cfl-bulbs',
    name: 'Fluorescent & CFL Light Bulbs',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Handle very carefully without breaking. Wrap in newspaper and deposit in specialized bulb drop-off box.',
    explanation: 'CFLs and fluorescent tubes contain mercury vapor. Inhaling mercury from broken bulbs damages the central nervous system.',
    ecoTip: 'Upgrade burnt-out CFLs to energy-saving LED bulbs, which contain zero mercury and consume 50% less power.',
    aliases: ['cfl bulb', 'tube light', 'fluorescent bulb', 'light bulb', 'cfl', 'fluorescent tube', 'mercury bulb']
  },
  {
    id: 'expired-power-banks',
    name: 'Swollen / Expired Power Banks & Li-Po Packs',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Place in non-flammable container (sand/metal can) and immediately take to an e-waste hazardous depot.',
    explanation: 'Swollen lithium-polymer batteries suffer from gas build-up and can spontaneously undergo thermal runaway (fire/explosion).',
    ecoTip: 'Never charge swollen batteries, and keep power banks out of hot cars to prevent thermal swelling.',
    aliases: ['power bank', 'swollen battery', 'lipo battery', 'lithium polymer', 'portable charger broken']
  },
  {
    id: 'medical-sharps',
    name: 'Medical Sharps & Needles / Syringes',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Place in puncture-resistant biohazard sharps container with tight lid; return to pharmacy or hospital drop-off.',
    explanation: 'Loose needles in garbage bags poke sanitation workers and pose serious needle-stick bloodborne pathogen risks.',
    ecoTip: 'Check with local clinics or pharmacies for free mail-back sharps container programs.',
    aliases: ['needle', 'syringe', 'sharps', 'medical sharps', 'lancet', 'insulin needle', 'scalpel', 'injection']
  },
  {
    id: 'hazardous-electronics',
    name: 'Hazardous Electronic Parts (Mercury Switches, Smoke Detectors)',
    categoryKey: 'HAZARDOUS',
    category: 'Hazardous Disposal',
    recommendedAction: 'Never disassemble. Hand over directly to certified hazardous industrial recycler.',
    explanation: 'Smoke detectors contain microscopic ionizing americium-241 sources; older thermostats contain liquid mercury tilt switches.',
    ecoTip: 'Contact your smoke detector manufacturer — almost all have dedicated postal take-back recycling programs.',
    aliases: ['smoke detector', 'mercury switch', 'thermostat old', 'crt monitor', 'hazardous e-waste']
  }
];
