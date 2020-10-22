import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router , private authService: AuthService) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: { title: 'Log out', message: 'Do you really want to log out ?' },
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`dialog result : ${result}`);
        if (result === 'true') {
          this.authService.logOut();
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
