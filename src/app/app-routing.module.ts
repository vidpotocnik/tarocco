import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Components
 */
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
/**
 * Guards
 */

const routes: Routes = [
  { path: '**', component: ScoreboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
