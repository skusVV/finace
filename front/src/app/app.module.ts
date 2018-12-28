import { NgtUniversalModule } from '@ng-toolkit/universal';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from '../store/effects/user.effect';
import { metaReducers, reducerToken, reducerProvider } from '../store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from '../services/guards/auth.guard';
import {RouterEffects} from '../store/effects/router.effect';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:[
    SharedModule,
    NgtUniversalModule,
    HttpClientModule,
    StoreModule.forRoot(reducerToken, { metaReducers }),
    EffectsModule.forRoot([UserEffect, RouterEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [
    reducerProvider,
    AuthGuard
  ],
})
export class AppModule { }
