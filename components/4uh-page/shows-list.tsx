'use client'

import { useState } from 'react'

export interface Event {
  date: string
  title: string
  venue: string
  location: string
  url: string
  isPast?: boolean
  isTicketLink?: boolean
}

// Combined events data - all under akaieuan
export const eventsData: Event[] = [
  // Upcoming
  { date: 'Jan 24, 2026', title: 'AGAPE PRESENTS: KUKO', venue: '154 Scott Ave', location: 'New York City', url: 'https://ra.co/events/2310818', isPast: false, isTicketLink: true },
  // Past
  { date: 'Nov 19, 2025', title: 'Bossa Nova Happy Hour: Healing with Sound [004]', venue: 'Bossa Nova Civic Club', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Nov 14, 2025', title: 'The Ornate Project & Elsewhere: Funk Tribu', venue: 'Park Slope Warehouse', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Nov 8, 2025', title: 'Healing w Sound [003]', venue: 'Mood Ring', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Sep 5, 2025', title: 'Healing w Sound [002]', venue: 'Mood Ring', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Jun 7, 2025', title: 'Healing w Sound [001]', venue: 'Mood Ring', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Apr 11, 2025', title: 'Healing w Sound', venue: 'Mood Ring', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Oct 31, 2024', title: "Bossa's Open Civic Decks", venue: 'Bossa Nova Civic Club', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Oct 11, 2024', title: 'SPCTR Music 001: with Julia Govor', venue: 'TBA - 51 Austin street', location: 'Newark', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Sep 26, 2024', title: 'yion + E5piral + LINDA + DJ Sour + DJ Mars', venue: 'The End', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Jun 20, 2024', title: 'Nameless Entities X Open Window', venue: 'Secret Location', location: 'London', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Oct 16, 2022', title: 'Legacy vs. GZ199', venue: 'Seventh Heaven', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
  { date: 'Aug 17, 2022', title: 'East Village Live', venue: 'Nublu', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
]

function EventItem({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block py-2 transition-all duration-200"
      style={{
        opacity: event.isPast ? 0.6 : 1,
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1.5 sm:gap-4">
        <span 
          className="text-[11px] sm:text-xs font-light tracking-wide min-w-[88px] sm:min-w-[100px] shrink-0"
          style={{ 
            color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.2s ease-out',
          }}
        >
          {event.date}
        </span>
        <div className="flex-1 min-w-0">
          <span 
            className="text-sm sm:text-base font-normal tracking-wide leading-tight"
            style={{ 
              color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.2s ease-out',
            }}
          >
            {event.title}
          </span>
          <span 
            className="text-[11px] sm:text-xs font-light ml-0 sm:ml-2 block sm:inline"
            style={{ 
              color: isHovered ? 'rgba(68, 221, 170, 0.6)' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.2s ease-out',
            }}
          >
            @ {event.venue}
          </span>
          {event.isTicketLink && !event.isPast && (
            <span className="sm:ml-2 text-[10px] text-emerald-400/80 font-medium tracking-wide block sm:inline mt-0.5 sm:mt-0">
              TICKETS
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

interface ShowsListProps {
  isOpen: boolean
  events?: Event[]
}

export function ShowsList({ isOpen, events = eventsData }: ShowsListProps) {
  const upcomingEvents = events.filter(e => !e.isPast)
  const pastEvents = events.filter(e => e.isPast)

  return (
    <div 
      className="w-[90vw] sm:w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] h-[60vh] sm:h-[55vh] md:h-[65vh] overflow-y-scroll overflow-x-hidden pr-2 sm:pr-4 md:pr-10 pb-6 isolate"
      className="w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] max-h-[50vh] md:max-h-[65vh] overflow-y-auto pr-4 md:pr-10 pb-6"
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-12px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        visibility: isOpen ? 'visible' : 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      }}
    >
      {/* akaieuan header */}
      <a 
        href="https://ra.co/dj/akaieuan" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/40 text-xs font-medium tracking-widest uppercase hover:text-white/70 transition-colors"
      >
        akaieuan
      </a>
      
      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] text-emerald-400/70 font-medium tracking-widest uppercase mb-2">
            upcoming
          </p>
          <div className="space-y-0">
            {upcomingEvents.map((event, i) => (
              <EventItem key={i} event={event} />
            ))}
          </div>
        </div>
      )}
      
      {/* Past */}
      {pastEvents.length > 0 && (
        <div className="mt-8">
          <p className="text-[10px] text-white/25 font-medium tracking-widest uppercase mb-2">
            past
          </p>
          <div className="space-y-0">
            {pastEvents.map((event, i) => (
              <EventItem key={i} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* View all link */}
      <div className="mt-8">
        <a 
          href="https://ra.co/dj/akaieuan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/30 text-xs font-light tracking-wide hover:text-white/60 transition-colors"
        >
          view all on ra.co →
        </a>
      </div>
    </div>
  )
}

