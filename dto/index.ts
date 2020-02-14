export interface ClientConfigDto {
  clientId: string;
  authDomain: string;
  authAudience: string;
}

export interface ListAllEntities {
  size: number;
  page: number;
}

export interface CreateNoteDto {
  readonly title: string;
  readonly body: string;
  readonly type: 'text';
}

export interface NoteDto {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly type: 'text';
}

export interface UpdateNoteDto {
  readonly title: string;
  readonly body: string;
}
