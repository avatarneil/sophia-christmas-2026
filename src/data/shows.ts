export interface Show {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  state: string;
  ticketUrl: string;
  posterImage: string;
  description?: string;
  region: "hartford" | "providence" | "portland" | "tbd";
}

export const shows: Show[] = [
  // Hartford, CT - The Bushnell
  {
    id: "shucked",
    title: "Shucked",
    startDate: "2026-02-24",
    endDate: "2026-03-01",
    venue: "The Bushnell",
    city: "Hartford",
    state: "CT",
    ticketUrl: "https://bushnell.org/shows-concerts/shucked",
    posterImage: "/posters/shucked.jpg",
    description: "A corn-fed, corn-bred musical comedy that's utterly un-shuck-able!",
    region: "hartford",
  },
  {
    id: "beauty-and-the-beast",
    title: "Beauty & The Beast",
    startDate: "2026-04-07",
    endDate: "2026-04-12",
    venue: "The Bushnell",
    city: "Hartford",
    state: "CT",
    ticketUrl: "https://bushnell.org/shows-concerts/disney-s-beauty-and-the-beast",
    posterImage: "/posters/beautyandthebeast.png",
    description: "Disney's beloved tale as old as time comes to life on stage.",
    region: "hartford",
  },

  // Providence, RI - PPAC
  {
    id: "wicked",
    title: "Wicked",
    startDate: "2026-03-04",
    endDate: "2026-03-22",
    venue: "Providence Performing Arts Center",
    city: "Providence",
    state: "RI",
    ticketUrl: "https://www.ppacri.org/news/detail/season-26-draft",
    posterImage: "/posters/wicked.jpg",
    description: "The untold story of the Witches of Oz. Defy gravity with us!",
    region: "providence",
  },
  {
    id: "lion-king",
    title: "The Lion King",
    startDate: "2026-05-20",
    endDate: "2026-06-07",
    venue: "Providence Performing Arts Center",
    city: "Providence",
    state: "RI",
    ticketUrl: "https://www.ppacri.org/news/detail/season-26-draft",
    posterImage: "/posters/lionking.jpg",
    description: "Experience the awe-inspiring visual artistry and beloved music of this landmark musical.",
    region: "providence",
  },

  // Portland, ME - Merrill Auditorium
  {
    id: "spamalot",
    title: "Spamalot",
    startDate: "2026-06-23",
    endDate: "2026-06-25",
    venue: "Merrill Auditorium",
    city: "Portland",
    state: "ME",
    ticketUrl: "https://www.broadway.org/tours/spamalot-2025",
    posterImage: "/posters/spamalot.png",
    description: "Lovingly ripped off from Monty Python and the Holy Grail. Always look on the bright side!",
    region: "portland",
  },

  // TBD / Other CT Venues
  {
    id: "moulin-rouge",
    title: "Moulin Rouge! The Musical",
    startDate: "2026-04-15",
    endDate: "2026-04-19",
    venue: "Oakdale Theatre",
    city: "Wallingford",
    state: "CT",
    ticketUrl: "https://www.broadway.org/tours/moulin-rouge-the-musical",
    posterImage: "/posters/moulin-rouge.jpg",
    description: "Enter a world of splendor and romance, of eye-popping excess and bohemian ideals.",
    region: "tbd",
  },
  {
    id: "death-becomes-her",
    title: "Death Becomes Her",
    startDate: "TBD",
    endDate: "TBD",
    venue: "TBD",
    city: "TBD",
    state: "",
    ticketUrl: "https://deathbecomesher.com",
    posterImage: "https://placehold.co/400x600/8E44AD/FDF8E8?text=Death+Becomes+Her",
    description: "The cult classic film becomes a wickedly funny new musical!",
    region: "tbd",
  },
];

export const regionLabels: Record<Show["region"], string> = {
  hartford: "Hartford, CT",
  providence: "Providence, RI",
  portland: "Portland, ME",
  tbd: "Other Locations",
};

export const regionVenues: Record<Show["region"], string> = {
  hartford: "The Bushnell Center for the Performing Arts",
  providence: "Providence Performing Arts Center (PPAC)",
  portland: "Merrill Auditorium",
  tbd: "Various Venues",
};

export function formatDateRange(startDate: string, endDate: string): string {
  if (startDate === "TBD" || endDate === "TBD") {
    return "Dates TBD";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const yearOptions: Intl.DateTimeFormatOptions = { year: "numeric" };

  const startFormatted = start.toLocaleDateString("en-US", options);
  const endFormatted = end.toLocaleDateString("en-US", options);
  const year = start.toLocaleDateString("en-US", yearOptions);

  // If same month, show "Feb 24 - Mar 1, 2026"
  return `${startFormatted} - ${endFormatted}, ${year}`;
}

export function getShowsByRegion(): Record<Show["region"], Show[]> {
  const grouped: Record<Show["region"], Show[]> = {
    hartford: [],
    providence: [],
    portland: [],
    tbd: [],
  };

  for (const show of shows) {
    grouped[show.region].push(show);
  }

  // Sort each region by start date
  for (const region of Object.keys(grouped) as Show["region"][]) {
    grouped[region].sort((a, b) => {
      if (a.startDate === "TBD") return 1;
      if (b.startDate === "TBD") return -1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }

  return grouped;
}

