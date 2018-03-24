import * as Hapi from 'hapi';
import * as Boom from 'boom';
import logger from '../logging';

export interface IHttpResponse {
    data: any;
    code?: number;
    headers?: Map<string, string>;
    handler(h: Hapi.ResponseToolkit): Hapi.Lifecycle.ReturnValue;
}

export class HttpResponse implements IHttpResponse {

    public data: any;
    public code: number;
    public headers: Map<string, string>;

    constructor(data?: any, code?: number, headers?: Map<string, string>) {
        this.data = data || null;
        this.code = code || 200;
        this.headers = headers || new Map<string, string>();
    }

    handler(h: Hapi.ResponseToolkit): Hapi.Lifecycle.ReturnValue {
        const response = h.response(this.data);

        if (this.code !== undefined) {
            response.code(this.code);
        }

        for (const key of Array.from(this.headers.keys())) {
            response.header(key, this.headers.get(key));
        }

        return response;
    }
}

export class HttpResponseRedirect extends HttpResponse {

    public uri: string;

    constructor(uri: any) {
        super();
        this.uri = uri;
    }

    handler(h: Hapi.ResponseToolkit): Hapi.Lifecycle.ReturnValue {
        return h.redirect(this.uri);
    }
}

export class JsonResponse extends HttpResponse {}

export abstract class Controller {

    protected request: Hapi.Request;
    protected h: Hapi.ResponseToolkit;

    constructor(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        this.request = request;
        this.h = h;
    }

    protected async handleInternal(): Promise<Hapi.Lifecycle.ReturnValue> {
        const method = this.request.method;

        try {
            let response;
            if (method === 'delete') {
                response = await this.delete();
            } else if (method === 'get') {
                response = await this.get();
            } else if (method === 'patch') {
                response = await this.patch();
            } else if (method === 'post') {
                response = await this.post();
            } else if (method === 'put') {
                response = await this.put();
            } else {
                throw Boom.notImplemented();
            }

            return this.responseHandler(response);
        } catch (err) {
            logger.info('Here at the global error handler...');
            return this.errorHandler(err);
        }
    }

    protected async delete(): Promise<IHttpResponse> {
        throw Boom.notImplemented();
    }

    protected async get(): Promise<IHttpResponse> {
        throw Boom.notImplemented();
    }

    protected async patch(): Promise<IHttpResponse> {
        throw Boom.notImplemented();
    }

    protected async post(): Promise<IHttpResponse> {
        throw Boom.notImplemented();
    }

    protected async put(): Promise<IHttpResponse> {
        throw Boom.notImplemented();
    }

    private isBoomError(arg: any): arg is Boom {
        return arg.isBoom !== undefined;
    }

    private responseHandler(response: IHttpResponse): Hapi.Lifecycle.ReturnValue {
        return response.handler(this.h);
    }

    private errorHandler(e: Error): Hapi.Lifecycle.ReturnValue {
        if (this.isBoomError(e)) {
            // logger.debug(e.message, { name: e.name });
            return e;
        } else {
            // logger.error(e.message, { name: e.name, stack: e.stack });
            return Boom.boomify(e);
        }
    }
}
