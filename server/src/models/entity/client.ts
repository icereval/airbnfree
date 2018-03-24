import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from './user';
import config from '../../config';
import logger from '../../logging';
import { isBoolean } from 'util';

@Entity()
export class Client {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('boolean')
    @IsBoolean()
    felony: boolean;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    static async create(client: Client): Promise<Client> {
        const repo = getConnection().getRepository(Client);
        const entity = repo.create(client);

        return await repo.save(entity);
    }

    static async update(client: Client): Promise<Client> {
        const repo = getConnection().getRepository(Client);

        let entity = await repo.findOneById(client);
        if (!entity) {
            throw new Error('Client Not Fond');
        }

        entity = repo.merge(entity, client);

        return await repo.save(entity);
    }
}