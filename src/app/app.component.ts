import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { CardListComponent } from "./songs/components/card-list/card-list.component";
import { Item } from './songs/interfaces/lastRealeses.interfaces';
import { SearchBarComponent } from "./shared/search-bar/search-bar.component";
import { MainPageComponent } from "./songs/pages/main-page/main-page.component";
import { TableComponent } from "./shared/table/table.component";
import { HistoryComponent } from "./shared/history/history.component";
// import { AuthGuard } from './auth.guard';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavBarComponent, CardListComponent, SearchBarComponent, MainPageComponent, TableComponent, HistoryComponent]
})
export class AppComponent {
  title = 'Proyecto-Spotify';

  items : Item[] | null = [];

  receiveArrayFromChild(array: Item[]  | null) {
    this.items = array;
    console.log(this.items);
  }
}

