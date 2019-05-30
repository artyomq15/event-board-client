import { OnInit, OnDestroy, Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/store/domain/interfaces';

export interface UserChipConfig {
	isRemovable: boolean;

	isEditable: boolean;
	isModerator: boolean;

	isCreator: boolean;
}

export interface UserChip {
	user: User;
	config: UserChipConfig;
}

@Component({
	selector: 'app-user-chip',
	templateUrl: './user-chip.component.html',
	styleUrls: ['./user-chip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChipComponent {

	@Input()
	public user: User;

	@Input()
	public config: UserChipConfig;

	@Input()
	public showModerator: boolean;

	@Output()
	public deleted: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public setModerator: EventEmitter<boolean> = new EventEmitter<boolean>();

	public delete(): void {
		this.deleted.emit();
	}

	public toggleModerator(): void {
		this.setModerator.emit(!this.config.isModerator);
	}
}
