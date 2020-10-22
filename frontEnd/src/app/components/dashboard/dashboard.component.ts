import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(NotificationComponent , {data: {name: 'sakun'}});
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`dialog result : ${result}`);
      }
    );
  }
}
