import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { productResponseModel } from '../../models/products/productResponseModel';
import { createProductRequestModel } from '../../models/products/createProductRequestModel';
import { updateProductRequestModel } from '../../models/products/updateProductRequestModel';
@Injectable({providedIn: 'root'})
export class ProductService {
  private http = inject(HttpClient);
  private readonly url = `${environment.baseUrl}/${environment.endpoints.product}`;

  async getAll(): Promise<productResponseModel[]> {
          return await lastValueFrom(this.http.get<productResponseModel[]>(this.url));
      }
  
      async create(body: createProductRequestModel): Promise<string> {
          return await lastValueFrom(this.http.post(this.url, body, {
              responseType: 'text'
          }));
      }
  
      async update(body: updateProductRequestModel): Promise<string> {
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
