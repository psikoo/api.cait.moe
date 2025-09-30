import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UrlShortUrl {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable:false})
  oldUrl: string;
  @Column({nullable:false})
  newUrl: string;
}