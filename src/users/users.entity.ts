import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string
    
}
