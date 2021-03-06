import { environment } from '../environments/environment';

// Modules
import * as Raven                     from 'raven-js';
import { NgModule, ErrorHandler }     from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

// App Root
import { AppComponent } from './app.component';

// Feature Modules
import { CoreModule } from './core/core.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

if (environment.production) {
  Raven
    .config('https://688f70971071467f95496cf225487ffc@sentry.io/1209803')
    .install();
}

export class RavenErrorHandler extends ErrorHandler {
  handleError(err:any) : void {
    if (environment.production) {
      Raven.captureException(err);
    }
    super.handleError(err);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [ 
    AppComponent 
  ]
})

export class AppModule { }
