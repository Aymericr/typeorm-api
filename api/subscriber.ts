import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from 'typeorm';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {

    afterLoad(entity: any) {
        console.log(`AFTER ENTITY LOADED: `, entity);
    }

    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE POST INSERTED: `, event.entity);
    }

    afterInsert(event: InsertEvent<any>) {
        const {
            tableName,
            name,
        } = event.metadata;
        const data = event.entity;
        console.log(`AFTER ENTITY INSERTED: `, {
            tableName,
            name,
            data,
        });
    }
}