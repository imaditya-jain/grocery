export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: 'admin' | 'user';
}