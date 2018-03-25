import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from './user';
import config from '../../config';
import logger from '../../logging';
import { Stay } from './stay';
import { Client } from './client';
import { Location } from './location';
import { Host } from './host';

@Entity()
export class CaseManager {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('text', { default: '' })
    @IsNotEmpty()
    photo: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    static async create(caseManager: CaseManager): Promise<CaseManager> {
        const repo = getConnection().getRepository(CaseManager);
        const entity = repo.create(caseManager);

        return await repo.save(entity);
    }

    static async update(caseManager: CaseManager): Promise<CaseManager> {
        const repo = getConnection().getRepository(CaseManager);

        let entity = await repo.findOneById(caseManager);
        if (!entity) {
            throw new Error('Case Manager Not Fond');
        }

        entity = repo.merge(entity, caseManager);

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
            // .where('stay.state in :states')
            // .setParameter('states', [ 'host-approved', 'host-denied', 'casemanager-approved', 'casemanager-denied' ]);

        return await queryBuilder.getMany();
    }
}
