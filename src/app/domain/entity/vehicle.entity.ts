import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export default class VehicleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  licenseplate?: string;

  @Column()
  clientid?: number;
}
