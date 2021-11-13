import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accidents')
export default class AccidentEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  driverid?: number;

  @Column()
  vehicleid?: number;
}
