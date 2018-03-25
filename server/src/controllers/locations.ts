import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Location } from '../models/entity/location';
import { Session } from '../models/entity/session';
import { HostSerializer } from './hosts';
import logger from '../logging';
import { Validator } from 'class-validator';

export function LocationSerializer(location: Location): Object {
    const obj = {
        id: location.id,
        name: location.name,
        address: location.address,
        description: location.description,
        active: location.active,
        photo: location.photo,
        hqs: location.hqs,
    };

    if (location.host) {
        (<any>obj).host = HostSerializer(location.host);
    }

    return obj;
}

export class LocationController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new LocationController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(Location);
        const location = await repo.findOneById(id, { relations: [ 'host' ] });
        if (!location) {
            throw Boom.notFound();
        }

        return new JsonResponse(LocationSerializer(location));
    }

    protected async put(): Promise<IHttpResponse> {
        const id = +this.request.params.id;
        const { name, address, description, rooms, active, photo, hqs } = <any>this.request.payload;

        // const session = <Session>this.request.auth.credentials;
        // const repo = TypeOrm.getConnection().getRepository(Location);
        // if (!await repo.count({ where: { id, host: { user: session.user } }, take: 1 })) {
        //     throw Boom.forbidden();
        // }

        const location = await Location.update(<Location>{
            id,
            name,
            address,
            description,
            rooms,
            active,
            photo,
            hqs,
        });

        return new JsonResponse(LocationSerializer(location));
    }
}

export class LocationListController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new LocationListController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const repo = TypeOrm.getConnection().getRepository(Location);
        const locations = await repo.find({ relations: [ 'host' ] });

        return new JsonResponse(locations.map((entity) => {
            return LocationSerializer(entity);
        }));
    }

    protected async post(): Promise<IHttpResponse> {
        const { host, name, address, description, rooms, active, photo, hqs } = <any>this.request.payload;
        const session = <Session>this.request.auth.credentials;

        // const validator = new Validator();
        // if (!validator.isIn(session.user.type, ['casemanager', 'host'])) {
        //     throw Boom.forbidden('Invalid User Type');
        // }
        // if (!validator.equals(session.user.type, 'casemanager') && !validator.equals(+host, (await session.user.host).id)) {
        //     throw Boom.forbidden();
        // }

        const location = await Location.create(<Location>{
            host,
            name,
            address,
            description,
            rooms,
            active,
            photo,
            hqs,
        });

        return new JsonResponse(LocationSerializer(location));
    }
}
