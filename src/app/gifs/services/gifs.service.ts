import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];

  // TODO: Cambiar Any por tipo de dato correcto
  public resultados: Gif[] = [];

  get historial() : string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query:string):void{

    query = query.trim().toLowerCase();
    if (query.trim().length === 0) {return;}
    if (this._historial.includes(query)) { return; }

    this._historial.unshift(query);
    this._historial = this.historial.splice(0,9);
    localStorage.setItem('historial', JSON.stringify(this._historial));

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CAQMk3n9jiXzRIeD5FBNTrmiXFnkRsei&q=${query}&limit=10`)
    .subscribe( ( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
    });

  }
}
