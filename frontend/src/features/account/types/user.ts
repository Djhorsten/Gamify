export interface User {
  id: number;
  name: string;
  email: string;
  address: string | null;
  postalCode: string | null;
  city: string | null;
}

export interface UpdateAccountInput {
  name?: string;
  email?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}
