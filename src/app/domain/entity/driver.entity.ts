import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export default class ClientEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  cpf?: string;

  @Column()
  clientid?: number;
}
