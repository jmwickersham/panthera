import { environment } from '../environments/environment';

// Modules
import * as Raven                             from 'raven-js';
import { NgModule, ErrorHandler }             from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations'
import { FormsModule }                        from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AppRoutingModule }                   from './app-routing.module';

// Components
import { AppComponent }        from './app.component';
import { MessagesComponent }   from './messages/messages.component';
import { TasksComponent }      from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { UsersComponent }      from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent }      from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { LandingComponent }    from './landing/landing.component';
import { ProfileComponent }    from './profile/profile.component';
import { SpotifyComponent }    from './spotify/spotify.component';
import { SteamComponent }      from './steam/steam.component';
import { TwitchComponent }     from './twitch/twitch.component';

// Services
import { MessageService }        from './services/message.service';
import { TaskService }           from './services/task.service';
import { UserService }           from './services/user.service';
import { SteamService }          from './services/integrations/steam.service';
import { SpotifyService }        from './services/integrations/spotify.service';
import { TwitchService }         from './services/integrations/twitch.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService }      from './services/auth-guard.service';


Raven
  .config('https://688f70971071467f95496cf225487ffc@sentry.io/1209803')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    MessagesComponent,
    TaskDetailComponent,
    UsersComponent,
    UserDetailComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ProfileComponent,
    TwitchComponent,
    SteamComponent,
    SpotifyComponent
  ],
  providers: [
    MessageService,
    TaskService,
    UserService,
    SpotifyService,
    SteamService,
    TwitchService,
    AuthenticationService,
    AuthGuardService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
