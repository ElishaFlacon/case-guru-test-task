import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const authHeader = request.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
            }

            const user = this.jwtService.verify(token);
            request.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
        }
    }
}