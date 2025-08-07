import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeaCard } from '../types/tea-card.type';
import { OrderData } from '../types/order-data.type';
import { environment } from 'src/environments/environment';

@Injectable()
export class TeaCatalogService {
  private apiUrl :string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTeaCatalog(): Observable<TeaCard[]> {

    return this.http.get<TeaCard[]>(this.apiUrl + '/tea');
  }
  getTeaDetails(id: number): Observable<TeaCard> {
    return this.http.get<TeaCard>(`${this.apiUrl}/tea?id=${id}`);
  }
  createOrder(data: OrderData)  {
    return this.http.post<{ success: boolean, message?: string }>(`${this.apiUrl}/order-tea`, data);
  }
}
