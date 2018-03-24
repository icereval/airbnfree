import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import Session from '../models/entity/session';
import User from '../models/entity/user';
import logger from '../logging';

function UserSerializer(user: User): IHttpResponse {
    return new JsonResponse({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
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
        try {
            const user = await repo.findOne({ where: { id, active: true } });
            if (!user) {
                throw Boom.notFound();
            }

            return UserSerializer(user);
        } catch (err) {
            logger.error(err);
        }
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
        const { firstName, lastName, password } = <any>this.request.payload;

        const user = await User.update(<User>{
            id: session.user.id,
            firstName,
            lastName,
            password,
        });

        return UserSerializer(user);
    }
}

export default UsersController;
