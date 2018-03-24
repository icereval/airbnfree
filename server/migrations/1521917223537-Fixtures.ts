import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fixtures1521917223537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "user" (username, password, firstname, lastname, active, type) VALUES
                ('fakecm', 'tbd...', 'fake', 'cm', TRUE, 'casemanager'),
                ('fakehost', 'tbd...', 'fake', 'host', TRUE, 'host'),
                ('fakeclient', 'tbd...', 'fake', 'client', TRUE, 'user');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "user";`);
    }
}
