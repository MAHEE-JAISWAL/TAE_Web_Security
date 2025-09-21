import { DB_HOST,DB_DATABASE,DB_PASSWORD,DB_PORT,DB_USER,DB_SYNC } from "@/config";
import { UserEntity } from "@/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

const dbConfig: DataSourceOptions = {
    type: 'postgres',
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_DATABASE,
    synchronize: Boolean(DB_SYNC),
    logging: false,
    entities:[UserEntity]
  };
    
export const AppDataSource = new DataSource(dbConfig);