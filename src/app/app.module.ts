import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChatComponent } from './chat/chat.component';
import { TrainBotComponent } from './train-bot/train-bot.component';
import { HomeComponent } from './home/home.component';
import { AgGridComponent } from './common/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ChatComponent,
    TrainBotComponent,
    AgGridComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'train-bot', component: TrainBotComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
