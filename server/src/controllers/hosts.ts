import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Host } from '../models/entity/host';
import { LocationSerializer } from './locations';
import { UserSerializer } from './users';
import logger from '../logging';
import { StaySerializer } from './stays';

export function HostSerializer(host: Host): Object {
    const obj = {
        id: host.id,
        name: host.name,
        description: host.description,
        away: host.away,
        photo: host.photo,
    };

    if (host.user) {
        (<any>obj).user = UserSerializer(host.user);
    }

    if (host.locations) {
        (<any>obj).locations = host.locations.map((location) => {
            return LocationSerializer(location);
        });
    }

    return obj;
}

export class HostController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new HostController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Host);
        const host = await repo.findOneById(id, { relations: [ 'user' ] });
        if (!host) {
            throw Boom.notFound();
        }

        return new JsonResponse(HostSerializer(host));
    }

    protected async put(): Promise<IHttpResponse> {
        const id = +this.request.params.id;
        const { name, description, away, photo } = <any>this.request.payload;

        // Authorization...

        const host = await Host.update(<Host>{
            id,
            name,
            description,
            away,
            photo,
        });

        return new JsonResponse(HostSerializer(host));
    }
}

export class HostListController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new HostListController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const repo = TypeOrm.getConnection().getRepository(Host);
        const hosts = await repo.find({ relations: [ 'user' ] });

        return new JsonResponse(hosts.map((entity) => {
            return HostSerializer(entity);
        }));
    }
}

export class HostLocationListController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new HostLocationListController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Host);
        const host = await repo.findOneById(id, { relations: [ 'locations' ] });
        if (!host) {
            throw Boom.notFound();
        }

        return new JsonResponse(host.locations.map((entity) => {
            return LocationSerializer(entity);
        }));
    }
}

export class HostStayController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new HostStayController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Host);
        const host = await repo.findOneById(id);
        if (!host) {
            throw Boom.notFound();
        }

        const stays = await host.stays();
        return new JsonResponse(stays.map(stay => {
            return StaySerializer(stay);
        }));
    }
}
