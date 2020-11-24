import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FruitForm } from 'src/app/interfaces/fruitform';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Input() edit: FruitForm;
  @Output() saveEmitter = new EventEmitter();

  public newFruit: FormGroup;
  public sizes: string[] = ['small', 'medium', 'big'];
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  onChangeSize(data) {
    this.newFruit['controls'].size.setValue(data);
  }

  ngOnInit(): void {
    this.newFruit = this.formBuilder.group({
      name: [this.edit.name, Validators.required],
      size: [this.edit.size, Validators.required],
      main_color: [this.edit.main_color, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.newFruit.invalid) {
      return;
    }
    this.emitSave();
  }

  emitSave() {
    let fruitToEmit = {
      name: this.newFruit['controls'].name.value,
      size: this.newFruit['controls'].size.value,
      main_color: this.newFruit['controls'].main_color.value,
    };

    this.saveEmitter.emit(fruitToEmit);
  }

  get form() {
    return this.newFruit.controls;
  }

  onReset() {
    this.submitted = false;
    this.newFruit.reset();
  }

}
