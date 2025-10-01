import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable:false})
  name: string;
  @Column({nullable:false})
  age: number;
  @Column({nullable:false})
  birthday: string;
  @Column({nullable:false})
  gender: string;
  @Column({nullable:false})
  pronouns: string;
  @Column({nullable:false})
  orientation: string;
  @Column({nullable:false})
  quote: string;
  @Column({nullable:false})
  intro: string;
  @Column({nullable:false})
  mood: string
  @Column({nullable:false})
  linkName: string;
  @Column({nullable:false})
  urlString: string;
}