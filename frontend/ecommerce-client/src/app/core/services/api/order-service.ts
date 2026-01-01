import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
// Environment importu
import { environment } from "../../../../environments/environment";

import { orderResponseModel } from "../../models/orders/orderResponseModel";
import { createOrderRequestModel } from "../../models/orders/createOrderRequestModel";
import { updateOrderRequestModel } from "../../models/orders/updateOrderRequestModel";

@Injectable({providedIn:'root'})
export class OrderService {
    private http = inject(HttpClient);
    
    // Environment kullanımı
    private readonly url = `${environment.baseUrl}/${environment.endpoints.order}`;

    async getAll(): Promise<orderResponseModel[]> {
        return await lastValueFrom(this.http.get<orderResponseModel[]>(this.url));
    }

    async create(body: createOrderRequestModel): Promise<string> {
        return await lastValueFrom(this.http.post(this.url, body, {
            responseType: 'text'
        }));
    }

    async update(body: updateOrderRequestModel): Promise<string> {
        return await lastValueFrom(this.http.put(this.url, body, {
            responseType: 'text'
        }));
    }

    async deleteById(id: number): Promise<string> {
        return await lastValueFrom(this.http.delete(`${this.url}/${id}`, { 
            responseType: 'text' 
        }));
    }
}