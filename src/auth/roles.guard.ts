import { CanActivate, ExecutionContext, UnauthorizedException, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!allowedRoles) {
                return true;
            }

            const request = context.switchToHttp().getRequest();

            const authHeader = request.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
            }

            const user = this.jwtService.verify(token);
            request.user = user;

            return allowedRoles.includes(user.role);
        } catch (error) {
            throw new HttpException('Доступ запрещен!', HttpStatus.FORBIDDEN);
        }
    }
}