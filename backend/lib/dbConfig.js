import mongoose from 'mongoose';

export const dbConfig = async() => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log('Connected to DATABASE');
        console.log(conn.connection.host);
        

    } catch (error) {
        console.log('database error');
        console.log(error);
        
    }
}