import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsTable1731417010127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "news" (
            "id" SERIAL NOT NULL,
            "username" VARCHAR(255) NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            CONSTRAINT "PK_1" PRIMARY KEY ("id")
        )    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
