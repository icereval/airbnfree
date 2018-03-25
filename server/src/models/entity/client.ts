import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from './user';
import config from '../../config';
import logger from '../../logging';
import { Stay } from './stay';
import { Location } from './location';
import { Host } from './host';

@Entity()
export class Client {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('boolean', { default: false })
    @IsBoolean()
    felony: boolean;

    @Column('text', { default: '' })
    @IsNotEmpty()
    photo: string;

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

    async stays(): Promise<Stay[]> {
        const repo = getConnection().getRepository(Stay);
        const queryBuilder = repo.createQueryBuilder('stay')
            .innerJoinAndMapOne('stay.client', Client, 'client', 'client.id = stay.client')
            .innerJoinAndMapOne('client.user', User, 'clientUser', 'clientUser.id = client.user')
            .innerJoinAndMapOne('stay.location', Location, 'location', 'location.id = stay.location')
            .innerJoinAndMapOne('location.host', Host, 'host', 'host.id = location.host')
            .innerJoinAndMapOne('host.user', User, 'hostUser', 'hostUser.id = host.user')
            .where('stay.state in (:states)')
            .where('client.id = :client')
            .setParameter('states', [ 'client-requested', 'client-cancelled', 'casemanager-approved', 'casemanager-denied' ])
            .setParameter('client', this.id);

        return await queryBuilder.getMany();
    }
}
