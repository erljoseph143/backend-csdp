import { MigrationInterface, QueryRunner, Table } from "typeorm"

export default class AccessabilityMigration1663312291417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accessabilities",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "access_name",
                        type: "varchar",
                        length: "100"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accessabilities')
    }

}
