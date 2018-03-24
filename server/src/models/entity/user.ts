import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getConnection, Entity, Column, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn, IsNotEmpty, IsBoolean, IsEmail } from 'class-validator';
import config from '../../config';
import logger from '../../logging';

@Entity()
@Index('email_unique', (user: User) => [ user.email ], { unique: true })
export class User {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column('text')
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    @IsNotEmpty()
    firstName: string;

    @Column('text')
    @IsNotEmpty()
    lastName: string;

    @Column('text')
    @IsNotEmpty()
    photo: string;

    @Column('boolean', { default: true })
    @IsBoolean()
    active: boolean;

    @Column('text')
    @IsIn(['casemanager', 'host', 'client'])
    type: string;

    static async create(user: User): Promise<User> {
        const repo = getConnection().getRepository(User);

        const exists = await repo.count({ email: user.email });
        if (exists) {
            throw new Error('Email Already Exists');
        }

        let entity = repo.create(user);
        // Source: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
        entity.password = User.encrypt(await User.bcrypt(User.sha512(entity.password)));
        entity = await repo.save(entity);

        return entity;
    }

    static async update(user: User): Promise<User> {
        const repo = getConnection().getRepository(User);

        const queryBuilder = await repo.createQueryBuilder('user')
            .where('user.id = :id')
            .setParameters({ id: user.id });

        let entity = await queryBuilder.getOne();
        if (!entity) {
            throw new Error('User Not Fond');
        }

        entity = repo.merge(entity, user);

        if (user.password) {
            // Source: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
            entity.password = User.encrypt(await User.bcrypt(User.sha512(entity.password)));
        }

        return await repo.save(entity);
    }

    static async verify(email: string, password: string): Promise<User> {
        return await getConnection().transaction(async transactionalEntityManager => {
            const repo = transactionalEntityManager.getRepository(User);

            const user = await repo.findOne({ email });
            if (!user) {
                throw new Error('User Not Found');
            }

            const validPassword = await new Promise<boolean>((resolve, reject) =>  {
                // TODO: Ensure constant time bcrypt
                bcrypt.compare(User.sha512(password), User.decrypt(user.password), ((err, same) => resolve(same)));
            });

            if (!validPassword) {
                throw new Error('Invalid Password');
            }

            return user;
        });
    }

    private static sha512(data: string): string {
        return crypto.createHash('sha512')
            .update(data)
            .digest()
            .toString();
    }

    private static async bcrypt(data: string): Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            bcrypt.hash(data, 10, (err, hash) => resolve(hash));
        });
    }

    private static encrypt(data: string): string {
        const cipher = crypto.createCipher('aes256', config.get('app:encryption_password'));

        let encrypted = cipher.update(data, 'utf8', 'binary');
        encrypted += cipher.final('binary');

        return encrypted;
    }

    private static decrypt(data: string): string {
        const decipher = crypto.createDecipher('aes256', config.get('app:encryption_password'));

        let decrypted = decipher.update(data, 'binary', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}
