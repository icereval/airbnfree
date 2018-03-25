import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Session } from '../models/entity/session';
import { User } from '../models/entity/user';
import logger from '../logging';
import { CaseManagerSerializer } from './casemanagers';
import { HostSerializer } from './hosts';
import { ClientSerializer } from './clients';

export function UserSerializer(user: User): Object {
    const obj = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        type: user.type,
    };

    if (user.client) {
        (<any>obj).client = ClientSerializer(user.client);
    }
    if (user.host) {
        (<any>obj).host = HostSerializer(user.host);
    }
    if (user.caseManager) {
        (<any>obj).casemanager = CaseManagerSerializer(user.caseManager);
    }

    return obj;
}

export class UserController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new UserController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(User);
        const user = await repo.findOne({ where: { id, active: true }, relations: [ 'client', 'host', 'caseManager' ] });
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

        const repo = TypeOrm.getConnection().getRepository(User);
        const user = await repo.findOneById(session.user, { relations: [ 'client', 'host', 'caseManager' ] });

        return new JsonResponse(UserSerializer(user));
    }

    protected async put(): Promise<IHttpResponse> {
        const session = <Session>this.request.auth.credentials;
        const { email, password, firstName, lastName } = <any>this.request.payload;

        const entity = await User.update(<User>{
            id: session.user.id,
            email,
            firstName,
            lastName,
            password,
        });

        const repo = TypeOrm.getConnection().getRepository(User);
        const user = await repo.findOneById(entity, { relations: [ 'client', 'host', 'caseManager' ] });

        return new JsonResponse(UserSerializer(user));
    }
}
