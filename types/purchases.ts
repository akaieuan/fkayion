/**
 * Purchase-related type definitions.
 * Used in purchase-list and related components.
 */

export interface PurchaseItem {
  title: string
  type: 'album' | 'track' | 'merch'
  url: string
  price?: string
  image?: string
  description?: string
}

export interface PurchaseListProps {
  isOpen: boolean
  items?: PurchaseItem[]
}
