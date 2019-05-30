import {
	Component,
	OnInit,
	ViewContainerRef,
	ViewChild,
	ComponentFactory,
	ComponentRef,
	ComponentFactoryResolver,
	Output,
	EventEmitter,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { BoardModifierComponent } from '../board-modifier/board-modifier.component';
import { tap } from 'rxjs/operators';
import { ModificationType, Board } from 'src/app/store/domain/interfaces';

export interface ModificationConfig {
	type: ModificationType;
}

@Component({
	selector: 'app-board-modifier-container',
	templateUrl: './board-modifier-container.component.html'
})
export class BoardModifierContainerComponent implements OnChanges {

	@Input()
	public config: any;

	@Output()
	public closedContainer: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public submittedBoard: EventEmitter<Board> = new EventEmitter<Board>();

	@ViewChild('container', { read: ViewContainerRef })
	private containerRef: ViewContainerRef;

	private componentRef: ComponentRef<BoardModifierComponent>;

	constructor(
		private resolver: ComponentFactoryResolver
	) {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['config'] && !changes['config'].isFirstChange()) {
			this.resolveComponent(changes['config'].currentValue);
		}
	}

	private resolveComponent(config: ModificationConfig): void {
		const factory: ComponentFactory<BoardModifierComponent> = this.resolver.resolveComponentFactory(BoardModifierComponent);

		this.componentRef = this.containerRef.createComponent(factory);

		this.componentRef.instance.modificationType = config.type;

		this.componentRef.instance.closedModifier.pipe(
			tap(() => this.closedContainer.emit()),
			tap(() => this.componentRef.destroy()),
		).subscribe();

		this.componentRef.instance.submittedBoard.pipe(
			tap((board: Board) => this.submittedBoard.emit(board)),
			tap(() => this.componentRef.destroy()),
		).subscribe();
	}

}
