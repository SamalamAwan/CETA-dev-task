export interface User {
    id: string;
    name: string;
    email: string;
    address: any;
    website: string;
}

export interface Address {
    suite: string;
    street: string;
    city: string;
    zipcode: string;
}