import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691879937397 implements MigrationInterface {
    name = 'Migration1691879937397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banner" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "listNumber" character varying NOT NULL, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "userId" character varying NOT NULL, "subTitle" character varying NOT NULL, "boardId" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "banner"`);
    }

}
