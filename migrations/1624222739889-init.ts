import {MigrationInterface, QueryRunner} from "typeorm";

export class init1624222739889 implements MigrationInterface {
    name = 'init1624222739889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying(29) NOT NULL, "username" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying(40) NOT NULL, "content" character varying NOT NULL, "user" character varying(29), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying(21) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message_categories" ("message" character varying(40) NOT NULL, "category" character varying(21) NOT NULL, CONSTRAINT "PK_62aedf53cd20ab75e21f53558eb" PRIMARY KEY ("message", "category"))`);
        await queryRunner.query(`CREATE INDEX "IDX_409bd07253f10ad0add8454817" ON "message_categories" ("message") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f013664cbebe13e0909c80270" ON "message_categories" ("category") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_categories" ADD CONSTRAINT "FK_409bd07253f10ad0add8454817a" FOREIGN KEY ("message") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message_categories" ADD CONSTRAINT "FK_4f013664cbebe13e0909c802705" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_categories" DROP CONSTRAINT "FK_4f013664cbebe13e0909c802705"`);
        await queryRunner.query(`ALTER TABLE "message_categories" DROP CONSTRAINT "FK_409bd07253f10ad0add8454817a"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc"`);
        await queryRunner.query(`DROP INDEX "IDX_4f013664cbebe13e0909c80270"`);
        await queryRunner.query(`DROP INDEX "IDX_409bd07253f10ad0add8454817"`);
        await queryRunner.query(`DROP TABLE "message_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
