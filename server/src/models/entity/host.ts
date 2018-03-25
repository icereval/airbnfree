import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Location } from './location';
import { User } from './user';
import config from '../../config';
import logger from '../../logging';
import { Stay } from './stay';
import { Client } from './client';

@Entity()
export class Host {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('text', { default: '' })
    @IsNotEmpty()
    name: string;

    @Column('text', { default: '' })
    @IsNotEmpty()
    description: string;

    @Column('boolean', { default: false })
    @IsBoolean()
    away: boolean;

    @Column('text', { default: '' })
    @IsNotEmpty()
    photo: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToMany(type => Location, location => location.host)
    locations: Location[];

    static async create(host: Host): Promise<Host> {
        const repo = getConnection().getRepository(Host);
        const entity = repo.create(host);

        return await repo.save(entity);
    }

    static async update(host: Host): Promise<Host> {
        const repo = getConnection().getRepository(Host);

        let entity = await repo.findOneById(host);
        if (!entity) {
            throw new Error('Host Not Fond');
        }

        entity = repo.merge(entity, host);

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
            .where('stay.state in :states')
            .where('host.id = :host')
            .setParameter('states', [ 'client-requested', 'host-approved', 'host-denied' ])
            .setParameter('host', this.id);

        return await queryBuilder.getMany();
    }
}
