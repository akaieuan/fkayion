export type ViewMode = 'home' | 'annotate' | 'workspace';

export type RightTab = 'human' | 'search' | 'read' | 'write' | 'notes';
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
