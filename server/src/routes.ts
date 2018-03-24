import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { AuthLoginController, AuthLogoutController, AuthSignUpController } from './controllers/auth';
import { HostController, HostListController, HostLocationListController } from './controllers/hosts';
import { LocationController, LocationListController } from './controllers/locations';
import { UserController, UserMeController } from './controllers/users';

export default class Routes {

    public static async init(server: Hapi.Server): Promise<void> {
        server.route({ method: [ 'POST' ], path: '/login', handler: AuthLoginController.handler, options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
        }});
        server.route({ method: [ 'DELETE' ], path: '/logout', handler: AuthLogoutController.handler });
        server.route({ method: [ 'POST' ], path: '/signup', handler: AuthSignUpController.handler, options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    type: Joi.string().required(),
                }),
            },
        }});

        server.route({ method: [ 'GET' ], path: '/hosts', handler: HostListController.handler, options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/hosts/{id}', handler: HostController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'GET' ], path: '/hosts/{id}/locations', handler: HostLocationListController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/locations', handler: LocationListController.handler, options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/locations/{id}', handler: LocationController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/users/me', handler: UserMeController.handler, options: { auth: { mode: 'required' } } });
        server.route({ method: [ 'PUT' ], path: '/users/me', handler: UserMeController.handler, options: {
            auth: { mode: 'required' },
            validate: {
                payload: Joi.object({
                    email: Joi.string(),
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    photo: Joi.string(),
                    active: Joi.boolean(),
                    password: Joi.string(),
                }),
            },
        }});
        server.route({ method: [ 'GET' ], path: '/users/{id}', handler: UserController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
    }
}
