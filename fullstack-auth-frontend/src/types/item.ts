export type ItemStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface Item {
  id: string;
  title: string;
  description: string | null;
  status: ItemStatus;
  userId: string;
  user?: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
