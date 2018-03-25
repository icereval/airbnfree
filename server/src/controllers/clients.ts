import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Client } from '../models/entity/client';
import { UserSerializer } from './users';
import logger from '../logging';
import { Stay } from '../models/entity/stay';
import { LocationSerializer } from './locations';
import { StaySerializer } from './stays';

export function ClientSerializer(client: Client): Object {
    const obj = {
        id: client.id,
        felony: client.felony,
        photo: client.photo,
    };

    if (client.user) {
        (<any>obj).user = UserSerializer(client.user);
    }

    return obj;
}

export class ClientController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new ClientController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Client);
        const client = await repo.findOneById(id, { relations: [ 'user' ] });
        if (!client) {
            throw Boom.notFound();
        }

        return new JsonResponse(ClientSerializer(client));
    }

    protected async put(): Promise<IHttpResponse> {
        const id = +this.request.params.id;
        const { felony, photo } = <any>this.request.payload;

        // Authorization...

        const client = await Client.update(<Client>{
            id,
            felony,
            photo,
        });

        return new JsonResponse(ClientSerializer(client));
    }
}

export class ClientListController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new ClientListController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const repo = TypeOrm.getConnection().getRepository(Client);
        const clients = await repo.find({ relations: [ 'user' ] });

        return new JsonResponse(clients.map((entity) => {
            return ClientSerializer(entity);
        }));
    }
}

export class ClientStayController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new ClientStayController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Client);
        const client = await repo.findOneById(id);
        if (!client) {
            throw Boom.notFound();
        }

        const stays = await client.stays();
        return new JsonResponse(stays.map(stay => {
            return StaySerializer(stay);
        }));
    }

    // protected async put(): Promise<IHttpResponse> {
    //     const id = +this.request.params.id;
    //     const { felony, photo } = <any>this.request.payload;

    //     // Authorization...

    //     const client = await Client.update(<Client>{
    //         id,
    //         felony,
    //         photo,
    //     });

    //     return new JsonResponse(ClientSerializer(client));
    // }
}
