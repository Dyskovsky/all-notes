import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientConfigDto } from 'api';

@Injectable({
  providedIn: 'root',
})
export class ClientConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<ClientConfigDto> {
    return this.http.get<ClientConfigDto>('/api/config/frontend');
  }
}
