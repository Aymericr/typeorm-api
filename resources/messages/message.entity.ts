import {
    Column,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    ManyToMany,
    JoinTable,
} from "typeorm";
import nanoid from '@root/utils/nanoid';
import UserEntity from '@resources/users/user.entity';
import Category from '@resources/categories/category.entity';
import BaseEntity from '@resources/base.entity';

export const PREFIX = 'msg_';
export const ID_SIZE = 36;
export const PK_LENGTH = (PREFIX.length) + ID_SIZE;

@Entity({name: 'messages'})
export default class Message extends BaseEntity {
    @PrimaryColumn({length: PK_LENGTH})
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.messages)
    @JoinColumn({name: 'user'})
    public user: UserEntity;

    @ManyToMany(() => Category, category => category.messages, {cascade: true})
    @JoinTable({
        name: 'message_categories',
        joinColumn: {
            name: 'message',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category',
            referencedColumnName: 'id'
        }
    })
    public categories: Category[];

    @BeforeInsert()
    public generateID() {
        return this.id = PREFIX + nanoid(ID_SIZE);
    }
}