import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Note {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: 'text';

  @Column()
  body: string;

  @Column({ readonly: true })
  creator: string;
}
