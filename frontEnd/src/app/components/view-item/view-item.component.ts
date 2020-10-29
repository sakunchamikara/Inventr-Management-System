import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator } from '@angular/material';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Item>;
  displayedColumns: string[] = [
    'Id',
    'Brand',
    'Type',
    'Price',
    'Description',
    'Expired On',
    'Action',
  ];
  itemList = new Array<Item>();
  searchedList = new Array<Item>();

  searchItemForm: FormGroup;
  searchListEmptyFlag = false;
  brand: string;
  type: string;
  description: string;

  brands: any;
  types: any;

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.viewItems();
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.searchListEmptyFlag = false;
    this.brands = this.itemService.brands;
    this.types = this.itemService.types;
    this.setSearchForm();
  }

  openDialogDeleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        title: 'Delete Item',
        message: 'Do you really want to delete the item ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog result : ${result}`);
      if (result === 'true') {
        this.delete(id);
      }
    });
  }
  openDialogDeleteResponse() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        title: 'Delete Item',
        message: 'Item deleted successfully !',
      },
    });
  }

  openDialogSearchListEmpty() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: {
        title: 'Search List',
        message: 'Search List Empty !',
      },
    });
  }

  viewItems() {
    this.itemService.retrive().subscribe(
      (data) => {
        this.itemList = data;
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.paginator = this.paginator;
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
        if (data.length === 0) {
          this.searchListEmptyFlag = true;
          this.openDialogSearchListEmpty();
        }
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
      (data) => {
        this.viewItems();
        this.openDialogDeleteResponse();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
