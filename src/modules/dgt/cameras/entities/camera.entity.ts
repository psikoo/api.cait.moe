import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DgtPhoto } from "../../photos/entities/photo.entity";

@Entity()
export class DgtCamera {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable:false})
  url: string;
  @Column({nullable:false})
  name: string;
  @Column({nullable:false})
  road: string;
  @Column({nullable:false})
  location: string;
  @Column({nullable:false})
  watch: boolean;
  @OneToMany(() => DgtPhoto, (photo) => photo.cameraId)
  photos: DgtPhoto[]
}