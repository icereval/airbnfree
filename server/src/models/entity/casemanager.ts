import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from './user';
import config from '../../config';
import logger from '../../logging';
import { isBoolean } from 'util';

@Entity()
export class CaseManager {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('text')
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
}
