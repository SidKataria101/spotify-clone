import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class ArtistJwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
    handleRequest<TUser = any>(
        err: any, 
        user: any, 
        info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            console.log("1");
            throw err || new UnauthorizedException();
        }
        if (!user.artistId) {
            console.log("2");
            throw new UnauthorizedException();
        }
        return user;
    }
}