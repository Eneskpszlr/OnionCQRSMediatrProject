import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
// Environment importu
import { environment } from "../../../../environments/environment";

import { appUserProfileResponseModel } from "../../models/appUserProfiles/appUserProfileResponseModel";
import { createAppUserProfileRequestModel } from "../../models/appUserProfiles/createAppUserProfileRequestModel";
import { updateAppUserProfileRequestModel } from "../../models/appUserProfiles/updateAppUserProfileRequestModel";

@Injectable({providedIn:'root'})
export class AppUserProfileService {
    private http = inject(HttpClient);
    
    // Environment kullanımı
    private readonly url = `${environment.baseUrl}/${environment.endpoints.appUserProfile}`;

    async getAll(): Promise<appUserProfileResponseModel[]> {
        return await lastValueFrom(this.http.get<appUserProfileResponseModel[]>(this.url));
    }

    async create(body: createAppUserProfileRequestModel): Promise<string> {
        return await lastValueFrom(this.http.post(this.url, body, {
            responseType: 'text'
        }));
    }

    async update(body: updateAppUserProfileRequestModel): Promise<string> {
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