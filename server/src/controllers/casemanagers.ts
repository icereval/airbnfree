import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as TypeOrm from 'typeorm';
import { Controller, IHttpResponse, JsonResponse } from './base';
import { CaseManager } from '../models/entity/casemanager';
import { LocationSerializer } from './locations';
import { UserSerializer } from './users';
import logger from '../logging';

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

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new CaseManagerController(request, h).handleInternal();
    }

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
        const { felony, photo } = <any>this.request.payload;

        // Authorization...

        const caseManager = await CaseManager.update(<CaseManager>{
            id,
            photo,
        });

        return new JsonResponse(CaseManagerSerializer(caseManager));
    }
}

export class CaseManagerListController extends Controller {

    static async handler(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValue> {
        return await new CaseManagerListController(request, h).handleInternal();
    }

    protected async get(): Promise<IHttpResponse> {
        const repo = TypeOrm.getConnection().getRepository(CaseManager);
        const caseManagers = await repo.find({ relations: [ 'user' ] });

        return new JsonResponse(caseManagers.map((entity) => {
            return CaseManagerSerializer(entity);
        }));
    }
}
