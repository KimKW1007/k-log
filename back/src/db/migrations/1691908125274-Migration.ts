import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691908125274 implements MigrationInterface {
    name = 'Migration1691908125274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reply" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "authorName" character varying NOT NULL, "authorId" integer NOT NULL, "authorEmail" character varying NOT NULL, "authorImage" character varying NOT NULL, "isSecret" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "connectedCommentId" integer, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "authorName" character varying NOT NULL, "authorId" integer NOT NULL, "authorEmail" character varying NOT NULL, "authorImage" character varying NOT NULL, "isSecret" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "boardId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "thumbnail" character varying NOT NULL, "boardTitle" character varying NOT NULL, "author" character varying NOT NULL, "authorImage" character varying NOT NULL, "tags" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "contents" character varying NOT NULL, "subCategoryId" integer, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "categorySubTitle" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "categoryTitle" character varying NOT NULL, "dndNumber" integer NOT NULL, "userId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_entity" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_fb7f05b8927a1295e3c49dec4d" UNIQUE ("userId"), CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "userName" character varying NOT NULL, "userEmail" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" character varying, "currentRefreshToken" character varying, "currentRefreshTokenExp" TIMESTAMP, CONSTRAINT "UQ_d72ea127f30e21753c9e229891e" UNIQUE ("userId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" SERIAL NOT NULL, "listNumber" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "find_id" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userEmail" character varying NOT NULL, CONSTRAINT "PK_8c5f6a01cea2a1e11a9d6838ff1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_e4067feef2ebc9cd6ead6a9d546" FOREIGN KEY ("connectedCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_a13ed8d4be35dee61bd3286ac12" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_1d7ea53ad552bdc21b9feecb5c9" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_fb7f05b8927a1295e3c49dec4dd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_fb7f05b8927a1295e3c49dec4dd"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_1d7ea53ad552bdc21b9feecb5c9"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_a13ed8d4be35dee61bd3286ac12"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_e4067feef2ebc9cd6ead6a9d546"`);
        await queryRunner.query(`DROP TABLE "find_id"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file_entity"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "reply"`);
    }

}
