import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Components
 */
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
/**
 * Guards
 */

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: '**', component: ScoreboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
