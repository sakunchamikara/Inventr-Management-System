import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from '../components/add-item/add-item.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewItemComponent } from '../components/view-item/view-item.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddItemComponent,
    ViewItemComponent,
    NotificationComponent,
    PaginationComponent
  ],
  entryComponents: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class DefaultModule {}
