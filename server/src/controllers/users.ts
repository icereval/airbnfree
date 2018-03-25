import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Session } from '../models/entity/session';
import { User } from '../models/entity/user';
import logger from '../logging';

export function UserSerializer(user: User): Object {
    const obj = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        type: user.type,
    };

    return obj;
}

export class UserController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new UserController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(User);
        const user = await repo.findOne({ where: { id, active: true } });
        if (!user) {
            throw Boom.notFound();
        }

        return new JsonResponse(UserSerializer(user));
    }
}

export class UserMeController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new UserMeController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const session = <Session>this.request.auth.credentials;
        const user = session.user;

        return new JsonResponse(UserSerializer(user));
    }

    protected async put(): Promise<IHttpResponse> {
        const session = <Session>this.request.auth.credentials;
        const { email, password, firstName, lastName } = <any>this.request.payload;

        const user = await User.update(<User>{
            id: session.user.id,
            email,
            firstName,
            lastName,
            password,
        });

        return new JsonResponse(UserSerializer(user));
    }
}
