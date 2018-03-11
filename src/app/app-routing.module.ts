import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Components
 */
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { LoginComponent } from './components/login/login.component';
/**
 * Guards
 */

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '**', component: ScoreboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
