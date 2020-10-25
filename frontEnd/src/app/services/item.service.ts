import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private baseUrl = "http://localhost:8080/SptingMVCJava";

  brands = [{ value: "Samsung" }, { value: "LG" }, { value: "Abans" }];
  types = [{ value: "Fridge" }, { value: "TV" }, { value: "Laptop" }];

  constructor(private httpClient: HttpClient) {}

  public create(item: Item): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/item`, item);
  }

  public retrive(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/item`);
  }

  public search(brand: string, type: string, desc: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/searchItem?brand=${brand}&type=${type}&description=${desc}`
    );
  }

  deleteItem(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/item/${id}`);
  }
}
