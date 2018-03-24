import { getConnection, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
import config from '../../config';
import logger from '../../logging';


@Entity()
export class Session {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    static async create(user: User): Promise<Session> {
        const repo = getConnection().getRepository(Session);
        const session = repo.create({ user });

        return await repo.save(session);
    }
}

export default Session;
