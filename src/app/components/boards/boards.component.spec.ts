import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsComponent } from './boards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material';
import * as mock from 'src/testing/mock';
import { Location } from '@angular/common';
import { TimeGridComponent } from '../grid/timeGrid.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ResizableModule } from 'angular-resizable-element';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardComponent } from './board/board.component';
import { AppComponent } from 'src/app/app.component';
import { EventTicketComponent } from '../events/event-ticket/event-ticket.component';
import { EventComponent } from '../events/event/event.component';
import { MyBoardComponent } from './my-board/my-board.component';
import { TokenExistsGuard } from 'src/app/services/guards/token-exists.guard';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';
import { AuthStoreService, BoardStoreService } from 'src/app/store/services';
import { TokenNotExistsGuard } from 'src/app/services/guards/token-not-exists.guard';

describe('BoardsComponent', () => {
	let component: BoardsComponent;
	let fixture: ComponentFixture<BoardsComponent>;
	let boardStoreService: BoardStoreService;
	let location: Location;

    beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				FormsModule,
				ReactiveFormsModule,
				NoopAnimationsModule,
				BrowserModule,
				BrowserAnimationsModule,
				MatSnackBarModule,
				ResizableModule,
				RouterTestingModule.withRoutes(mock.routesForBoards),

			],
			declarations: [
				BoardComponent,
				BoardsComponent,
				TimeGridComponent,
				AppComponent,
				EventTicketComponent,
				EventComponent,
				MyBoardComponent,
				NavbarComponent
			],
			providers: [
				TokenNotExistsGuard,
				TokenExistsGuard
			]
		})
			.overrideComponent(BoardsComponent, {
				set: {
					providers: [
						{ provide: BoardStoreService, useClass: BoardStoreServiceStub },
						{ provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub },

					]
				}
			})
			.compileComponents().then(() => {
				location = TestBed.get(Location);

				fixture = TestBed.createComponent(BoardsComponent);
				component = fixture.componentInstance;
				boardStoreService = fixture.debugElement.injector.get(BoardStoreService);
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should call accept method', () => {
		const spy = spyOn(boardStoreService, 'accept');
		component.acceptBoard(null);
		expect(spy).toHaveBeenCalledWith(null);
	});
	it('should call decline method', () => {
		const spy = spyOn(boardStoreService, 'decline');
		component.declineBoard(null);
		expect(spy).toHaveBeenCalledWith(null);
	});
});
