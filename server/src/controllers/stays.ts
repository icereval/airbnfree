import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import logger from '../logging';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { Client } from '../models/entity/client';
import { Stay } from '../models/entity/stay';
import { LocationSerializer } from './locations';
import { ClientSerializer } from './clients';
import { User } from '../models/entity/user';
import { Location } from '../models/entity/location';
import { Host } from '../models/entity/host';

export function StaySerializer(stay: Stay): Object {
    const obj = {
        id: stay.id,
        description: stay.description,
        rooms: stay.rooms,
        state: stay.state,
    };

    if (stay.client) {
        (<any>obj).client = ClientSerializer(stay.client);
    }
    if (stay.location) {
        (<any>obj).location = LocationSerializer(stay.location);
    }

    return obj;
}

export class StayController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new StayController(request, h).handleInternal();
    }

    protected async post(): Promise<IHttpResponse> {
        const { client, location, description, rooms, state } = <any>this.request.payload;

        // Authorization...

        const entity = await Stay.create(<Stay>{
            client,
            location,
            description,
            rooms,
            state,
        });

        const repo = TypeOrm.getConnection().getRepository(Stay);
        const queryBuilder = repo.createQueryBuilder('stay')
            .innerJoinAndMapOne('stay.client', Client, 'client', 'client.id = stay.client')
            .innerJoinAndMapOne('client.user', User, 'clientUser', 'clientUser.id = client.user')
            .innerJoinAndMapOne('stay.location', Location, 'location', 'location.id = stay.location')
            .innerJoinAndMapOne('location.host', Host, 'host', 'host.id = location.host')
            .innerJoinAndMapOne('host.user', User, 'hostUser', 'hostUser.id = host.user')
            .where('stay.id = :stay')
            .setParameter('stay', entity.id);
        const stay = await queryBuilder.getOne();

        return new JsonResponse(StaySerializer(stay));
    }

    protected async put(): Promise<IHttpResponse> {
        const id = +this.request.params.id;

        // Authorization...

        const obj = <Stay>{ id };
        for (const key of Object.keys(this.request.payload)) {
            obj[key] = this.request.payload[key];
        }
        const entity = await Stay.update(obj);

        const repo = TypeOrm.getConnection().getRepository(Stay);
        const queryBuilder = repo.createQueryBuilder('stay')
            .innerJoinAndMapOne('stay.client', Client, 'client', 'client.id = stay.client')
            .innerJoinAndMapOne('client.user', User, 'clientUser', 'clientUser.id = client.user')
            .innerJoinAndMapOne('stay.location', Location, 'location', 'location.id = stay.location')
            .innerJoinAndMapOne('location.host', Host, 'host', 'host.id = location.host')
            .innerJoinAndMapOne('host.user', User, 'hostUser', 'hostUser.id = host.user')
            .where('stay.id = :stay')
            .setParameter('stay', entity.id);
        const stay = await queryBuilder.getOne();

        return new JsonResponse(StaySerializer(stay));
    }
}
