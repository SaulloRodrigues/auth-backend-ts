import { Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    data: {
        name: string,
        photo_url: string,
        created_at: string,
    },
    token: string
}