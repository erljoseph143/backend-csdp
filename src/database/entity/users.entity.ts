import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcrypt';

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

    @Column({ name: 'password' })
    password: string

    @BeforeInsert()
        async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, salt)
        return this.password
    }
    
}
