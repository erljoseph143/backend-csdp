import { MigrationInterface, QueryRunner, Table } from "typeorm"

export default class UsersMigration1663309805574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'users',
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "30",
                        isNullable: true
                    },
                    {
                        name: "account_type",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "accessabilities_ids",
                        type: "varchar",
                        length: "20",
                        isNullable: true
                    }

                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('users');
    }

}
