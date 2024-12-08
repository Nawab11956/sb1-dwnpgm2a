export interface Room {
  id: string;
  name: string;
  description: string;
  participants: string[];
  createdAt: Date;
  isActive: boolean;
}