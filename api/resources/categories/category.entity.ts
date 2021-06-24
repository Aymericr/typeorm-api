import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    ManyToMany,
    JoinTable,
} from "typeorm";
import nanoid from '@root/utils/nanoid';
import Message from '@resources/messages/message.entity';
import BaseEntity from '@resources/base.entity';

export const PREFIX = 'category_';
export const ID_SIZE = 12;
export const PK_LENGTH = (PREFIX.length) + ID_SIZE;

@Entity({name: 'categories'})
export default class Category extends BaseEntity {
    @PrimaryColumn({length: PK_LENGTH})
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Message, message => message.categories)
    public messages: Message[];

    @BeforeInsert()
    public generatePublicID() {
        return this.id = PREFIX + nanoid(ID_SIZE);
    }
}