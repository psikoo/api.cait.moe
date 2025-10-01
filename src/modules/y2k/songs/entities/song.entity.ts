import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Y2kSong {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable:false})
  url: string;
  @Column({nullable:false})
  tag: string;
  @Column({nullable:false})
  sfw: boolean;
  @Column({nullable:false})
  name: string;
  @Column({nullable:false})
  cover: string;
}