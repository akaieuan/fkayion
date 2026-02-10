/**
 * Event-related type definitions.
 * Used in shows-list and related components.
 */

export interface Event {
  date: string
  title: string
  venue: string
  location: string
  url: string
  isPast?: boolean
  isTicketLink?: boolean
}

export interface EventsListProps {
  isOpen: boolean
  events?: Event[]
}
