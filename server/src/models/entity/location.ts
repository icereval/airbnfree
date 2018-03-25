import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsInt } from 'class-validator';
import { Host } from './host';
import config from '../../config';
import logger from '../../logging';

@Entity()
export class Location {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('text')
    @IsNotEmpty()
    name: string;

    @Column('text')
    @IsNotEmpty()
    address: string;

    @Column('text')
    @IsNotEmpty()
    description: string;

    @Column('int')
    @IsInt()
    rooms: number;

    @Column('boolean')
    @IsBoolean()
    active: boolean;

    @ManyToOne(type => Host, host => host.locations)
    @JoinColumn()
    host: Host;

    @Column('text')
    @IsNotEmpty()
    photo: string;

    @Column('boolean', { default: false })
    @IsBoolean()
    hqs: boolean;

    static async create(location: Location): Promise<Location> {
        const repo = getConnection().getRepository(Location);
        const entity = repo.create(location);
        entity.active = true;

        return await repo.save(entity);
    }

    static async update(location: Location): Promise<Location> {
        const repo = getConnection().getRepository(Location);

        let entity = await repo.findOneById(location);
        if (!entity) {
            throw new Error('Host Not Fond');
        }

        entity = repo.merge(entity, location);

        return await repo.save(entity);
    }
}
