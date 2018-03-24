import * as hapi from 'hapi';
import * as hapiAuthCookie from 'hapi-auth-cookie';
import * as moment from 'moment';
import * as TypeOrm from 'typeorm';
import logger from '../logging';
import config from '../config';
import { Session } from '../models/entity/session';
import { User } from '../models/entity/user';

export default class AuthCookiePlugin {
    public static async register(server: hapi.Server): Promise<void> {
        try {
            await server.register({
                plugin: hapiAuthCookie,
            });
        } catch (err) {
            logger.error(`Error registering auth-cookie plugin: ${err}`);
            throw err;
        }

        server.auth.strategy('session', 'cookie', {
            cookie: config.get('app:cookie_name'),
            password: config.get('app:cookie_secret'),
            isSecure: false,
            ttl: moment().add(config.get('app:cookie_expiration'), 'days').valueOf(),
            validateFunc: async (request, session) => {
                try {
                    const entity = await TypeOrm.getConnection()
                        .getRepository(Session)
                        .createQueryBuilder('session')
                        .innerJoinAndMapOne('session.user', User, 'user', 'user.id=session.user')
                        .where('session.id = :id')
                        .setParameter('id', session.id)
                        .getOne();

                    if (!entity) {
                        logger.debug('session.id %d could not be found', session.id);
                        return { value: false };
                    }

                    logger.debug('session.id %d loaded', session.id);
                    return { value: true, credentials: entity };
                } catch (err) {
                    return { value: false };
                }
            },
        });

        server.auth.default({ strategy: 'session', mode: 'try' });

        logger.info('Loaded plugin: auth-cookie');
    }
}
