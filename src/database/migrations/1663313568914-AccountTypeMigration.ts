import { MigrationInterface, QueryRunner, Table } from "typeorm"

export default class AccountTypeMigration1663313568914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "account_type",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "account_type_name",
                        type: "varchar",
                        length: "50"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account_type');
    }

}
