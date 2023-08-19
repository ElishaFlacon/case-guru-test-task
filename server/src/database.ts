import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/users.model';


export const Database = SequelizeModule.forRoot({
    dialect: 'mysql',

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    autoLoadModels: true,
    models: [UserModel],
});