import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path:'', component: UsersComponent,
    children: [
      {path: '', component: UserListComponent},
      {path: 'add', component: AddEditComponent },
      {path: 'edit/:id', component: AddEditComponent},
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
