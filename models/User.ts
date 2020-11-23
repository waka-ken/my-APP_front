export interface IUser {
    id: number;
    name: string;
    password: string;
    age: number;
}

export interface ICreateUserDTO {
    name: string;
    password: string;
    age: number | null;
}
