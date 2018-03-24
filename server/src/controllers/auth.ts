import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, HttpResponseRedirect, JsonResponse } from './base';
import Session from '../models/entity/session';
import User from '../models/entity/user';
import logger from '../logging';
import config from '../config';


export class AuthLoginController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new AuthLoginController(request, h).handleInternal();
    }

    protected async post(): Promise<IHttpResponse> {
        const { username, password } = <any>this.request.params;

        let user: User;
        try {
            user = await User.verify(username, password);
        } catch (e) {
            throw Boom.unauthorized();
        }

        if (!user.active) {
            throw Boom.unauthorized();
        }

        const session = await Session.create(user);
        (<any>this.request).cookieAuth.set({ id: session.id });

        return new JsonResponse({
            id: user.id,
            fullname: user.fullname,
            active: user.active,
        });
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
        const { username, password, fullname } = <any>this.request.params;

        const user = await User.create(<User>{
            username,
            password,
            fullname,
        });

        const session = await Session.create(user);
        (<any>this.request).cookieAuth.set({ id: session.id });

        return new JsonResponse({
            id: user.id,
            fullname: user.fullname,
            active: user.active,
        });
    }
}
