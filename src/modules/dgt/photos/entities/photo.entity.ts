import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DgtCamera } from "../../cameras/entities/camera.entity";

@Entity()
export class DgtPhoto {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable:false})
  url: string;
  @Column({nullable:false, type:"bigint"})
  time: string;
  @ManyToOne(() => DgtCamera, (camera) => camera.photos, {cascade: true, nullable:false})
  @JoinColumn({name: "cameraId"})
  cameraId: DgtCamera
}