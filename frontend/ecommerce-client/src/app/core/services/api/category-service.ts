import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../../models/category.model';
import { CategoryUpsert } from '../../models/category-upsert.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Category`;

  getAll(): Promise<Category[]> {
    return lastValueFrom(
      this.http.get<Category[]>(this.apiUrl)
    );
  }

  getById(id:number): Promise<Category>{
    return lastValueFrom(
      this.http.get<Category>(`${this.apiUrl}/${id}`)
    );
  }

  create(model: CategoryUpsert): Promise<string>{
    return lastValueFrom(
      this.http.post(this.apiUrl,model,{
        responseType: "text",
      })
    );
  }

  update(model: CategoryUpsert): Promise<string>{
    return lastValueFrom(
      this.http.put(this.apiUrl,model,{
        responseType: "text",
      })
    );
  }

  remove(id: number): Promise<string>{
    return lastValueFrom(
      this.http.delete(`${this.apiUrl}/${id}`, {
        responseType: 'text',
      })
    );
  }
}
