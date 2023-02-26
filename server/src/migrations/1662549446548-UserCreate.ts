import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserCreate1662549446548 implements MigrationInterface {
  name = 'UserCreate1662549446548'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_personal" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "patronymicName" character varying(20), "gender" character varying(10), "country" character varying(20), "city" character varying(20), "nationality" character varying(20), "dateOfBirth" date, CONSTRAINT "PK_bc41ac10b28017d5f4a422c0414" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_progress" ("id" SERIAL NOT NULL, "hobbies" character varying(20) NOT NULL, "placeOfStudy" character varying(20) NOT NULL, "employment" character varying(20) NOT NULL, "workingLanguages" character varying(20) NOT NULL, CONSTRAINT "PK_a734dc7a1a2c678291e5db3aa28" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_social" ("id" SERIAL NOT NULL, "friends" character varying NOT NULL, "chats" character varying NOT NULL, "subscribers" character varying NOT NULL, "subscription" character varying NOT NULL, CONSTRAINT "PK_d1f18916217cc5143cd8006c474" PRIMARY KEY ("id"))'
    )
    await queryRunner.query('CREATE TABLE "profile"."ru_users" ("id" SERIAL NOT NULL, CONSTRAINT "PK_85ee40cc0d160865287d24c00f1" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "profile"."ru_users"')
    await queryRunner.query('DROP TABLE "profile"."ru_social"')
    await queryRunner.query('DROP TABLE "profile"."ru_progress"')
    await queryRunner.query('DROP TABLE "profile"."ru_personal"')
  }
}
