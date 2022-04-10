import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalComponent } from './components/modal/modal.component';

const components = [
  PaginationComponent,
  ModalComponent
]

@NgModule({
  declarations: [...components, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class SharedModule { }
