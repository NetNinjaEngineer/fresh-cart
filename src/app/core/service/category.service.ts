import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _baseUrl: string = `${environment.baseApiUrl}/api/v1/categories`;

    constructor(private _client: HttpClient) {}

    getAllCategories(): Observable<any> {
        return this._client.get<any>(`${this._baseUrl}`);
    }
}
