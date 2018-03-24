import 'reflect-metadata';
import { getDatabaseConfig } from './config';
import { Server } from './server';
import { createConnection, getConnectionManager } from 'typeorm';
import logger from './logging';


async function main(): Promise<void> {
    logger.info(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

    // setup the database connection w/ our pretty logger
    const databaseConfigs = getDatabaseConfig();
    for (const databaseConfig of databaseConfigs) {
        (<any>databaseConfig.logging).logger = logger.info;
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create(databaseConfig);
        await connection.connect();
    }
    // const conection = await createConnection();
    // conection.connect();

    const server = await Server.init();
    await server.start().then(() => {
        logger.info('Server running at:', server.info.uri);
    });

    server.events.once('stop', () => {
        getConnectionManager().get().close();
    });
}

main();
