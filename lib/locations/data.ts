import type { CountryInput } from "./types";

/**
 * The single source of truth for every location page on the site.
 *
 * To add a new city: add one `CityInput` object to its state's `cities`
 * array (or create a new state/country if it doesn't exist yet). That's
 * it — the page, its metadata, its schema, its internal links and its
 * Digital Growth Report are all generated from this one object by
 * lib/locations/generate.ts. No new files, no new routes, no new
 * components.
 *
 * Keep `facts` real and verifiable. If you don't know a genuine fact
 * about a place, leave it out — the generator writes honest, generic
 * copy instead of inventing one.
 */
export const locationsData: CountryInput[] = [
  {
    name: "India",
    slug: "india",
    industries: [
      "retail-ecommerce",
      "hospitality-restaurants",
      "healthcare-clinics",
      "education-coaching",
      "real-estate-construction",
      "manufacturing-industrial",
      "professional-legal-services",
      "salons-gyms-wellness",
    ],
    states: [
      {
        name: "Chhattisgarh",
        slug: "chhattisgarh",
        industries: [
          "agriculture-agri-trade",
          "manufacturing-industrial",
          "retail-ecommerce",
          "education-coaching",
          "healthcare-clinics",
          "real-estate-construction",
          "transport-logistics",
          "hospitality-restaurants",
        ],
        facts: [
          'has long been nicknamed "the rice bowl of India" for its agriculture and rice cultivation',
          "is anchored industrially by the steel and manufacturing belt around Bhilai and Durg",
        ],
        cities: [
          {
            name: "Raipur",
            slug: "raipur",
            lat: 21.2514,
            lng: 81.6296,
            isHeadquarters: true,
            industries: [
              "retail-ecommerce",
              "real-estate-construction",
              "healthcare-clinics",
              "education-coaching",
              "hospitality-restaurants",
              "professional-legal-services",
              "it-technology-services",
            ],
            facts: ["is the capital and largest city of Chhattisgarh"],
          },
          {
            name: "Bhilai",
            slug: "bhilai",
            lat: 21.2094,
            lng: 81.3784,
            industries: [
              "manufacturing-industrial",
              "retail-ecommerce",
              "education-coaching",
              "healthcare-clinics",
              "real-estate-construction",
              "hospitality-restaurants",
            ],
            facts: ["grew up around one of India's largest steel plants"],
          },
          {
            name: "Durg",
            slug: "durg",
            lat: 21.1904,
            lng: 81.2849,
            industries: [
              "retail-ecommerce",
              "agriculture-agri-trade",
              "transport-logistics",
              "education-coaching",
              "healthcare-clinics",
              "real-estate-construction",
            ],
            facts: [
              "sits alongside Bhilai as one of Chhattisgarh's key twin cities, and is a district headquarters and rail junction",
            ],
          },
          {
            name: "Bilaspur",
            slug: "bilaspur",
            lat: 22.0797,
            lng: 82.1409,
            industries: [
              "professional-legal-services",
              "healthcare-clinics",
              "education-coaching",
              "hospitality-restaurants",
              "retail-ecommerce",
              "government-institutional",
              "real-estate-construction",
            ],
            facts: ["is home to the South East Central Railway zone headquarters and the Chhattisgarh High Court"],
          },
        ],
      },
      {
        name: "Maharashtra",
        slug: "maharashtra",
        industries: [
          "it-technology-services",
          "professional-legal-services",
          "manufacturing-industrial",
          "transport-logistics",
          "retail-ecommerce",
          "education-coaching",
        ],
        facts: [
          "is home to Mumbai, India's financial capital, and Pune, one of the country's largest IT and automotive manufacturing hubs",
        ],
        cities: [
          {
            name: "Mumbai",
            slug: "mumbai",
            lat: 19.076,
            lng: 72.8777,
            industries: [
              "it-technology-services",
              "professional-legal-services",
              "real-estate-construction",
              "retail-ecommerce",
              "hospitality-restaurants",
            ],
            facts: [
              "is India's financial capital and home to the Bombay Stock Exchange and the headquarters of many of India's largest companies",
            ],
            nearbyCities: ["pune", "ahmedabad"],
          },
          {
            name: "Pune",
            slug: "pune",
            lat: 18.5204,
            lng: 73.8567,
            industries: [
              "it-technology-services",
              "manufacturing-industrial",
              "education-coaching",
              "real-estate-construction",
            ],
            facts: [
              "is one of India's largest IT services and automotive manufacturing hubs, and a major education centre",
            ],
          },
          {
            name: "Nagpur",
            slug: "nagpur",
            lat: 21.1458,
            lng: 79.0882,
            industries: [
              "transport-logistics",
              "agriculture-agri-trade",
              "retail-ecommerce",
              "education-coaching",
              "healthcare-clinics",
              "it-technology-services",
              "hospitality-restaurants",
            ],
            facts: [
              'sits at the geographic centre of India and is nationally known as the "Orange City" for its citrus trade',
            ],
            // Cross-state cross-link: Nagpur's closest sibling by relevance is Raipur, not Mumbai/Pune, so this overrides the default same-state auto-link.
            nearbyCities: ["raipur"],
          },
        ],
      },
      {
        name: "Karnataka",
        slug: "karnataka",
        industries: [
          "it-technology-services",
          "education-coaching",
          "manufacturing-industrial",
          "retail-ecommerce",
          "hospitality-restaurants",
        ],
        facts: ["is home to Bengaluru, India's largest technology and IT services hub"],
        cities: [
          {
            name: "Bengaluru",
            slug: "bengaluru",
            lat: 12.9716,
            lng: 77.5946,
            industries: [
              "it-technology-services",
              "professional-legal-services",
              "real-estate-construction",
              "retail-ecommerce",
            ],
            facts: [
              'is widely known as "India\'s Silicon Valley" and is home to the country\'s largest concentration of IT and technology companies',
            ],
          },
          {
            name: "Mysuru",
            slug: "mysuru",
            lat: 12.2958,
            lng: 76.6394,
            industries: ["it-technology-services", "education-coaching", "hospitality-restaurants", "retail-ecommerce"],
            facts: ["is a growing secondary IT hub and a major tourism and education centre in Karnataka"],
          },
        ],
      },
      {
        name: "Telangana",
        slug: "telangana",
        industries: [
          "it-technology-services",
          "healthcare-clinics",
          "education-coaching",
          "real-estate-construction",
        ],
        facts: ["is anchored by Hyderabad, one of India's largest IT and life-sciences hubs"],
        cities: [
          {
            name: "Hyderabad",
            slug: "hyderabad",
            lat: 17.385,
            lng: 78.4867,
            industries: ["it-technology-services", "healthcare-clinics", "education-coaching", "real-estate-construction"],
            facts: ["is one of India's largest IT and pharmaceutical hubs, home to HITEC City"],
            nearbyCities: ["bengaluru", "chennai"],
          },
        ],
      },
      {
        name: "Tamil Nadu",
        slug: "tamil-nadu",
        industries: [
          "manufacturing-industrial",
          "it-technology-services",
          "healthcare-clinics",
          "professional-legal-services",
        ],
        facts: ["has one of India's largest manufacturing and IT services economies"],
        cities: [
          {
            name: "Chennai",
            slug: "chennai",
            lat: 13.0827,
            lng: 80.2707,
            industries: [
              "it-technology-services",
              "manufacturing-industrial",
              "healthcare-clinics",
              "professional-legal-services",
            ],
            facts: ['is a major IT services and automotive manufacturing hub, often called the "Detroit of India"'],
          },
          {
            name: "Coimbatore",
            slug: "coimbatore",
            lat: 11.0168,
            lng: 76.9558,
            industries: ["manufacturing-industrial", "it-technology-services", "education-coaching", "retail-ecommerce"],
            facts: ["is a major textile and manufacturing hub with a fast-growing IT sector"],
          },
        ],
      },
      {
        name: "Delhi",
        slug: "delhi",
        industries: [
          "professional-legal-services",
          "government-institutional",
          "it-technology-services",
          "real-estate-construction",
          "retail-ecommerce",
        ],
        cities: [
          {
            name: "New Delhi",
            slug: "new-delhi",
            lat: 28.6139,
            lng: 77.209,
            industries: [
              "professional-legal-services",
              "government-institutional",
              "it-technology-services",
              "real-estate-construction",
              "retail-ecommerce",
            ],
            facts: ["is India's national capital and a major hub for government, professional services and corporate headquarters"],
            nearbyCities: ["gurugram", "noida"],
          },
        ],
      },
      {
        name: "Haryana",
        slug: "haryana",
        industries: ["it-technology-services", "professional-legal-services", "manufacturing-industrial", "real-estate-construction"],
        facts: ["is anchored by Gurugram, one of India's major corporate and IT hubs on the edge of Delhi"],
        cities: [
          {
            name: "Gurugram",
            slug: "gurugram",
            lat: 28.4595,
            lng: 77.0266,
            industries: [
              "it-technology-services",
              "professional-legal-services",
              "manufacturing-industrial",
              "real-estate-construction",
            ],
            facts: ["is one of India's largest corporate and IT/BPO hubs, home to the offices of many Fortune 500 companies"],
            nearbyCities: ["new-delhi", "noida"],
          },
        ],
      },
      {
        name: "Uttar Pradesh",
        slug: "uttar-pradesh",
        industries: ["it-technology-services", "manufacturing-industrial", "education-coaching", "retail-ecommerce"],
        facts: ["is anchored industrially by Noida, a major IT and electronics manufacturing hub in the National Capital Region"],
        cities: [
          {
            name: "Noida",
            slug: "noida",
            lat: 28.5355,
            lng: 77.391,
            industries: ["it-technology-services", "manufacturing-industrial", "education-coaching", "retail-ecommerce"],
            facts: ["is a major IT and electronics manufacturing hub in the Delhi NCR region"],
            nearbyCities: ["new-delhi", "gurugram"],
          },
        ],
      },
      {
        name: "West Bengal",
        slug: "west-bengal",
        industries: ["professional-legal-services", "retail-ecommerce", "education-coaching", "it-technology-services"],
        facts: ["is anchored by Kolkata, eastern India's largest commercial and educational hub"],
        cities: [
          {
            name: "Kolkata",
            slug: "kolkata",
            lat: 22.5726,
            lng: 88.3639,
            industries: ["professional-legal-services", "retail-ecommerce", "education-coaching", "it-technology-services"],
            facts: ["is a major commercial, educational and cultural hub in eastern India"],
            nearbyCities: ["mumbai", "new-delhi"],
          },
        ],
      },
      {
        name: "Gujarat",
        slug: "gujarat",
        industries: ["manufacturing-industrial", "retail-ecommerce", "professional-legal-services", "it-technology-services"],
        facts: ["is anchored by Ahmedabad, one of India's largest manufacturing and trade hubs"],
        cities: [
          {
            name: "Ahmedabad",
            slug: "ahmedabad",
            lat: 23.0225,
            lng: 72.5714,
            industries: [
              "manufacturing-industrial",
              "retail-ecommerce",
              "professional-legal-services",
              "it-technology-services",
            ],
            facts: ["is one of India's largest textile and manufacturing hubs and a fast-growing financial centre"],
            nearbyCities: ["mumbai", "pune"],
          },
        ],
      },
    ],
  },
];
