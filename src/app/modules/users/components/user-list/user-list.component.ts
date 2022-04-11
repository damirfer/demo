import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  finalize,
  noop,
  Observable,
  of,
  pipe,
  Subscription,
} from 'rxjs';
import { Pagination } from 'src/app/modules/shared/interfaces/pagination';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  pagination$: Observable<Pagination>;
  delete$!: Subscription;
  startPage: number = 1;
  searchValue: string = '';
  searchActive: boolean = false;
  user!: User;
  showModal: boolean = false;
  constructor(private userService: UserService) {
    this.users$ = this.userService.getAll(this.startPage);
    this.pagination$ = this.userService.getPagination();
  }

  onLoad(pageNumber: number): void {
    this.users$ = this.userService.getAll(pageNumber , this.searchValue);
  }

  onSearch(): void {
    if (this.searchValue) {
      this.searchActive = true;
      this.users$ = this.userService.getAll(1, this.searchValue);
    }
  }

  clearSearch(): void {
    (this.searchValue = ''), (this.searchActive = false);
    this.users$ = this.userService.getAll(1);
  }

  showDeleteModal(userToDelete: User): void {
    this.user = userToDelete;
    this.showModal = true;
  }

  delete(): void {
    this.showModal = false;
    this.user.deletingOn = true;
    this.delete$ = this.userService
      .delete(this.user.id)
      .subscribe({
        complete: () => this.onLoad(this.startPage),
        error: () => (this.user.deletingOn = false),
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if(Boolean(this.delete$)) { this.delete$.unsubscribe() }

  }
}
