import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HostDashboardComponent } from './host/host-dashboard/host-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './host/quiz-creation/questions/questions.component';
import { QuizComponent } from './host/quiz/quiz.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { GameComponent } from './host/game/game.component';
import { GamerGameplayComponent } from './player/gamer-gameplay/gamer-gameplay.component';
import { HostGameplayComponent } from './host/host-gameplay/host-gameplay.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { PodiumComponent } from './podium/podium.component';
import { EditQuestionsComponent } from './host/edit-questions/edit-questions.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { QuizCreationComponent } from './host/quiz-creation/quiz-creation.component';
import { NavigationComponent } from './host/navigation/navigation.component';
import { ToolbarComponent } from './host/toolbar/toolbar.component';
import { NewQuestionComponent } from './host/quiz-creation/new-question/new-question.component';
import { QuizOptionComponent } from './host/quiz-creation/quiz-option/quiz-option.component';
import { ItemTogglerComponent } from './host/quiz-creation/item-toggler/item-toggler.component';
import { NewOptionComponent } from './host/quiz-creation/new-option/new-option.component';
import { HostHomeComponent } from './host/host-home/host-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HostDashboardComponent,
    QuestionsComponent,
    QuizComponent,
    GameComponent,
    GamerGameplayComponent,
    HostGameplayComponent,
    PodiumComponent,
    EditQuestionsComponent,
    ScoreboardComponent,
    QuizCreationComponent,
    NavigationComponent,
    ToolbarComponent,
    NewQuestionComponent,
    QuizOptionComponent,
    ItemTogglerComponent,
    NewOptionComponent,
    HostHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSortModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '940579741287-kfuigse06tgq7anb7v6a03llnl7ph1gp.apps.googleusercontent.com'
          )
        }]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
