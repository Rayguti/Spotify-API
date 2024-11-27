import { Component } from '@angular/core';
import { CardListComponent } from "../../components/card-list/card-list.component";
import { SearchBarComponent } from "../../../shared/search-bar/search-bar.component";
import { SpotifyService } from '../../services/spotify.service';
import { Item } from '../../interfaces/album.interfaces';
import { HistoryComponent } from "../../../shared/history/history.component";
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { HistoryService } from '../../services/history.service';


@Component({
    selector: 'app-artist-page',
    standalone: true,
    templateUrl: './artist-page.component.html',
    styleUrl: './artist-page.component.css',
    imports: [CardListComponent, SearchBarComponent, HistoryComponent, NavBarComponent]
})
export class ArtistPageComponent {

    items : Item[] | null = [];
    receivedData: string = '';

    ngOnInit() :void {
        if(this.historyService.historyArtists_.length > 0){
            this.searchAlbums(this.historyService.historyArtists_[0]);
        }
        this.historyService.setLastPage('/searches/by-artist');
      }
    constructor(private spotifyService: SpotifyService,
        private historyService: HistoryService
    ){}

    searchAlbums(id: string){

    this.spotifyService.searchArtist(id)
        .subscribe(  artists => {
        if(artists){
            console.log(artists.artists.items[0].id);
            this.spotifyService.getAlbumByArtist(artists.artists.items[0].id)
            .subscribe(album => {
                if(album){
                    this.items = album.items;
                    console.log(album);
                }

            });  
        }
        });
    }

    get History():string[]{
        return this.historyService.historyArtists_;
    }

    receiveData(data: string) {
        this.receivedData = data;
        this.searchAlbums(this.receivedData);
    }
    
}
