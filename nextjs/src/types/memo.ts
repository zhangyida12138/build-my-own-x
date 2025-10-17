export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface CreateMemoRequest {
  title: string;
  content: string;
  tags?: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateMemoRequest extends Partial<CreateMemoRequest> {
  id: string;
}
