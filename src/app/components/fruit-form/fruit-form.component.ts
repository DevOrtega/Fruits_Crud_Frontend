import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FruitService, Fruit } from 'src/app/services/fruits/fruit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fruit-form',
  templateUrl: './fruit-form.component.html',
  styleUrls: ['./fruit-form.component.css']
})
export class FruitFormComponent implements OnInit {

  errors: string = '';
  isLoading: boolean = false;
  public fruitForm: FormGroup;
  public submitted = false;
  public sizes: string[] = ['small', 'medium', 'big'];

  constructor(private formBuilder: FormBuilder, private fruitService: FruitService) { }

  @Output()
  fruitAdded: EventEmitter<Fruit> = new EventEmitter<Fruit>()

  ngOnInit(): void {
    this.fruitForm = this.formBuilder.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      main_color: ['']
    });
  }

  async addFruit() {
    this.isLoading = true;
    let newFruit: Fruit = {
      name: this.fruitForm.value.name,
      size: this.fruitForm.value.size,
      main_color: this.fruitForm.value.main_color,
    }
    await this.fruitService
      .addFruit(newFruit).then((response) => {
        this.isLoading = false;
        this.fruitAdded.emit(response);
      });
  }

  onChangeSize(data: any) {
    this.fruitForm['controls'].size.setValue(data);
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.fruitForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if ( this.fruitForm.invalid) {
      return;
    }

    this.addFruit().then(() => {
      this.submitted = false;
      this.fruitForm.reset();
    });
  }

  onReset() {
    this.submitted = false;
    this.fruitForm.reset();
  }

}
