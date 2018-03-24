import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, HttpResponseRedirect, JsonResponse } from './base';
import { Session } from '../models/entity/session';
import { User } from '../models/entity/user';
import logger from '../logging';
import config from '../config';
import { UserSerializer } from './users';

export class AuthLoginController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new AuthLoginController(request, h).handleInternal();
    }

    protected async post(): Promise<IHttpResponse> {
        const { email, password } = <any>this.request.params;

        const user = await (async () => {
            try {
                return await User.verify(email, password);
            } catch (e) {
                throw Boom.unauthorized();
            }
        })();

        if (!user.active) {
            throw Boom.unauthorized();
        }

        const session = await Session.create(user);
        (<any>this.request).cookieAuth.set({ id: session.id });

        return new JsonResponse(UserSerializer(user));
    }
}

export class AuthLogoutController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new AuthLogoutController(request, h).handleInternal();
    }

    protected async delete(): Promise<IHttpResponse> {
        // TODO: cleanup session data
        (<any>this.request).cookieAuth.clear();
        return new JsonResponse({ success: true });
    }
}

export class AuthSignUpController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new AuthSignUpController(request, h).handleInternal();
    }

    protected async post(): Promise<IHttpResponse> {
        const { email, password, firstName, lastName } = <any>this.request.params;

        const user = await User.create(<User>{
            email,
            password,
            firstName,
            lastName,
        });

        const session = await Session.create(user);
        (<any>this.request).cookieAuth.set({ id: session.id });

        return new JsonResponse(UserSerializer(user));
    }
}
