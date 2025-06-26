import { MONGODB } from "../utils/secret";
import db_connect from "../utils/db_connect";

// Connection

const DB_URI = `mongodb+srv://${MONGODB.USER}:${MONGODB.PASSWORD}@${MONGODB.HOST}/${MONGODB.NAME}?retryWrites=true&w=majority&appName=${MONGODB.APPNAME}`;

const options = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };
  
console.log("Connecting to MongoDB...", DB_URI);
console.log(`Using Mongo URI: ${process.env.MONGODB_URI}`);

db_connect(DB_URI, options);

