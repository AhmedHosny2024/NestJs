import {AfterInsert,AfterUpdate,AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // apply this function after inserting a new user
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }
  // apply this function after update user
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
  // apply this function after remove user
  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }

}