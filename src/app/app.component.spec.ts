import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { appRoutes } from './app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { MaterialModule } from './material.module';
import { ResizableModule } from 'angular-resizable-element';
import { BoardStoreServiceStub } from '../testing/board.store.service.stub';
import { EventComponent } from './components/events/event/event.component';
import { TimeGridComponent } from './components/grid/timeGrid.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventModifierComponent } from './components/events/event-modifier/event-modifier.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { EventTicketComponent } from './components/events/event-ticket/event-ticket.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardModifierComponent } from './components/boards/board-modifier/board-modifier.component';
import { MyBoardComponent } from './components/boards/my-board/my-board.component';
import { BoardComponent } from './components/boards/board/board.component';
import { TokenExistsGuard } from './services/guards/token-exists.guard';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AppReducer } from './store/reducers';
import { AuthStoreService, BoardStoreService } from './store/services';
import { TokenNotExistsGuard } from './services/guards/token-not-exists.guard';

describe('AppComponent', () => {
	let location: Location;
	let router: Router;
	let fixture: ComponentFixture<AppComponent>;
	let component;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				StoreModule.forRoot({}),
				StoreModule.forFeature('app', AppReducer.reducer),
				RouterTestingModule.withRoutes(appRoutes),
				ResizableModule
			],
			declarations: [
				AppComponent,
				EventComponent,
				TimeGridComponent,
				NavbarComponent,
				EventModifierComponent,
				EventEditComponent,
				EventAddComponent,
				EventAddDialogComponent,
				EventEditDialogComponent,
				SignUpComponent,
				SignInComponent,
				EventTicketComponent,
				BoardsComponent,
				BoardAddDialogComponent,
				BoardAddComponent,
				BoardModifierComponent,
				BoardEditComponent,
				BoardEditDialogComponent,
				MyBoardComponent,
				BoardComponent

			],
			providers: [
				AuthStoreService,
				BoardStoreService,
				TokenNotExistsGuard,
				TokenExistsGuard,
				DatePipe
			]
		})
			.overrideComponent(AppComponent, {
				set: {
					providers: [
						{ provide: BoardStoreService, useClass: BoardStoreServiceStub }
					]
				}
			})
			.compileComponents();

		router = TestBed.get(Router);
		location = TestBed.get(Location);

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	}));

	it('should create the app', async(() => {
		expect(component).toBeTruthy();
	}));

	it(`should have as title 'board'`, async(() => {
		expect(component.title).toEqual('board');
	}));

	it('navigate to "authorization" takes you to /authorization', fakeAsync(() => {
		sessionStorage.clear();
		router.navigate(['/authorization']);
		tick(50);
		fixture.detectChanges();
		expect(location.path()).toBe('/authorization');
	}));

	it('navigate to "timeGrid" takes you to /boards', fakeAsync(() => {
		sessionStorage.setItem('mean-token', 'dfgdfgdg');
		router.navigate(['/boards']);
		tick(50);
		fixture.detectChanges();
		expect(location.path()).toBe('/boards');
	}));

	it('navigate to "timeGrid" takes you to /authorization', fakeAsync(() => {
		sessionStorage.clear();
		router.navigate(['/boards']);
		tick(50);
		fixture.detectChanges();
		expect(location.path()).toBe('/authorization');
	}));

	afterEach(() => {
		localStorage.removeItem('token');
	});
});
