import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './container/login/login.component';
import { NavBarComponent } from './container/nav-bar/nav-bar.component';
import { RegisterComponent } from './container/register/register.component';
import { AccueilComponent } from './container/accueil/accueil.component';
import { PokemonComponent } from './container/pokemon/pokemon.component';
import { NavBarCoComponent } from './container/nav-bar-co/nav-bar-co.component';
import { PokemonViewComponent } from './container/pokemon-view/pokemon-view.component';
import { DashboardComponent } from './container/dashbord/dashbord.component';
import { LogoutComponent } from './container/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    AccueilComponent,
    PokemonComponent,
    NavBarCoComponent,
    PokemonViewComponent,
    DashboardComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
