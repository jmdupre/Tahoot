import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HostDashboardComponent } from './host/host-dashboard/host-dashboard.component';
import { QuestionsComponent } from './host/quiz-creation/questions/questions.component';
import { QuizComponent } from './host/quiz/quiz.component';
import { GameComponent } from './host/game/game.component';
import { GamerGameplayComponent } from './player/gamer-gameplay/gamer-gameplay.component';
import { HostGameplayComponent } from './host/host-gameplay/host-gameplay.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'host-dashboard', pathMatch: 'full' },
  // {path: 'signin', component: SigninComponent},
  { path: 'host-dashboard', component: HostDashboardComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'game', component: GameComponent },
  { path: 'gamer-gameplay', component: GamerGameplayComponent },
  { path: 'host-gameplay', component: HostGameplayComponent },
  { path: 'scoreboard', component: ScoreboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
