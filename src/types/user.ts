export type User = {
    name:string,
    surname:string,
    email:string,
    favorites: [string],
}

export type AuthInfo = {
    email:string,
    password:string,
}

export type RegisterData ={
    email:string,
    password:string,
    name:string,
    surname:string,
}

export type SuccessfulResult = {
    result:boolean,
}