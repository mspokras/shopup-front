export interface IProduct {
  primImage: any;
  secImages?: any;
  desc?: string;
  title: string;
  price: number;
  id?: number;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
}