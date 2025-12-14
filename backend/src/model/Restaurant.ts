import { Schema, model, Document } from "mongoose";


export interface RestaurantDocument extends Document {
    name: string;
    cuisine: string;
    address: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}


const RestaurantSchema = new Schema<RestaurantDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        cuisine: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);


const RestaurantModel = model<RestaurantDocument>(
    "Restaurant",
    RestaurantSchema
);

export default RestaurantModel;
