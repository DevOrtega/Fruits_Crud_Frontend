import { Component, OnInit } from '@angular/core';
import { FruitService, Fruit } from 'src/app/services/fruits/fruit.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  fruits: any;
  // errorMessage: string;

  constructor(private fruitService: FruitService) { }

  async ngOnInit(): Promise<void> {
    this.fruits = await this.fruitService
      .getFruits()
      ;
  }


}
