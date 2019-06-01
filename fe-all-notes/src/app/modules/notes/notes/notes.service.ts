import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>('/api/notes');
  }

  getOne(id: string): Observable<any> {
    return this.http.get<any>(`/api/notes/${id}`);
  }

  create(note: any): Observable<any> {
    return this.http.post<any>('/api/notes', note);
  }

  update(id: string, note: any): Observable<any> {
    return this.http.put<void>(`api/notes/${id}`, note);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/notes/${id}`);
  }
}
