import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsInt, IsIn } from 'class-validator';
import config from '../../config';
import logger from '../../logging';
import { Client } from './client';
import { Location } from './location';
import { Host } from './host';

@Entity()
export class Stay {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(type => Client, client => client.stays)
    @JoinColumn()
    client: Client;

    // @ManyToOne(type => Host, host => host.stays)
    // @JoinColumn()
    // host: Host;

    @ManyToOne(type => Location)
    @JoinColumn()
    location: Location;

    @Column('text')
    @IsNotEmpty()
    description: string;

    @Column('int')
    @IsInt()
    rooms: number;

    @Column('text')
    @IsIn(['client-requested', 'client-cancelled', 'host-approved', 'host-denied', 'casemanager-approved', 'casemanager-denied'])
    state: string;

    static async create(stay: Stay): Promise<Stay> {
        const repo = getConnection().getRepository(Stay);
        const entity = repo.create(stay);

        return await repo.save(entity);
    }

    static async update(stay: Stay): Promise<Stay> {
        const repo = getConnection().getRepository(Stay);

        let entity = await repo.findOneById(stay);
        if (!entity) {
            throw new Error('Stay Not Fond');
        }

        entity = repo.merge(entity, stay);

        return await repo.save(entity);
    }
}
