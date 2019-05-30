import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'mean-token';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {

	public getToken(): string {
		return localStorage.getItem(TOKEN_KEY);
	}

	public saveToken(token: string): void {
		localStorage.setItem(TOKEN_KEY, token);
	}

	public removeToken(): void {
		localStorage.removeItem(TOKEN_KEY);
	}
}
