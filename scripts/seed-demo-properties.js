const { createClient } = require("@supabase/supabase-js")

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_gas_SUPABASE_URL
const supabaseKey = process.env.gas_SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// South African provinces with realistic cities
const provinces = {
  Gauteng: [
    "Johannesburg",
    "Pretoria",
    "Sandton",
    "Midrand",
    "Centurion",
    "Randburg",
    "Roodepoort",
    "Kempton Park",
    "Benoni",
    "Boksburg",
  ],
  "Western Cape": [
    "Cape Town",
    "Stellenbosch",
    "Paarl",
    "Somerset West",
    "George",
    "Hermanus",
    "Plettenberg Bay",
    "Knysna",
    "Franschhoek",
    "Langebaan",
  ],
  "KwaZulu-Natal": [
    "Durban",
    "Pietermaritzburg",
    "Ballito",
    "Umhlanga",
    "Richards Bay",
    "Newcastle",
    "Port Shepstone",
    "Margate",
    "Scottburgh",
    "Hillcrest",
  ],
  "Eastern Cape": [
    "Port Elizabeth",
    "East London",
    "Gqeberha",
    "Mthatha",
    "Grahamstown",
    "Uitenhage",
    "Port Alfred",
    "Jeffrey's Bay",
    "Knysna",
    "Queenstown",
  ],
  Limpopo: [
    "Polokwane",
    "Tzaneen",
    "Mokopane",
    "Makhado",
    "Thohoyandou",
    "Musina",
    "Phalaborwa",
    "Lephalale",
    "Giyani",
    "Bela-Bela",
  ],
  Mpumalanga: [
    "Nelspruit",
    "Witbank",
    "Middelburg",
    "Secunda",
    "Ermelo",
    "Standerton",
    "Mbombela",
    "White River",
    "Hazyview",
    "Barberton",
  ],
  "North West": [
    "Rustenburg",
    "Mahikeng",
    "Potchefstroom",
    "Klerksdorp",
    "Brits",
    "Vryburg",
    "Lichtenburg",
    "Schweizer-Reneke",
    "Orkney",
    "Zeerust",
  ],
  "Northern Cape": [
    "Kimberley",
    "Upington",
    "Springbok",
    "De Aar",
    "Kuruman",
    "Postmasburg",
    "Kathu",
    "Prieska",
    "Douglas",
    "Victoria West",
  ],
  "Free State": [
    "Bloemfontein",
    "Welkom",
    "Bethlehem",
    "Kroonstad",
    "Sasolburg",
    "Harrismith",
    "Parys",
    "Virginia",
    "Odendaalsrus",
    "Phuthaditjhaba",
  ],
}

const propertyTypes = ["house", "apartment", "townhouse", "land", "farm", "commercial", "industrial"]
const listingTypes = ["sale", "rent"]

const features = [
  "Swimming Pool",
  "Garden",
  "Balcony",
  "Garage",
  "Security",
  "Air Conditioning",
  "Fireplace",
  "Study",
  "Pet Friendly",
  "Fibre Internet",
  "Solar Panels",
  "Borehole",
  "Electric Fence",
  "Alarm System",
  "Patio",
  "Built-in Cupboards",
  "Domestic Accommodation",
  "Flatlet",
  "Gym",
  "Sauna",
]

const propertyTitles = {
  house: [
    "Spacious Family Home",
    "Modern House with Garden",
    "Charming Home in Quiet Area",
    "Luxury Family Residence",
    "Beautiful Home with Pool",
    "Elegant Home in Prime Location",
    "Stunning Family Home",
    "Contemporary Home with Views",
    "Immaculate Family Home",
    "Stylish Home in Secure Estate",
  ],
  apartment: [
    "Modern Apartment with View",
    "Luxury Apartment in City Center",
    "Stylish Apartment with Balcony",
    "Spacious Apartment with Parking",
    "Contemporary Apartment",
    "Secure Apartment with Amenities",
    "Bright Apartment with Balcony",
    "Executive Apartment",
    "Modern Apartment in Prime Area",
    "Stunning Penthouse Apartment",
  ],
  townhouse: [
    "Modern Townhouse in Complex",
    "Secure Townhouse with Garden",
    "Spacious Townhouse",
    "Contemporary Townhouse",
    "Beautiful Townhouse in Estate",
    "Family Townhouse with Pool",
    "Stylish Townhouse",
    "Luxury Townhouse",
    "Duplex Townhouse",
    "Neat Townhouse in Secure Complex",
  ],
  land: [
    "Prime Land for Development",
    "Vacant Land in Growing Area",
    "Land with Stunning Views",
    "Large Plot for Sale",
    "Residential Land",
    "Commercial Land",
    "Industrial Land",
    "Agricultural Land",
    "Land with Approved Plans",
    "Level Land Ready to Build",
  ],
  farm: [
    "Working Farm with Potential",
    "Lifestyle Farm with Views",
    "Agricultural Farm",
    "Game Farm",
    "Small Holding",
    "Productive Farm",
    "Farm with Water Rights",
    "Cattle Farm",
    "Equestrian Farm",
    "Off-Grid Farm",
  ],
  commercial: [
    "Commercial Property in CBD",
    "Retail Space Available",
    "Office Space for Sale",
    "Prime Commercial Building",
    "Shopping Center Unit",
    "Commercial Property with Parking",
    "Warehouse and Office Combo",
    "Business Premises",
    "Stand-alone Commercial Building",
    "Investment Property",
  ],
  industrial: [
    "Industrial Warehouse",
    "Factory Space Available",
    "Industrial Property with Yard",
    "Warehouse with Office",
    "Large Industrial Unit",
    "Manufacturing Facility",
    "Distribution Center",
    "Industrial Park Unit",
    "Secure Industrial Property",
    "Mini Factory",
  ],
}

function generateDescription(type, city, province) {
  const descriptions = [
    `Discover this exceptional ${type} located in the heart of ${city}, ${province}. This property offers modern living with excellent finishes and attention to detail.`,
    `Welcome to this stunning ${type} in ${city}. Perfectly positioned in ${province}, this property combines comfort and style in a prime location.`,
    `Rare opportunity to own this beautiful ${type} in ${city}, ${province}. Features include modern amenities and exceptional value.`,
    `This magnificent ${type} in ${city} offers everything you need. Located in the sought-after area of ${province}.`,
    `Don't miss this incredible ${type} in ${city}. Situated in ${province}, this property offers excellent value and location.`,
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

function generateFeatures() {
  const count = Math.floor(Math.random() * 8) + 3
  const shuffled = [...features].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generatePrice(type, listingType) {
  const priceRanges = {
    house: listingType === "sale" ? [1200000, 8000000] : [8000, 35000],
    apartment: listingType === "sale" ? [750000, 4500000] : [6000, 25000],
    townhouse: listingType === "sale" ? [1000000, 5000000] : [7000, 28000],
    land: listingType === "sale" ? [500000, 3000000] : [0, 0],
    farm: listingType === "sale" ? [2000000, 15000000] : [15000, 50000],
    commercial: listingType === "sale" ? [1500000, 10000000] : [10000, 80000],
    industrial: listingType === "sale" ? [2000000, 12000000] : [12000, 100000],
  }

  const [min, max] = priceRanges[type]
  if (max === 0) return 0
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateImages(count) {
  const images = []
  const queries = [
    "modern house exterior",
    "luxury apartment interior",
    "beautiful garden",
    "spacious living room",
    "modern kitchen",
    "master bedroom",
    "swimming pool",
    "property exterior",
  ]

  for (let i = 0; i < count; i++) {
    const query = queries[Math.floor(Math.random() * queries.length)]
    images.push(`/placeholder.svg?height=600&width=800&query=${encodeURIComponent(query)}`)
  }
  return images
}

async function seedProperties() {
  console.log("Starting to seed demo properties...")

  const { data: users, error: userError } = await supabase.from("users").select("id").limit(1)

  let ownerId

  if (!users || users.length === 0) {
    console.log("No users found, creating demo user...")
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: "demo@getaspot.co.za",
      password: "DemoUser123!",
      email_confirm: true,
      user_metadata: {
        full_name: "Demo User",
        user_type: "private_seller",
      },
    })

    if (authError || !authUser.user) {
      console.error("Error creating demo user:", authError)
      return
    }

    ownerId = authUser.user.id
  } else {
    ownerId = users[0].id
  }

  console.log("Using owner ID:", ownerId)

  let totalInserted = 0

  for (const [province, cities] of Object.entries(provinces)) {
    console.log(`Seeding properties for ${province}...`)

    const properties = []

    for (let i = 0; i < 100; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)]
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
      const listingType =
        propertyType === "land" ? "sale" : listingTypes[Math.floor(Math.random() * listingTypes.length)]
      const price = generatePrice(propertyType, listingType)

      if (propertyType === "land" && listingType === "rent") continue

      const titles = propertyTitles[propertyType]
      const title = titles[Math.floor(Math.random() * titles.length)]

      const property = {
        title,
        description: generateDescription(propertyType, city, province),
        property_type: propertyType,
        listing_type: listingType,
        price,
        bedrooms: ["house", "apartment", "townhouse"].includes(propertyType) ? Math.floor(Math.random() * 4) + 1 : null,
        bathrooms: ["house", "apartment", "townhouse"].includes(propertyType)
          ? Math.floor(Math.random() * 3) + 1
          : null,
        garages: ["house", "townhouse", "commercial"].includes(propertyType) ? Math.floor(Math.random() * 3) + 1 : null,
        floor_size: ["house", "apartment", "townhouse", "commercial", "industrial"].includes(propertyType)
          ? Math.floor(Math.random() * 300) + 50
          : null,
        land_size: ["house", "townhouse", "land", "farm"].includes(propertyType)
          ? Math.floor(Math.random() * 2000) + 200
          : null,
        address: `${Math.floor(Math.random() * 500) + 1} ${["Main", "Oak", "Church", "High", "Park", "Market", "Station"][Math.floor(Math.random() * 7)]} Street`,
        city,
        province,
        postal_code: String(Math.floor(Math.random() * 9000) + 1000),
        features: generateFeatures(),
        images: generateImages(Math.floor(Math.random() * 5) + 3),
        status: "active",
        owner_id: ownerId,
        views_count: Math.floor(Math.random() * 500),
        favorites_count: Math.floor(Math.random() * 50),
        published_at: new Date().toISOString(),
      }

      properties.push(property)
    }

    for (let i = 0; i < properties.length; i += 50) {
      const batch = properties.slice(i, i + 50)
      const { data, error } = await supabase.from("properties").insert(batch)

      if (error) {
        console.error(`Error inserting batch for ${province}:`, error)
      } else {
        totalInserted += batch.length
        console.log(`Inserted ${batch.length} properties for ${province} (Total: ${totalInserted})`)
      }
    }
  }

  console.log(`✓ Successfully seeded ${totalInserted} demo properties across all provinces!`)
}

seedProperties().catch(console.error)
