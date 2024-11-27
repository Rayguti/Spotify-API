import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../shared/search-bar/search-bar.component";
import { CardListTracksComponent } from "../../components/card-list-tracks/card-list-tracks.component";
import { SpotifyService } from '../../services/spotify.service';
import { HistoryComponent } from "../../../shared/history/history.component";
import { Item, Tracks } from '../../interfaces/search.interfaces';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { HistoryService } from '../../services/history.service';


@Component({
    selector: 'app-tracks-page',
    standalone: true,
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.css',
    imports: [SearchBarComponent, CardListTracksComponent, HistoryComponent, NavBarComponent]
})
export class TracksPageComponent {
    
    items : Item[] | null = [];

    receivedData: string = '';

    ngOnInit() :void {
        if(this.historyService.historyTracks_.length > 0){
            this.searchTracks(this.historyService.historyTracks_[0]);
        }
        this.historyService.setLastPage('/searches/by-track');
      }

    constructor(private spotifyService: SpotifyService , 
        private historyService: HistoryService
    ){}

    searchTracks(search: string){

    this.spotifyService.searchTracks(search)
    .subscribe(search => {
        if(search){
            this.items = search.tracks.items;
            console.log(search);
        }

    });  

    }

    get History():string[]{
        return this.historyService.historyTracks_;
    }

    receiveData(data: string) {
        this.receivedData = data;
        this.items = [];
        this.searchTracks(this.receivedData);
    }
}
