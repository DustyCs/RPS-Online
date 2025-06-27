"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_1 = require("../utils/secret");
const db_connect_1 = __importDefault(require("../utils/db_connect"));
// Connection
const DB_URI = `mongodb+srv://${secret_1.MONGODB.USER}:${secret_1.MONGODB.PASSWORD}@${secret_1.MONGODB.HOST}/${secret_1.MONGODB.NAME}?retryWrites=true&w=majority&appName=${secret_1.MONGODB.APPNAME}`;
const options = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};
console.log("Connecting to MongoDB...", DB_URI);
console.log(`Using Mongo URI: ${process.env.MONGODB_URI}`);
(0, db_connect_1.default)(DB_URI, options);
