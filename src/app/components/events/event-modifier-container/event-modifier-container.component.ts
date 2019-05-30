import {
	Component,
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
import { tap } from 'rxjs/operators';
import { ModificationType, Event } from 'src/app/store/domain/interfaces';
import { EventModifierComponent } from '../event-modifier/event-modifier.component';

export interface ModificationConfig {
	type: ModificationType;
}

@Component({
	selector: 'app-event-modifier-container',
	templateUrl: './event-modifier-container.component.html'
})
export class EventModifierContainerComponent implements OnChanges {

	@Input()
	public config: any;

	@Output()
	public closedContainer: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public submittedEvent: EventEmitter<Event> = new EventEmitter<Event>();

	@ViewChild('container', { read: ViewContainerRef })
	private containerRef: ViewContainerRef;

	private componentRef: ComponentRef<EventModifierComponent>;

	constructor(
		private resolver: ComponentFactoryResolver
	) {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['config'] && !changes['config'].isFirstChange()) {
			this.resolveComponent(changes['config'].currentValue);
		}
	}

	private resolveComponent(config: ModificationConfig): void {
		const factory: ComponentFactory<EventModifierComponent> = this.resolver.resolveComponentFactory(EventModifierComponent);

		this.componentRef = this.containerRef.createComponent(factory);

		this.componentRef.instance.modificationType = config.type;

		this.componentRef.instance.closedModifier.pipe(
			tap(() => this.closedContainer.emit()),
			tap(() => this.componentRef.destroy()),
		).subscribe();

		this.componentRef.instance.submittedEvent.pipe(
			tap((event: Event) => this.submittedEvent.emit(event)),
			tap(() => this.componentRef.destroy()),
		).subscribe();
	}

}
