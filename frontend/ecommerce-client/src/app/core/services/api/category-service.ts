import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
// Environment importu
import { environment } from "../../../../environments/environment";

import { CategoryResponseModel } from "../../models/categories/categoryResponseModel";
import { CreateCategoryRequestModel } from "../../models/categories/createCategoryRequestModel";
import { UpdateCategoryRequestModel } from "../../models/categories/updateCategoryRequestModel";

@Injectable({providedIn:'root'})
export class CategoryService {
    private http = inject(HttpClient);
    
    // Environment kullanımı
    private readonly url = `${environment.baseUrl}/${environment.endpoints.category}`;

    async getAll(): Promise<CategoryResponseModel[]> {
        return await lastValueFrom(this.http.get<CategoryResponseModel[]>(this.url));
    }

    async create(body: CreateCategoryRequestModel): Promise<string> {
        return await lastValueFrom(this.http.post(this.url, body, {
            responseType: 'text'
        }));
    }

    async update(body: UpdateCategoryRequestModel): Promise<string> {
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