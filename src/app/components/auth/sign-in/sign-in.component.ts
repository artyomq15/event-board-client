import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthStoreService } from 'src/app/store/services';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

	public submitted: boolean = false;

	public message$: Observable<string>;

	private signInForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authStoreService: AuthStoreService
	) { }

	public get form(): { [key: string]: AbstractControl; } { return this.signInForm.controls; }

	public ngOnInit(): void {
		this.authStoreService.clearMessage();

		this.message$ = this.authStoreService.message;

		this.initForm();
	}

	public onSubmit(): void {

		this.submitted = true;

		if (this.signInForm.invalid) {
			return;
		}

		this.authStoreService.login(this.form.email.value, this.form.password.value);
		this.submitted = false;
	}

	private initForm(): void {
		this.signInForm = this.formBuilder.group({
			email: [
				'',
				[
					Validators.required,
					Validators.email
				]
			],
			password: [
				'',
				[
					Validators.required
				]
			],
		});
	}
}
