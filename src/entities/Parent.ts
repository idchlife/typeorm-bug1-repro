import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Child from "./Child";


@Entity()
export default class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json")
  obj: { [k: string]: any } = {};

  @OneToMany(type => Child, c => c.parent)
  children: Child[] = [];

  modifyObj() {
    if (!this.obj.field) {
      this.obj.field = 0;
    }

    this.obj.field++;
  }
}