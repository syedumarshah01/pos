import path from 'path';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({path: path.resolve('./config/.env')}) // You gotta specify the path if your .env
                                                     // file resides in another directory.


export const CONN = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'inventory'
})

