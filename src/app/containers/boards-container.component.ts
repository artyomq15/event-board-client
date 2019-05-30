import { Component, OnInit } from '@angular/core';

import { AuthStoreService } from 'src/app/store/services';

@Component({
	selector: 'app-boards-container',
	templateUrl: './boards-container.component.html',
	styleUrls: ['./boards-container.component.scss']
})

export class BoardsContainerComponent implements OnInit {

	constructor(private authStoreService: AuthStoreService) {}

	public ngOnInit(): void {
		this.authStoreService.getCurrentUserProfile();
	}
}
