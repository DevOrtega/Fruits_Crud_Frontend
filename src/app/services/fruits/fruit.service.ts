import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

export interface Fruit {
  name: String,
  size: String,
  main_color: String
}

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor() {
  }

  async getFruits() {
    return axios.get(environment.API_URL + '/fruits', {
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${environment.token}` ,
      }
    })
      .then(response => {
        return response.data.data;
      })
      .catch(() => null)

  }

  async addFruit(fruit: any) {
    return axios.post(environment.API_URL + '/fruits', fruit, {
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${environment.token}` ,
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  deleteFruit(id: Number) {
    return axios.delete(environment.API_URL + '/fruits/' + id, {
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${environment.token}` ,
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  editFruit(id: Number, fruit) {

    return axios.patch(environment.API_URL + '/fruits/' + id, fruit, {
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${environment.token}` ,
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  async getFruitById(id) {

    if (id != null) {
      return axios.get(environment.API_URL + '/fruits/' + id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${environment.token}` ,
        }
      })
        .then(response => {

          return response.data.data;
        });
    }
  }

}
