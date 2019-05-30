import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './components/events/event/event.component';
import { TimeGridComponent } from './components/grid/timeGrid.component';

import { BoardsComponent } from './components/boards/boards.component';
import { MyBoardComponent } from './components/boards/my-board/my-board.component';
import { BoardComponent } from './components/boards/board/board.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { TokenExistsGuard } from './services/guards/token-exists.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventModifierComponent } from './components/events/event-modifier/event-modifier.component';
import { EventTicketComponent } from './components/events/event-ticket/event-ticket.component';
import { BoardModifierComponent } from './components/boards/board-modifier/board-modifier.component';
import { ResizableModule } from 'angular-resizable-element';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthDataService } from './store/auth/auth.data.service';
import { BoardDataService } from './store/board/board.data.service';
import { EventDataService } from './store/event/event.data.service';
import { UserDataService } from './store/user/user.data.service';
import { DatePipe } from '@angular/common';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AuthComponent } from './components/auth/auth.component';
import { EqualPipe } from './pipes/equal.pipe';
import { NotEqualPipe } from './pipes/not-equal.pipe';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { NotificationsComponent } from './components/navbar/notifications/notifications.component';

import { AuthEffects, BoardEffects } from './store/effects';
import { AuthStoreService, BoardStoreService } from './store/services';
import { AppReducer } from './store/reducers';
import { TokenNotExistsGuard } from './services/guards/token-not-exists.guard';
import { UserChipComponent } from './shared/user-chip/user-chip.component';
import { BoardModifierContainerComponent } from './components/boards/board-modifier-container/board-modifier-container.component';
import { TokenInterceptor } from './services/token.interceptor';
import { BoardsContainerComponent } from './containers/boards-container.component';
import { DatePeriodPipe } from './pipes/date-period.pipe';
import { EventModifierContainerComponent } from './components/events/event-modifier-container/event-modifier-container.component';

export const appRoutes: Routes = [
	{ path: 'sign-in', component: AuthComponent, canActivate: [TokenNotExistsGuard] },
	{ path: 'sign-up', component: AuthComponent, canActivate: [TokenNotExistsGuard] },
	{ path: '', redirectTo: 'boards', pathMatch: 'full' },
	{ path: '', component: BoardsContainerComponent, canActivate: [TokenExistsGuard],  children: [
		{
			path: 'boards',
			component: BoardsComponent,
			canActivate: [TokenExistsGuard]
		},
		{ path: 'boards/my', component: MyBoardComponent, canActivate: [TokenExistsGuard] },
		{ path: 'boards/:id', component: BoardComponent, canActivate: [TokenExistsGuard] },
	]},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	declarations: [
		AppComponent,
		EventComponent,
		TimeGridComponent,
		NavbarComponent,
		SignUpComponent,
		SignInComponent,
		EventTicketComponent,
		BoardsComponent,
		BoardModifierComponent,
		MyBoardComponent,
		BoardComponent,
		AuthComponent,
		EqualPipe,
		NotEqualPipe,
		DatePeriodPipe,
		MenuComponent,
		NotificationsComponent,
		UserChipComponent,
		BoardModifierContainerComponent,
		BoardsContainerComponent,
		EventModifierContainerComponent,
		EventModifierComponent
	],

	imports: [
		ResizableModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes),
		MatSnackBarModule,
		StoreModule.forRoot({}),
		StoreModule.forFeature('app', AppReducer.reducer),
		EffectsModule.forRoot([
			BoardEffects,
			AuthEffects
		])
	],
	providers: [
		UserDataService,
		EventDataService,
		BoardDataService,
		AuthDataService,
		BoardStoreService,
		AuthStoreService,
		DatePipe,
		TokenExistsGuard,
		TokenNotExistsGuard,
		EqualPipe,
		NotEqualPipe,
		DatePeriodPipe,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	entryComponents: [
		BoardModifierComponent,
		EventModifierComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
