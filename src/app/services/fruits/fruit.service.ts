import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Fruit {
  name: String,
  size: String,
  main_color: String
}

const API_URL: string = 'http://fruits_crud_backend.test/api';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor() {
  }

  async getFruits() {
    return axios.get(API_URL + '/fruits')
      .then(response => {
        return response.data.data;
      })
      .catch(() => null)

  }

  async addFruit(fruit: any) {
    return axios.post(API_URL + '/fruits', fruit)
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  deleteFruit(id: Number) {
    return axios.delete(API_URL + '/fruits/' + id)
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  editFruit(id: Number, fruit) {

    return axios.patch(API_URL + '/fruits/' + id, fruit)
      .then(response => {
        return response.data;
      })
      .catch(() => null)
  }

  async getFruitById(id) {

    if (id != null) {
      return axios.get(API_URL + '/fruits/' + id)
        .then(response => {

          return response.data.data;
        });
    }
  }

}
