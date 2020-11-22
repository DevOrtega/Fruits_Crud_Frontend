import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Fruit {
  id: Number,
  name: String,
  size: String,
  main_color: String,
  created_at: Date,
  updated_at: Date
}

const API_URL: string = 'http://fruits_crud_backend.test/api';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor(private router: Router, private http: HttpClient) {
    //this.init();
  }

  async getFruits() {
    return axios.get(API_URL + '/fruits')
      .then(response => {
        return response.data;
      })
      .catch(() => null)

  }
  /*  return this.http.get(API_URL + '/players')
   .pipe(map(users => {
     //this.profileSubject.next(users);

     return users;
   }); */
}
