import * as Hapi from 'hapi';
import * as good from 'good';
import logger from '../logging';


export default class GoodPlugin {
    public static async register(server: Hapi.Server): Promise<void> {
        try {
            await server.register({
                plugin: good,
                options: {
                    ops: {
                        interval: 1000,
                    },
                    reporters: {
                        consoleReporter: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ error: '*', log: '*', response: '*', request: '*' }],
                            },
                            {
                                module: 'good-console',
                                args: [{format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'}],
                            },
                            'stdout',
                        ],
                    },
                },
            });
        } catch(err) {
            logger.error(`Error registering good plugin: ${err}`);
            throw err;
        }

        logger.info('Loaded plugin: good');
    }
}
