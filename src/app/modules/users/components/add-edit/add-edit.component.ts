import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MustMatch } from '../../../shared/utils/match.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  id!: string;
  editMode!: boolean;
  submitted: boolean = false;
  create$!: Subscription;
  update$!: Subscription;
  load$!: Subscription;

  get controls() { return this.form.controls }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.editMode ? this.updateUser() : this.createUser();

  }

  private createUser() {
    console.log(this.form.value);
    this.create$ = this.userService.create(this.form.value).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route })
    })
  }

  private updateUser() {
    this.update$ = this.userService.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route })
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editMode = this.id ? true : false;

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],

      username: ['', this.editMode ? Validators.nullValidator : Validators.required],
      password: ['', [Validators.minLength(6), this.editMode ? Validators.nullValidator : Validators.required]],
      confirmPassword: ['', this.editMode ? Validators.nullValidator : Validators.required]
    }, formOptions)

    if (this.editMode) {
      this.load$ = this.userService.getById(this.id).subscribe(
        res => this.form.patchValue(res)
      )
    }

  }

  ngOnDestroy(): void {
    if (this.create$) { this.create$.unsubscribe() }
    if (this.update$) { this.update$.unsubscribe() }
    if (this.load$) { this.load$.unsubscribe() }
  }

}
