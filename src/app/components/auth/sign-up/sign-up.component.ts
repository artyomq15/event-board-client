import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { validatePasswordConfirmation } from '../util/password.validator';

import { User } from 'src/app/store/domain/interfaces';

import { AuthStoreService } from 'src/app/store/services';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

	public submitted: boolean = false;

	public message$: Observable<string>;

	public signUpForm: FormGroup;

	public get form(): { [key: string]: AbstractControl; } { return this.signUpForm.controls; }
	public get password(): { [key: string]: AbstractControl; } { return (this.form.password as FormGroup).controls; }

	constructor(
		private formBuilder: FormBuilder,
		private authStoreService: AuthStoreService
	) { }

	public ngOnInit(): void {
		this.authStoreService.clearMessage();

		this.message$ = this.authStoreService.message;

		this.initForm();
	}

	public onSubmit(): void {

		this.submitted = true;

		if (this.signUpForm.invalid) {
			return;
		}

		const user: User = {
			id: '',
			name: this.form.name.value,
			email: this.form.email.value,
			password: this.password.password.value
		};

		this.authStoreService.register(user);

		this.submitted = false;
	}

	private initForm(): void {
		this.signUpForm = this.formBuilder.group({
			name: [
			'',
				[
					Validators.required,
					Validators.pattern(/^[\w-]+$/i)
				]
			],
			email: [
			'',
			[
				Validators.required,
				Validators.email
			]
			],
			password: this.formBuilder.group({
			password: [
				'',
				[
				Validators.required
				]
			],
			passwordConfirm: [
				'',
				[
				Validators.required
				]
			]
			}, { validator: validatePasswordConfirmation })
		});
	}
}
