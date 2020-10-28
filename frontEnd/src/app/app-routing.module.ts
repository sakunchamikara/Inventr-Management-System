import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { RouteGuardService } from './services/route-guard.service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'system',
    component: DashboardComponent,
    children: [
      {
        path: 'addItem',
        component: AddItemComponent,
        // canActivate: [RouteGuardService],
      },
      {
        path: 'viewItems',
        component: ViewItemComponent,
        // canActivate: [RouteGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
