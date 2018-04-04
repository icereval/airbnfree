import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { CaseManager } from '../models/entity/casemanager';
import { LocationSerializer } from './locations';
import { UserSerializer } from './users';
import logger from '../logging';
import { StaySerializer } from './stays';

export function CaseManagerSerializer(caseManager: CaseManager): Object {
    const obj = {
        id: caseManager.id,
        photo: caseManager.photo,
    };

    if (caseManager.user) {
        (<any>obj).user = UserSerializer(caseManager.user);
    }

    return obj;
}

export class CaseManagerController extends Controller {

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(CaseManager);
        const host = await repo.findOneById(id, { relations: [ 'user' ] });
        if (!host) {
            throw Boom.notFound();
        }

        return new JsonResponse(CaseManagerSerializer(host));
    }

    protected async put(): Promise<IHttpResponse> {
        const id = +this.request.params.id;
        const { photo } = <any>this.request.payload;

        // Authorization...

        const caseManager = await CaseManager.update(<CaseManager>{
            id,
            photo,
        });

        return new JsonResponse(CaseManagerSerializer(caseManager));
    }
}

export class CaseManagerListController extends Controller {

    protected async get(): Promise<IHttpResponse> {
        const repo = TypeOrm.getConnection().getRepository(CaseManager);
        const caseManagers = await repo.find({ relations: [ 'user' ] });

        return new JsonResponse(caseManagers.map((entity) => {
            return CaseManagerSerializer(entity);
        }));
    }
}

export class CaseManagerStayController extends Controller {

    protected async get(): Promise<IHttpResponse> {
        const id = this.request.params.id;

        const repo = TypeOrm.getConnection().getRepository(CaseManager);
        const caseManager = await repo.findOneById(id);
        if (!caseManager) {
            throw Boom.notFound();
        }

        const stays = await caseManager.stays();
        return new JsonResponse(stays.map(stay => {
            return StaySerializer(stay);
        }));
    }
}
