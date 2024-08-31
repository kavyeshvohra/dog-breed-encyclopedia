import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  private apiUrl = "https://dog.ceo/api/breeds/list/all"
  private apiImage = "https://dog.ceo/api/breed/";
  constructor(private http: HttpClient) { }

  getBreeds(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getDogImage(breed: string): Observable<any>{
    const url = this.apiImage + breed + "/images/random";
    return this.http.get<any>(url);
  }
}
