import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fixtures1521917223537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "user" (email, password, "firstName", "lastName", active, type, photo) VALUES
                ('fakecm@test.com', 'password...', 'Fake', 'Case Manager', TRUE, 'casemanager', 'photo...')
                , ('fakehost@test.com', 'password...', 'Fake', 'Host', TRUE, 'host', 'photo...')
                , ('fakeclient1@test.com', 'password...', 'Fake', 'Client 1', TRUE, 'user', 'photo...')
                , ('fakeclient2@test.com', 'password...', 'Fake', 'Client 2', TRUE, 'user', 'photo...')
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "host" (name, description, "userId", away, photo) VALUES
                ('Host 1', 'tbd...', 2, FALSE, 'photo...')
                , ('Host 2', 'tbd...', 2, FALSE, 'photo...')
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "client" (felony, "userId") VALUES
                (TRUE, 3)
                , (FALSE, 4)
            ;
        `);

        await queryRunner.query(`
            INSERT INTO "location" (name, address, description, rooms, active, "hostId", photo) VALUES
                ('First House', '1 Lala Ln', 'A House', 3, TRUE, 1, 'photo...')
                , ('Second Condo', '2 Lala Ln', 'A Condo', 1, TRUE, 1, 'photo...')
                , ('Third Apartment', '3 Lala Ln', 'An Apartment', 2, TRUE, 2, 'photo...')
            ;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "user";`);
        await queryRunner.query(`DELETE FROM "client";`);
        await queryRunner.query(`DELETE FROM "host";`);
        await queryRunner.query(`DELETE FROM "location";`);
    }
}
