import type {
  EcoEvent,
  EventCategory,
  EventsMeta,
} from "@/types/event";

export const EVENT_CATEGORIES: EventCategory[] = [
  "Community Cleanup",
  "Tree Plantation",
  "River & Lake Restoration",
  "Urban Gardens",
];

export const EVENT_AREAS = [
  "Dhaka",
  "Old Dhaka",
  "Savar",
  "Narayanganj",
];

/**
 * Seed data for the events archive. Swap this module for an API call when the
 * backend exposes a GET events endpoint — the component layer only depends on
 * the `EcoEvent` type.
 */
export const events: EcoEvent[] = [
  {
    id: "hatirjheel-plastic-drive",
    title: "Clean Hatirjheel Campaign: Circular Plastic Drive",
    summary:
      "Join our city-wide effort to collect floating PET bottles and set up circular recycling stations along the waterfront promenade.",
    category: "Community Cleanup",
    image: "/Images/EventImg2.jpg",
    imageAlt: "Volunteers collecting plastic waste along the Hatirjheel waterfront",
    date: "2026-11-18",
    time: "08:00 AM",
    area: "Dhaka",
    location: "Hatirjheel Amphitheatre Waterfront, Dhaka",
    ecoPoints: 120,
    enrolled: 85,
    capacity: 100,
    organizer: { name: "Green Dhaka Action", initials: "GDA" },
    tags: ["water", "urban"],
  },
  {
    id: "green-mirpur-tree-drive",
    title: "Green Mirpur 2,000 Tree Plantation Drive",
    summary:
      "Plant indigenous Neem, Bokul, and Krishnachura saplings to fortify urban forest coverage and mitigate heat islands.",
    category: "Tree Plantation",
    image: "/Images/EventImg1.jpg",
    imageAlt: "Volunteers planting saplings in a green urban garden",
    date: "2026-11-20",
    time: "07:30 AM",
    area: "Dhaka",
    location: "Mirpur Botanical Gardens Perimeter, Dhaka",
    ecoPoints: 150,
    enrolled: 120,
    capacity: 150,
    organizer: { name: "Tarunno Shobuj", initials: "TS" },
    tags: ["weekend", "urban"],
  },
  {
    id: "save-buriganga-waterfront",
    title: "Save Buriganga Waterfront & Riverbank Cleanup",
    summary:
      "Coordinated extraction of heavy polymer debris and chemical silt barriers along Old Dhaka's historic riverfront.",
    category: "River & Lake Restoration",
    image: "/Images/EventImg2.jpg",
    imageAlt: "Volunteers bagging plastic waste along the Buriganga riverfront",
    date: "2026-11-21",
    time: "08:30 AM",
    area: "Old Dhaka",
    location: "Sadarghat Riverfront Ghat 4, Old Dhaka",
    ecoPoints: 140,
    enrolled: 64,
    capacity: 80,
    organizer: { name: "River Protectors BD", initials: "RP" },
    tags: ["weekend", "water", "urban", "high-points"],
  },
  {
    id: "mohammadpur-rooftop-harvest",
    title: "Mohammadpur Rooftop Harvest & Compost Workshop",
    summary:
      "Build raised beds, turn kitchen waste into compost, and harvest winter greens with neighbourhood garden mentors.",
    category: "Urban Gardens",
    image: "/Images/EventImg3.jpg",
    imageAlt: "Women tending a productive rooftop vegetable garden",
    date: "2026-11-22",
    time: "08:00 AM",
    area: "Dhaka",
    location: "Mohammadpur Rooftop Farm, Dhaka",
    ecoPoints: 110,
    enrolled: 42,
    capacity: 70,
    organizer: { name: "Urban Harvest Collective", initials: "UHC" },
    tags: ["urban"],
  },
  {
    id: "savar-urban-forest-care",
    title: "Savar Urban Forest Care Day",
    summary:
      "Mulching, pruning, and sapling care across the memorial forest belt with local school ecology clubs.",
    category: "Tree Plantation",
    image: "/Images/EventImg1.jpg",
    imageAlt: "Young volunteers caring for planted trees",
    date: "2026-11-25",
    time: "09:00 AM",
    area: "Savar",
    location: "Savar National Memorial Forest Belt, Savar",
    ecoPoints: 130,
    enrolled: 58,
    capacity: 120,
    organizer: { name: "Savar Green Youth", initials: "SGY" },
    tags: ["high-points"],
  },
  {
    id: "shitalakshya-plastic-audit",
    title: "Narayanganj Riverside Plastic Audit",
    summary:
      "Community-led brand audit and cleanup along the Shitalakshya ghats, feeding results into a public waste map.",
    category: "River & Lake Restoration",
    image: "/Images/EventImg2.jpg",
    imageAlt: "Volunteers surveying plastic waste along a river ghat",
    date: "2026-11-28",
    time: "08:00 AM",
    area: "Narayanganj",
    location: "Shitalakshya River Ghat, Narayanganj",
    ecoPoints: 160,
    enrolled: 30,
    capacity: 60,
    organizer: { name: "Shitalakshya Protectors", initials: "SP" },
    tags: ["weekend", "water", "high-points"],
  },
];

export const eventsMeta: EventsMeta = {
  totalUpcoming: 42,
  totalVolunteers: 1840,
};
