import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/store/domain/interfaces';
import { AuthStoreService } from 'src/app/store/services';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss', '../../../shared/icon.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {

	@Input()
	public user: User;

	constructor(private authStoreService: AuthStoreService) { }

	public logout(): void {
		this.authStoreService.logout();
		location.reload();
	}
}
