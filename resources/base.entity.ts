import {CreateDateColumn, UpdateDateColumn} from 'typeorm';

export default abstract class BaseEntity {
    @CreateDateColumn({
        name: 'created_at',
        type: 'time with time zone',
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'time with time zone',
    })
    updated_at: Date;
}