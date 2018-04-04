import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { Controller } from './controllers/base';
import { AuthLoginController, AuthLogoutController, AuthSignUpController } from './controllers/auth';
import { CaseManagerController, CaseManagerListController, CaseManagerStayController } from './controllers/casemanagers';
import { ClientController, ClientListController, ClientStayController } from './controllers/clients';
import { HostController, HostListController, HostLocationListController, HostStayController } from './controllers/hosts';
import { LocationController, LocationListController } from './controllers/locations';
import { UserController, UserMeController } from './controllers/users';
import { StayController } from './controllers/stays';

export default class Routes {

    public static async init(server: Hapi.Server): Promise<void> {
        server.route({ method: [ 'POST' ], path: '/login', handler: Controller.handler(AuthLoginController), options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
        }});
        server.route({ method: [ 'DELETE' ], path: '/logout', handler: Controller.handler(AuthLogoutController) });
        server.route({ method: [ 'POST' ], path: '/signup', handler: Controller.handler(AuthSignUpController), options: {
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

        server.route({ method: [ 'GET' ], path: '/casemanagers', handler: Controller.handler(CaseManagerListController), options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/casemanagers/{id}', handler: Controller.handler(CaseManagerController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/casemanagers/{id}', handler: Controller.handler(CaseManagerController), options: {
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
        server.route({ method: [ 'GET' ], path: '/casemanagers/{id}/stays', handler: Controller.handler(CaseManagerStayController), options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/clients', handler: Controller.handler(ClientListController), options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/clients/{id}', handler: Controller.handler(ClientController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/clients/{id}', handler: Controller.handler(ClientController), options: {
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
        server.route({ method: [ 'GET' ], path: '/clients/{id}/stays', handler: Controller.handler(ClientStayController), options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/hosts', handler: Controller.handler(HostListController), options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/hosts/{id}', handler: Controller.handler(HostController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/hosts/{id}', handler: Controller.handler(HostController), options: {
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
        server.route({ method: [ 'GET' ], path: '/hosts/{id}/locations', handler: Controller.handler(HostLocationListController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'GET' ], path: '/hosts/{id}/stays', handler: Controller.handler(HostStayController), options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});

        server.route({ method: [ 'GET' ], path: '/locations', handler: Controller.handler(LocationListController), options: { auth: { mode: 'try' } } });
        server.route({ method: [ 'GET' ], path: '/locations/{id}', handler: Controller.handler(LocationController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
        server.route({ method: [ 'PUT' ], path: '/locations/{id}', handler: Controller.handler(LocationController), options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    name: Joi.string(),
                    address: Joi.string(),
                    description: Joi.string(),
                    rooms: Joi.number(),
                    active: Joi.boolean(),
                    host: Joi.number(),
                    photo: Joi.string(),
                    hqs: Joi.boolean(),
                    rating: Joi.number(),
                }),
            },
        }});

        server.route({ method: [ 'POST' ], path: '/stays', handler: Controller.handler(StayController), options: {
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
        server.route({ method: [ 'PUT' ], path: '/stays/{id}', handler: Controller.handler(StayController), options: {
            auth: { mode: 'try' },
            validate: {
                params: {
                    id: Joi.number().required(),
                },
                payload: Joi.object({
                    description: Joi.string(),
                    rooms: Joi.number(),
                    state: Joi.string(),
                }),
            },
        }});

        server.route({ method: [ 'GET' ], path: '/users/me', handler: Controller.handler(UserMeController), options: { auth: { mode: 'required' } } });
        server.route({ method: [ 'PUT' ], path: '/users/me', handler: Controller.handler(UserMeController), options: {
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
        server.route({ method: [ 'GET' ], path: '/users/{id}', handler: Controller.handler(UserController), options: {
            auth: { mode: 'try' },  // required
            validate: {
                params: {
                    id: Joi.number().required(),
                },
            },
        }});
    }
}
