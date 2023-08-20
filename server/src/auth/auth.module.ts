import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'super-secret-key',
            signOptions: {
                expiresIn: '3h',
            }
        }),
        forwardRef(() => UsersModule),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule { }
