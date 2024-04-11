import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './container/login/login.component';
import { RegisterComponent } from './container/register/register.component';
import { AccueilComponent } from './container/accueil/accueil.component';
import { PokemonComponent } from './container/pokemon/pokemon.component';
import { PokemonViewComponent } from './container/pokemon-view/pokemon-view.component';
import { DashboardComponent } from './container/dashbord/dashbord.component';
import { LogoutComponent } from './container/logout/logout.component';
const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pokemons', component: PokemonComponent},
  {path: 'pokemon/:id', component: PokemonViewComponent },
  {path: 'dashbord', component: DashboardComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
