import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { appUserResponseModel } from "../../models/appUsers/appUserResponseModel";
import { createAppUserRequestModel } from "../../models/appUsers/createAppUserRequestModel";
import { updateAppUserRequestModel } from "../../models/appUsers/updateAppUserRequestModel";
@Injectable({providedIn:'root'})
export class AppUserService {
    private http = inject(HttpClient);
    private readonly url = `${environment.baseUrl}/${environment.endpoints.appUser}`;

    // Get list
    async getAll(): Promise<appUserResponseModel[]> {
        return await lastValueFrom(this.http.get<appUserResponseModel[]>(this.url));
    }

    // Post : Create
    async create(body: createAppUserRequestModel): Promise<string> {
        return await lastValueFrom(this.http.post(this.url, body, {
            responseType: 'text'
        }));
    }

    // Put: Update
    async update(body: updateAppUserRequestModel): Promise<string> {
        return await lastValueFrom(this.http.put(this.url, body, {
            responseType: 'text'
        }));
    }

    // Delete
    async deleteById(id: number): Promise<string> {
        return await lastValueFrom(this.http.delete(`${this.url}/${id}`, { 
            responseType: 'text' 
        }));
    }
}