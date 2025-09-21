import { IUser } from "@/interface/user.interface";
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, Index, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Index(["email", "userName"])
export class UserEntity extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    userId?: number;

    @Column()
    @IsNotEmpty()
    @Unique(["userName"])
    userName: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    @Unique(["email"])
    email: string;
    
    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: true })
    @IsOptional()
    gender: string;

    @Column({ nullable: true, type: 'date' })
    @IsOptional()
    dob?: Date;

    @Column()
    @IsNotEmpty()
    phone: string;

    @Column()
    @CreateDateColumn()
    createdAt?: Date;

}
