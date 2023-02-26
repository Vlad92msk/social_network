import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRoles1662725752973 implements MigrationInterface {
  name = 'CreateRoles1662725752973'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "profile"."ru_users" ("id" SERIAL NOT NULL, CONSTRAINT "PK_85ee40cc0d160865287d24c00f1" PRIMARY KEY ("id"))')
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_personal" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "patronymicName" character varying(20), "gender" character varying(10), "country" character varying(20), "city" character varying(20), "nationality" character varying(20), "dateOfBirth" date, CONSTRAINT "PK_bc41ac10b28017d5f4a422c0414" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_progress" ("id" SERIAL NOT NULL, "hobbies" character varying(20) NOT NULL, "placeOfStudy" character varying(20) NOT NULL, "employment" character varying(20) NOT NULL, "workingLanguages" character varying(20) NOT NULL, CONSTRAINT "PK_a734dc7a1a2c678291e5db3aa28" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."ru_social" ("id" SERIAL NOT NULL, "friends" character varying NOT NULL, "chats" character varying NOT NULL, "subscribers" character varying NOT NULL, "subscription" character varying NOT NULL, CONSTRAINT "PK_d1f18916217cc5143cd8006c474" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."connect" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "UQ_bf674ff10cacb7d726eb72cacbb" UNIQUE ("email"), CONSTRAINT "PK_cec531f83ed0f0283cac984a034" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "connect"."roles" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "connect"."tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "uid" integer NOT NULL, "expireAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "UQ_81ed96f8d3c910df2686d1a79f3" UNIQUE ("uid"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "profile"."connect_roles_roles" ("connectId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_490caf3788e4443538e7393175d" PRIMARY KEY ("connectId", "rolesId"))'
    )
    await queryRunner.query('CREATE INDEX "IDX_5d72623c7fd666000fcafd8b4a" ON "profile"."connect_roles_roles" ("connectId") ')
    await queryRunner.query('CREATE INDEX "IDX_6c8da24b6674c75d2540495e63" ON "profile"."connect_roles_roles" ("rolesId") ')
    await queryRunner.query(
      'ALTER TABLE "profile"."connect_roles_roles" ADD CONSTRAINT "FK_5d72623c7fd666000fcafd8b4af" FOREIGN KEY ("connectId") REFERENCES "profile"."connect"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
    await queryRunner.query(
      'ALTER TABLE "profile"."connect_roles_roles" ADD CONSTRAINT "FK_6c8da24b6674c75d2540495e63c" FOREIGN KEY ("rolesId") REFERENCES "connect"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "profile"."connect_roles_roles" DROP CONSTRAINT "FK_6c8da24b6674c75d2540495e63c"')
    await queryRunner.query('ALTER TABLE "profile"."connect_roles_roles" DROP CONSTRAINT "FK_5d72623c7fd666000fcafd8b4af"')
    await queryRunner.query('DROP INDEX "profile"."IDX_6c8da24b6674c75d2540495e63"')
    await queryRunner.query('DROP INDEX "profile"."IDX_5d72623c7fd666000fcafd8b4a"')
    await queryRunner.query('DROP TABLE "profile"."connect_roles_roles"')
    await queryRunner.query('DROP TABLE "connect"."tokens"')
    await queryRunner.query('DROP TABLE "connect"."roles"')
    await queryRunner.query('DROP TABLE "profile"."connect"')
    await queryRunner.query('DROP TABLE "profile"."ru_social"')
    await queryRunner.query('DROP TABLE "profile"."ru_progress"')
    await queryRunner.query('DROP TABLE "profile"."ru_personal"')
    await queryRunner.query('DROP TABLE "profile"."ru_users"')
  }
}
