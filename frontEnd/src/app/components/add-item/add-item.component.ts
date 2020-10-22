import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  item = new Item();
  date = new Date();
  minute: string;
  second: string;
  id: string;

  brands: any;
  types: any;


  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.brands = this.itemService.brands;
    this.types = this.itemService.types;
    this.addItemForm = this.formBuilder.group({
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      expireDate: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.addItemForm.valid) {
      return;
    }
    this.minute = this.date.getMinutes().toString();
    this.second = this.date.getSeconds().toString();
    this.id = this.minute + this.second;
    this.item.id = +this.id;
    this.item.brand = this.addItemForm.get('brand').value;
    this.item.type = this.addItemForm.get('type').value;
    this.item.description = this.addItemForm.get('description').value;
    this.item.price = this.addItemForm.get('price').value;
    this.item.expireDate = this.addItemForm.get('expireDate').value;

    this.itemService.create(this.item).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}
