import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export default class ClientEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  cpf?: string;
}
