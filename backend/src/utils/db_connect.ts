import mongoose from "mongoose";


const cleanShutdown = async () => {
    console.log('Mongoose default connection disconnected through app termination');
    await mongoose.connection.close();
    process.exit(0);
}

const db_connect = (URI: string, options?: object) => {
  mongoose.connect(URI, options)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected');
  });

    process.on('SIGINT', cleanShutdown);
    process.on('SIGTERM', cleanShutdown);
};

export default db_connect;