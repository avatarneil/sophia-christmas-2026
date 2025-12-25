import Image from "next/image";
import { shows, formatDateRange, getShowsByRegion, regionLabels } from "@/data/shows";

// Color themes for each show placeholder
const showColors: Record<string, { bg: string; accent: string }> = {
  shucked: { bg: "from-yellow-600 to-amber-800", accent: "text-yellow-300" },
  "beauty-and-the-beast": { bg: "from-rose-800 to-pink-900", accent: "text-rose-300" },
  wicked: { bg: "from-emerald-800 to-green-950", accent: "text-emerald-300" },
  "lion-king": { bg: "from-orange-600 to-amber-900", accent: "text-orange-300" },
  spamalot: { bg: "from-blue-800 to-indigo-950", accent: "text-blue-300" },
  "moulin-rouge": { bg: "from-red-700 to-rose-950", accent: "text-red-300" },
  "death-becomes-her": { bg: "from-purple-800 to-violet-950", accent: "text-purple-300" },
};

function ShowCard({ show }: { show: (typeof shows)[0] }) {
  const dateRange = formatDateRange(show.startDate, show.endDate);
  const venueAddress = show.venue !== "TBD" 
    ? `${show.venue}, ${show.city}${show.state ? `, ${show.state}` : ""}`
    : "Location TBD";
  const mapsUrl = show.venue !== "TBD"
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`
    : null;
  
  const colors = showColors[show.id] || { bg: "from-burgundy to-burgundy-dark", accent: "text-gold" };
  const isPlaceholder = show.posterImage.includes("placehold") || !show.posterImage.startsWith("/posters/");
  const isFavorite = ["beauty-and-the-beast", "wicked", "moulin-rouge"].includes(show.id);

  return (
    <article className="gold-border card-glow group relative flex w-full max-w-sm flex-col overflow-hidden rounded-xl bg-charcoal-light">
      {/* Eyes emoji for favorites - appears on hover */}
      {isFavorite && (
        <div className="absolute right-3 top-3 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-2xl drop-shadow-lg" role="img" aria-label="eyes">👀</span>
        </div>
      )}
      {/* Poster Image or Placeholder */}
      <div className="relative z-10 aspect-square w-full overflow-hidden">
        {isPlaceholder ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} flex items-center justify-center p-6`}>
            <div className="text-center">
              <div className={`font-display text-3xl font-bold ${colors.accent} drop-shadow-lg`}>
                {show.title}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/60">
                Coming Fall 2026
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={show.posterImage}
            alt={`${show.title} poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-bold tracking-wide text-gold-light">
          {show.title}
        </h3>
        
        {show.description && (
          <p className="text-sm leading-relaxed text-cream/70">
            {show.description}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-3">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-cream/90">
            <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{dateRange}</span>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-2 text-sm text-cream/90">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {mapsUrl ? (
              <a 
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
              >
                {venueAddress}
              </a>
            ) : (
              <span>{venueAddress}</span>
            )}
          </div>
        </div>

        {/* Ticket Button */}
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wider"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Let's Go!
        </a>
      </div>
    </article>
  );
}

function RegionSection({ 
  region, 
  shows: regionShows 
}: { 
  region: keyof typeof regionLabels; 
  shows: (typeof shows)[];
}) {
  if (regionShows.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <h2 className="font-display text-2xl font-bold tracking-wide text-gold md:text-3xl">
          {regionLabels[region]}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        {regionShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const showsByRegion = getShowsByRegion();
  const regionOrder: (keyof typeof regionLabels)[] = ["hartford", "providence", "portland", "tbd"];

  return (
    <div className="curtain-bg min-h-screen">
      {/* Hero Section */}
      <header className="spotlight relative overflow-hidden px-6 pb-16 pt-20 text-center md:pb-24 md:pt-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-burgundy/20 blur-3xl" />
          <div className="absolute -right-20 top-40 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Decorative flourish */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-2xl text-gold">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <h1 className="gold-shimmer font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Our 2026 Show Season
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-cream/80 md:text-xl">
            A curated collection of extraordinary Broadway experiences 
            <br className="hidden sm:block" />
            waiting for us to share together.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-gold">{shows.length}</div>
              <div className="text-sm uppercase tracking-wider text-cream/60">Shows</div>
            </div>
            <div className="h-10 w-px bg-gold/20" />
            <div>
              <div className="font-display text-3xl font-bold text-gold">4</div>
              <div className="text-sm uppercase tracking-wider text-cream/60">Venues</div>
            </div>
            <div className="h-10 w-px bg-gold/20" />
            <div>
              <div className="font-display text-3xl font-bold text-gold">2026</div>
              <div className="text-sm uppercase tracking-wider text-cream/60">Season</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="mx-auto h-6 w-6 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </header>

      {/* Shows Grid */}
      <main className="mx-auto max-w-7xl px-6 pb-20">
        {regionOrder.map((region) => (
          <RegionSection
            key={region}
            region={region}
            shows={showsByRegion[region]}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/10 py-8 text-center">
        <p className="font-body text-sm text-cream/50">
          Made with love for our next adventure together ✨
        </p>
      </footer>
    </div>
  );
}
