import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'first_name' })
    first_name: string

    @Column({ name: 'last_name' })
    last_name: string

    @Column({ name: 'email' })
    email: string
    
}
