import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NoteDto, CreateNoteDto, UpdateNoteDto } from 'api';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<NoteDto[]> {
    return this.http.get<any>('/api/notes');
  }

  getOne(id: string): Observable<NoteDto> {
    return this.http.get<any>(`/api/notes/${id}`);
  }

  create(note: CreateNoteDto): Observable<NoteDto> {
    return this.http.post<any>('/api/notes', note);
  }

  update(id: string, note: UpdateNoteDto): Observable<NoteDto> {
    return this.http.put<NoteDto>(`api/notes/${id}`, note);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/notes/${id}`);
  }
}
