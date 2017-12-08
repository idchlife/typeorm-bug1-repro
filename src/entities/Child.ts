import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Parent from "./Parent";

@Entity()
export default class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Parent, p => p.children)
  parent: Parent;
}