export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

export enum USER_ROLES{
    ADMIN, 
    MANAGER,
    STAFF,
    USER
}

export const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "password";