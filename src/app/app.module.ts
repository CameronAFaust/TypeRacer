import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TypeRacerComponent } from './components/type-racer/type-racer.component';
import { NavComponent } from './components/nav/nav.component';
import { HighScoresComponent } from './components/high-scores/high-scores.component';
import { LoginPopupComponent } from './components/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TypeRacerComponent,
    NavComponent,
    HighScoresComponent,
    LoginPopupComponent,
    ProfileComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
