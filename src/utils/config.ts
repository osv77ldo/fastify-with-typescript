import * as dotenv from "dotenv";

dotenv.config();

const path = `${__dirname}/../.env`;

dotenv.config({ path: path });

export const APP_PORT = process.env.APP_PORT;
export const MONGO_URI = process.env.MONGO_URI;