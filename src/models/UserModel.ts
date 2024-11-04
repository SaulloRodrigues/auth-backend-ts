import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/User.js";

const userSchema: Schema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    data: {
        name: {type: String, required: true},
        photo_url: {type: String, required: false},
        created_at: {type: String, required: false}
    },
    token: {type: String, required: false}
})

export const User = mongoose.model<IUser>('User', userSchema);