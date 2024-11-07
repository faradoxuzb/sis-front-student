import { Inject, Injectable } from '@angular/core';
// import { DITokens } from '../utils/di.tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private http: HttpClient,
    // @Inject(API_BASE_URL) private apiBaseUrl: string,
  ) {}
  apiBaseUrl = environment.API_BASE_URL
  post<T>(path: string, body: any) {
    return this.http
      .post<T>(`${this.apiBaseUrl}/${path}`, body)
      .pipe(shareReplay(1));
  }

  get<T>(path: string, obj?: { queryParams?: any; params?: HttpParams }) {
    const params = obj?.params
      ? obj.params
      : new HttpParams({ fromObject: obj?.queryParams });
    return this.http
      .get<T>(`${this.apiBaseUrl}/${path}`, { params })
      .pipe(shareReplay(1));
  }

  put<T>(path: string, id: number, body: any) {
    return this.http.put<T>(`${this.apiBaseUrl}/${path}/${id}`, body);
  }

  delete<T>(path: string, id: number) {
    return this.http.delete<T>(`${this.apiBaseUrl}/${path}/${id}`);
  }
}
