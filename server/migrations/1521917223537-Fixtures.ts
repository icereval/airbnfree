import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/models/entity/user';

export class Fixtures1521917223537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const password = 'w69zwqlwwrTDscOqLXzCqXJowoAzOmLDusOWXEctaMKSw5fCtMOyw6nDucKZUMK3FsO/R0x1UXRnJGjDl8Oqw45iw4jCuyVzw5EoVHlNDsKdP2TCqMONw7jDtmF/';
        await queryRunner.query(`
            INSERT INTO "user" (email, password, "firstName", "lastName", active, type) VALUES
                ('fakecm@test.com', $1, 'Fake', 'Case Manager', TRUE, 'casemanager')
                , ('fakehost@test.com', $1, 'Fake', 'Host', TRUE, 'host')
                , ('fakeclient1@test.com', $1, 'Fake', 'Client 1', TRUE, 'user')
                , ('fakeclient2@test.com', $1, 'Fake', 'Client 2', TRUE, 'user')
            ;
        `, [ Buffer.from(password, 'base64').toString('utf8') ]);

        await queryRunner.query(`
            INSERT INTO "case_manager" (photo, "userId") VALUES
                ('photo...', 1)
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "client" (felony, photo, "userId") VALUES
                (TRUE, 'photo...', 3)
                , (FALSE, 'photo...', 4)
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "host" (name, description, "userId", away, photo) VALUES
                ('Host 1', 'tbd...', 2, FALSE, 'photo...')
                , ('Host 2', 'tbd...', 2, FALSE, 'photo...')
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "location" (name, address, description, rooms, active, "hostId", photo, hqs) VALUES
                ('First House', '1 Lala Ln', 'A House', 3, TRUE, 1, 'photo...', TRUE)
                , ('Second Condo', '2 Lala Ln', 'A Condo', 1, TRUE, 1, 'photo...', FALSE)
                , ('Third Apartment', '3 Lala Ln', 'An Apartment', 2, TRUE, 2, 'photo...', TRUE)
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "stay" (state, "locationId", "clientId", description, rooms) VALUES
                ('client-requested', 1, 1, 'needs a room', 1)
                , ('host-approved', 2, 2, 'needs a room', 1)
            ;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "stay";`);
        await queryRunner.query(`DELETE FROM "location";`);
        await queryRunner.query(`DELETE FROM "host";`);
        await queryRunner.query(`DELETE FROM "client";`);
        await queryRunner.query(`DELETE FROM "case_manager";`);
        await queryRunner.query(`DELETE FROM "user";`);
    }
}
