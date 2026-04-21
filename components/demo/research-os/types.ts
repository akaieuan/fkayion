export type ViewMode = 'home' | 'annotate' | 'workspace';
export type RightTab = 'human' | 'library' | 'search' | 'read' | 'write' | 'notes';

/** Shared labels for right stack tabs (menu + tab bar) */
export const RIGHT_PANEL_TABS: { id: RightTab; label: string }[] = [
  { id: 'human', label: 'Human' },
  { id: 'library', label: 'Library' },
  { id: 'search', label: 'Search' },
  { id: 'read', label: 'Read' },
  { id: 'write', label: 'Write' },
  { id: 'notes', label: 'All Notes' },
];
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type HitlCardState = 'idle' | 'expanded' | 'confirmed' | 'dismissed';
export type AgentStatus = 'idle' | 'running' | 'completed' | 'error' | 'skipped' | 'cancelled';

export interface Workspace {
  id: string;
  name: string;
  files: number;
  color: string;
}

export interface RecentChat {
  title: string;
  ws?: string;
  time: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'note';
  children?: FileNode[];
}
