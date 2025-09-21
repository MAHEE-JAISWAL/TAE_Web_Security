export interface IUser {
    userId?: number;
    userName: string;
    password: string;
    email: string,
    name: string,
    gender: string,
    dob?: Date;
    phone: string,
    createdAt?: Date;
}

export interface IUserDetails{
    email: string,
    password:string
}