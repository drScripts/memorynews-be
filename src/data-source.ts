import { DataSource } from 'typeorm';
import { News } from './news/entities/news.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: "localhost",  // Use environment variables here
    port: 5432,
    username: "admin",
    password: "password",
    database: "memorynews",
    entities: [News], // Add your entities here
    migrations: ['src/migrations/**/*{.ts,.js}'],  // Path to migrations
    synchronize: false, // Use migrations
    logging: true, // Optional: enable SQL logging
});