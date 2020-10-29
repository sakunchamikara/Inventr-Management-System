import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent implements AfterViewInit {
  item = new Item();
  itemList = new Array<Item>();
  dataSource: MatTableDataSource<Item>;
  displayedColumns: string[] = [
    'id',
    'brand',
    'type',
    'description',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor() {
    // Create 100 users
    this.item.id = 1;
    this.item.brand = 'LG';
    this.item.type = 'tv';
    this.item.description = 'xxx';
    this.item.price = 100;
    this.item.expireDate = new Date();
    this.itemList = [
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
      this.item,
    ];
    // Assign the data to the data source for the table to render
    console.log(this.itemList);
    this.dataSource = new MatTableDataSource(this.itemList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
