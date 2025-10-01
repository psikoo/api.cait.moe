import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Counter {
  @PrimaryColumn({ default:0 })
  id: number;
  @Column({nullable:false, default:0 })
  counter: number;
}