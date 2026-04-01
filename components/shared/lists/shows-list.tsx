'use client'

import { useState } from 'react'
import type { Event } from '@/types'
import { fourUhScrollPanelClass, fourUhSectionLabelAccent, fourUhSectionLabelMuted } from './four-uh-shared'
import { onFourUhPanelWheel } from './four-uh-wheel'

export const eventsData: Event[] = [
  { date: 'Apr 21, 2026', title: 'DIFFÜSION VOL 002', venue: 'TBA', location: 'TBA', url: 'https://ra.co/events/2388618', isPast: false, isTicketLink: true },
  { date: 'Mar 21, 2026', title: 'LEGA AT RAW AREA', venue: 'Raw Area', location: 'TBA', url: 'https://ra.co/events/2377939', isPast: true },
  { date: 'Feb 13, 2026', title: 'HeartBurn Afters by FENDER BENDER', venue: 'TBA', location: 'New York City', url: 'https://posh.vip/e/heartburn-afters-by-fender-bender', isPast: true },
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
      className="block py-1.5"
      style={{ opacity: event.isPast ? 0.55 : 1 }}
    >
      <div className="flex flex-col gap-0">
        <span
          className="text-[9px] font-light tracking-wide text-muted-foreground/60"
          style={{ color: isHovered ? '#44ddaa' : undefined }}
        >
          {event.date}
        </span>
        <span
          className="text-[11px] font-normal leading-snug text-foreground/85"
          style={{ color: isHovered ? '#44ddaa' : undefined }}
        >
          {event.title}
        </span>
        <span
          className="text-[9px] font-light text-muted-foreground/50"
          style={{ color: isHovered ? 'rgba(68,221,170,0.55)' : undefined }}
        >
          @ {event.venue}
        </span>
        {event.isTicketLink && !event.isPast && (
          <span className="text-[8px] font-medium uppercase tracking-wide text-emerald-400/90">Tickets →</span>
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
      data-four-uh-scroll=""
      className={fourUhScrollPanelClass}
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-8px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        visibility: isOpen ? 'visible' : 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onWheel={onFourUhPanelWheel}
    >
      <a
        href="https://ra.co/dj/akaieuan"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[9px] font-medium tracking-widest text-muted-foreground/60 uppercase hover:text-foreground/60"
      >
        akaieuan
      </a>

      {upcomingEvents.length > 0 && (
        <div className="mt-2">
          <p className={fourUhSectionLabelAccent}>Upcoming</p>
          <div className="divide-y divide-border">
            {upcomingEvents.map((event, i) => (
              <EventItem key={`u-${i}`} event={event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mt-3">
          <p className={fourUhSectionLabelMuted}>Past</p>
          <div className="divide-y divide-border">
            {pastEvents.map((event, i) => (
              <EventItem key={`p-${i}`} event={event} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-3">
        <a
          href="https://ra.co/dj/akaieuan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-light text-muted-foreground/50 hover:text-foreground/50"
        >
          All on RA →
        </a>
      </div>
    </div>
  )
}
