import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse, Entrepreneurship } from '../types/entrepreneurship.model';

@Injectable({
  providedIn: 'root',
})
export class EntrepreneurshipService {
  http = inject(HttpClient);
  private urlBase = `${environment.urlBase}/entrepreneurships`;

  getEntrepreneurship(page: number, size: number): Observable<PageResponse> {
    return this.http.get<PageResponse>(`${this.urlBase}?page=${page}&size=${size}`);
  }

  getEntrepreneurshipsActives(
    page: number,
    size: number,
    sortBy: string = 'name',
    sortDirection: string = 'asc'
  ): Observable<PageResponse> {
    return this.http.get<PageResponse>(
      `${this.urlBase}/active?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
  }

 /**
   * Obtiene los emprendimientos filtrados opcionalmente por categoría y/o goal.
   */
 getEntrepreneurshipsFiltered(
  category: string | null|undefined,
  goal: number | null|undefined,
  page: number,
  size: number,
  goalCondition: 'asc' | 'desc' | 'none',
  sortDirection: 'asc' | 'desc'
) {
  const params: any = { page, size, sortBy: 'goal', sortDirection, goalCondition };

  if (category) params.category = category;
  if (goal !== null) params.goal = goal;


  return this.http.get<{ content: Entrepreneurship[] }>(
    `${this.urlBase}/filter`,
    { params }
  );
}


  getEntrepreneurshipById(id: number): Observable<Entrepreneurship> {
    return this.http.get<Entrepreneurship>(`${this.urlBase}/${id}`);
  }

  getEntrepreneurshipsByAccountId(accountId: number | undefined): Observable<Entrepreneurship[]> {
    return this.http.get<Entrepreneurship[]>(`${this.urlBase}/account/${accountId}`);
  }


  postEntrepreneurship(entrepreneurship: Entrepreneurship): Observable<Entrepreneurship> {
    return this.http.post<Entrepreneurship>(this.urlBase, entrepreneurship);
  }

  updateEntrepreneurship(id: number | null, entrepreneurship: Entrepreneurship): Observable<Entrepreneurship> {
    return this.http.put<Entrepreneurship>(`${this.urlBase}/${id}`, entrepreneurship);
  }

  partiallyUpdateEntrepreneurship(id: number | null, entrepreneurship: Partial<Entrepreneurship>): Observable<Entrepreneurship> {
    return this.http.patch<Entrepreneurship>(`${this.urlBase}/${id}`, entrepreneurship);
  }

  deactivateEntrepreneurship(id: number | null): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
