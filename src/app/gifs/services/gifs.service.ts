import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'CAQMk3n9jiXzRIeD5FBNTrmiXFnkRsei';
  private servicioURL:string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  // TODO: Cambiar Any por tipo de dato correcto
  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(sessionStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(sessionStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string): void {

    query = query.trim().toLowerCase();
    if (query.trim().length === 0) { return; }
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 9);
      sessionStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search?`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        sessionStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
