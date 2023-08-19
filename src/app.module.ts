import { Module } from '@nestjs/common';
import { Config } from './config';
import { Database } from './database';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers: [],
    providers: [],
    imports: [
        Config,
        Database,
        JwtModule,
        UsersModule,
        AuthModule,
    ],
})
export class AppModule { }
