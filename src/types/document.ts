export interface DocumentType {
  id: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: string;
}

export type Responses = {
  success: boolean;
  data?: DocumentType[];
  message?: string;
};