import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Location } from '../models/entity/location';
import { HostSerializer } from './hosts';
import logger from '../logging';

export function LocationSerializer(location: Location): Object {
    const obj = {
        id: location.id,
        name: location.name,
        address: location.address,
        description: location.description,
        active: location.active,
        photo: location.photo,
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
}
