import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Session } from '../models/entity/session';
import { User } from '../models/entity/user';
import logger from '../logging';

function UserSerializer(user: User): IHttpResponse {
    return new JsonResponse({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        active: user.active,
        type: user.type,
    });
}

export class UsersController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new UsersController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(User);
        const user = await repo.findOne({ where: { id, active: true } });
        if (!user) {
            throw Boom.notFound();
        }

        return UserSerializer(user);
    }
}

export class UsersMeController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new UsersMeController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const session = <Session>this.request.auth.credentials;
        const user = session.user;

        return UserSerializer(user);
    }

    protected async put(): Promise<IHttpResponse> {
        const session = <Session>this.request.auth.credentials;
        const { email, firstName, lastName, password, photo } = <any>this.request.payload;

        const user = await User.update(<User>{
            id: session.user.id,
            email,
            firstName,
            lastName,
            password,
            photo,
        });

        return UserSerializer(user);
    }
}
