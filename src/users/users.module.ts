import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UserModel]),
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule { }
