import * as Hapi from 'hapi';
import GoodPlugin from './plugins/good';
import AuthCookiePlugin from './plugins/auth-cookie';
import Routes from './routes';
import config from './config';

export class Server {
    public static async init(): Promise<Hapi.Server> {
        const server = new Hapi.Server({
            host: config.get('server:host'),
            port: config.get('server:port'),
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true,
            },
            routes: {
                cors: config.get('server:routes:cors'),
            },
        });

        await GoodPlugin.register(server);
        await AuthCookiePlugin.register(server);

        await Routes.init(server);

        return server;
    }
}
