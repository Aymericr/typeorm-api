import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    OneToMany,
} from "typeorm";
import nanoid from '@root/utils/nanoid';
import Message from '@resources/messages/message.entity';
import BaseEntity from '@resources/base.entity';

export const PREFIX = 'user_';
export const ID_SIZE = 24;
export const PK_LENGTH = (PREFIX.length) + ID_SIZE;

@Entity({name: 'users'})
export default class UserEntity extends BaseEntity {
    @PrimaryColumn({length: PK_LENGTH})
    id: string;

    @Column({length: 100, unique: true})
    username: string;

    @BeforeInsert()
    public generateID() {
        return this.id = PREFIX + nanoid(ID_SIZE);
    }

    @OneToMany(() => Message, message => message.user, {cascade: true})
    public messages: Message[];
}