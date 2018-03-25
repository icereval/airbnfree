import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { AuthLoginController, AuthLogoutController, AuthSignUpController } from './controllers/auth';
import { CaseManagerController, CaseManagerListController, CaseManagerStayController } from './controllers/casemanagers';
import { ClientController, ClientListController, ClientStayController } from './controllers/clients';
import { HostController, HostListController, HostLocationListController, HostStayController } from './controllers/hosts';
import { LocationController, LocationListController } from './controllers/locations';
import { UserController, UserMeController } from './controllers/users';
import { StayController } from './controllers/stays';

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

        server.route({ method: [ 'GET' ], path: '/casemanagers', handler: CaseManagerListController.handler, options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/casemanagers/{id}', handler: CaseManagerController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/casemanagers/{id}', handler: CaseManagerController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    photo: Joi.string(),
                }),
            },
        }});
        server.route({ method: [ 'GET' ], path: '/casemanagers/{id}/stays', handler: CaseManagerStayController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/clients', handler: ClientListController.handler, options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/clients/{id}', handler: ClientController.handler, options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/clients/{id}', handler: ClientController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    felony: Joi.boolean(),
                    photo: Joi.string(),
                }),
            },
        }});
        server.route({ method: [ 'GET' ], path: '/clients/{id}/stays', handler: ClientStayController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
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
        server.route({ method: [ 'PUT' ], path: '/hosts/{id}', handler: HostController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    name: Joi.string(),
                    description: Joi.string(),
                    away: Joi.boolean(),
                    photo: Joi.string(),
                }),
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
        server.route({ method: [ 'GET' ], path: '/hosts/{id}/stays', handler: HostStayController.handler, options: {
            auth: { mode: 'try' },
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
        server.route({ method: [ 'PUT' ], path: '/locations/{id}', handler: LocationController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    name: Joi.string(),
                    address: Joi.string(),
                    description: Joi.string(),
                    rooms: Joi.string(),
                    active: Joi.boolean(),
                    host: Joi.string(),
                    photo: Joi.string(),
                    hqs: Joi.boolean(),
                    rating: Joi.number(),
                }),
            },
        }});

        server.route({ method: [ 'POST' ], path: '/stays', handler: StayController.handler, options: {
            validate: {
                payload: Joi.object({
                    client: Joi.number().required(),
                    location: Joi.number().required(),
                    description: Joi.string().required(),
                    rooms: Joi.number().required(),
                    state: Joi.string().required(),
                }),
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/stays/{id}', handler: StayController.handler, options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    description: Joi.string(),
                    rooms: Joi.string(),
                    state: Joi.string(),
                }),
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
