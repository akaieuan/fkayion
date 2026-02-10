'use client'

import { useState } from 'react'
import type { Event } from '@/types'

// Combined events data - all under akaieuan
export const eventsData: Event[] = [
  // Upcoming
  { date: 'Feb 13, 2026', title: 'HeartBurn Afters by FENDER BENDER', venue: 'TBA', location: 'New York City', url: 'https://posh.vip/e/heartburn-afters-by-fender-bender', isPast: false, isTicketLink: true },
  // Past
  { date: 'Jan 30, 2026', title: 'Submerged: aka ieuan, DJ I.V., Jae Hanz', venue: 'The Crucible', location: 'Madison, WI', url: 'https://ra.co/events/2350541', isPast: true },
  { date: 'Jan 24, 2026', title: 'AGAPE PRESENTS: KUKO', venue: '154 Scott Ave', location: 'New York City', url: 'https://ra.co/dj/akaieuan/past-events', isPast: true },
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
      // Larger touch target on mobile (min 44px)
      className="block py-3 sm:py-2 -mx-2 px-2 rounded-lg transition-all duration-200 active:bg-white/5"
      style={{
        opacity: event.isPast ? 0.6 : 1,
      }}
    >
      {/* Mobile: stacked layout, Desktop: inline */}
      <div className="flex flex-col gap-0.5">
        {/* Date row */}
        <span 
          className="text-[10px] sm:text-[11px] font-light tracking-wider uppercase"
          style={{ 
            color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.2s ease-out',
          }}
        >
          {event.date}
        </span>
        
        {/* Title + venue row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span 
            className="text-[13px] sm:text-sm font-normal tracking-wide leading-snug"
            style={{ 
              color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s ease-out',
            }}
          >
            {event.title}
          </span>
          <span 
            className="text-[10px] sm:text-[11px] font-light mt-0.5 sm:mt-0"
            style={{ 
              color: isHovered ? 'rgba(68, 221, 170, 0.6)' : 'rgba(255,255,255,0.3)',
              transition: 'color 0.2s ease-out',
            }}
          >
            @ {event.venue}
          </span>
        </div>
        
        {/* Ticket badge */}
        {event.isTicketLink && !event.isPast && (
          <span className="text-[9px] sm:text-[10px] text-emerald-400/90 font-semibold tracking-wider uppercase mt-1 sm:mt-0.5">
            → TICKETS
          </span>
        )}
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
      className="w-[92vw] sm:w-[85vw] md:w-[50vw] lg:w-[45vw] max-w-[700px] h-[55vh] sm:h-[55vh] md:h-[65vh] overflow-y-auto overflow-x-hidden pr-1 sm:pr-4 md:pr-8 pb-8 isolate"
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
    >
      {/* akaieuan header - larger touch target */}
      <a 
        href="https://ra.co/dj/akaieuan" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block py-2 text-white/40 text-[11px] sm:text-xs font-medium tracking-widest uppercase hover:text-white/70 active:text-white/80 transition-colors"
      >
        akaieuan
      </a>
      
      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <div className="mt-4 sm:mt-5">
          <p className="text-[9px] sm:text-[10px] text-emerald-400/70 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
            upcoming
          </p>
          <div className="space-y-1">
            {upcomingEvents.map((event, i) => (
              <EventItem key={i} event={event} />
            ))}
          </div>
        </div>
      )}
      
      {/* Past */}
      {pastEvents.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <p className="text-[9px] sm:text-[10px] text-white/25 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
            past
          </p>
          <div className="space-y-1">
            {pastEvents.map((event, i) => (
              <EventItem key={i} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* View all link - larger touch target */}
      <div className="mt-6 sm:mt-8 pb-4">
        <a 
          href="https://ra.co/dj/akaieuan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block py-2 text-white/30 text-[11px] sm:text-xs font-light tracking-wide hover:text-white/60 active:text-white/70 transition-colors"
        >
          view all on ra.co →
        </a>
      </div>
    </div>
  )
}
