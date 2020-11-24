import { Component, OnInit } from '@angular/core';
import { FruitForm } from 'src/app/interfaces/fruitform';
import { FruitService, Fruit } from 'src/app/services/fruits/fruit.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  fruits: any;
  isLoading: boolean = true;

  public editForm: FruitForm = {
    name: '',
    size: '',
    main_color: '',
  };

  public fruitData: any = {
    id: '',
    name: '',
    size: '',
    main_color: ''
  };

  private fruit_id: Number;

  public editing: boolean = false;

  constructor(private fruitService: FruitService) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = false
    this.fruits = await this.fruitService
      .getFruits()
      ;
  }

  findFruit(id: Number): Fruit {
    return this.fruits.find((fruit: any) => fruit.id === id);
  }


  async appendFruit(fruit: Fruit) {
    this.fruits.push(fruit);
    this.fruits = await this.fruitService
      .getFruits()
      ;
  }

  deleteFruit(id: Number) {
    let fruit = this.findFruit(id)
    this.fruitService
      .deleteFruit(id)
      .then((response) => {
        let index = this.fruits.findIndex((fruit: any) => fruit.id === id)
        this.fruits.splice(index, 1)
      });
  }

  async getFruit(id) {
    const fruit: any = this.findFruit(id)

    this.fruitData = {
      id: fruit.id,
      name: fruit.name,
      size: fruit.size,
      main_color: fruit.main_color
    }

    this.editForm = {
      name: fruit.name,
      size: fruit.size,
      main_color: fruit.main_color
    };
  }

  async editFruit(event: any) {
    this.editing = !this.editing;
    this.getFruit(this.fruit_id);
    await this.fruitService.editFruit(this.fruit_id, event).then(() => {
      // found the index of the array to update
      let foundIndex = this.fruits.findIndex(x => x.id == this.fruit_id);
      // get the attribute of the fruit to edit and convert to string
      let size = JSON.stringify(event.size);
      let name = JSON.stringify(event.name);
      let main_color = JSON.stringify(event.main_color);
      //regular expression to removes quotes from stringify
      const regex = /"/g;
      this.fruits[foundIndex].size = size.replace(regex, '');
      this.fruits[foundIndex].name = name.replace(regex, '');
      this.fruits[foundIndex].main_color = main_color.replace(regex, '');

    });

  }

  showEditForm(id) {
    this.editing = !this.editing;
    this.fruit_id = id;
    this.getFruit(this.fruit_id);
  }

  async closeEdit(event: any) {
    this.editing = !this.editing;
  }


}
