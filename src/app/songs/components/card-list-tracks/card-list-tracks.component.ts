import { Component, Input } from '@angular/core';
import { Track } from '../../interfaces/tracks.interfaces';
import { SpotifyService } from '../../services/spotify.service';
import { CardTrackComponent } from "../card-track/card-track.component";
import { Item } from '../../interfaces/search.interfaces';

@Component({
    selector: 'app-card-list-tracks',
    standalone: true,
    templateUrl: './card-list-tracks.component.html',
    styleUrl: './card-list-tracks.component.css',
    imports: [CardTrackComponent]
})
export class CardListTracksComponent {
  ngOnInit() :void {
    // console.log('hola');
    // this.printToken();
  }

  @Input()
  tracks : Item[] | null  = [];

  constructor(
    private spotifyService: SpotifyService){
      
    }

  // printToken(){
  //   this.spotifyService.getLastestAlbums()
  //     .subscribe(  search => {
  //       if(search){
  //         this.items = search.albums.items;
  //         console.log(this.items);
  //       }
  //     });

  // }
}
