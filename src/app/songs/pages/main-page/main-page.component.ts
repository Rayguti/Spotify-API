import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { Item } from '../../interfaces/lastRealeses.interfaces';
import { SpotifyService } from '../../services/spotify.service';
import { HistoryService } from '../../services/history.service';

@Component({
    selector: 'page-main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    imports: [NavBarComponent, CardListComponent]
})
export class MainPageComponent {
    items : Item[] | null = [];

    ngOnInit(){
        this.getLastestAlbums();
        this.historyService.setLastPage('');
    }
    constructor(
      private spotifyService: SpotifyService,
      private historyService: HistoryService
    ){
        
      }
  
      getLastestAlbums(){
      this.spotifyService.getLastestAlbums()
        .subscribe(  search => {
          if(search){
            this.items = search.albums.items;
            console.log(this.items);
          }
        });
  
    }
}
