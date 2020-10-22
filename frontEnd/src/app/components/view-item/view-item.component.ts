import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'Brand',
    'Type',
    'Price',
    'Description',
    'Expired On',
    'Action'
  ];
  itemList = new Array<Item>();
  searchedList = new Array<Item>();

  searchItemForm: FormGroup;
  brand: string;
  type: string;
  description: string;

  brands: any;
  types: any;

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.brands = this.itemService.brands;
    this.types = this.itemService.types;
    this.viewItems();
    this.setSearchForm();

  }

  viewItems() {
    this.itemService.retrive().subscribe(
      (data) => {
        this.itemList = data;
      },
      (error) => {
        alert(error);
      }
    );
  }

  setSearchForm() {
    this.searchItemForm = this.formBuilder.group({
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.searchItemForm.valid) {
      return;
    }

    this.brand = this.searchItemForm.get('brand').value;
    this.type = this.searchItemForm.get('type').value;
    this.description = this.searchItemForm.get('description').value;

    this.itemService.search(this.brand, this.type, this.description).subscribe(
      (data) => {
        this.itemList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clear() {
    this.ngOnInit();
  }

  delete(id: number) {
    this.itemService.deleteItem(id).subscribe(
      data => {
        this.viewItems();
      },
      error => {
        console.log(error);
      }
    );
  }
}
