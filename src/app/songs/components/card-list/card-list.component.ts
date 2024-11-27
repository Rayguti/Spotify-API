import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";

import { SpotifyService } from '../../services/spotify.service';
import { Item as ItemLR} from '../../interfaces/lastRealeses.interfaces';
import { Item as ItemAlbum} from '../../interfaces/album.interfaces';

@Component({
    selector: 'app-card-list',
    standalone: true,
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css',
    imports: [CardComponent,CardComponent]
})
export class CardListComponent {

  ngOnInit() :void {

  }

  @Input()
  items : ItemLR[] | ItemAlbum[] | null  = [];

  constructor(
    private spotifyService: SpotifyService){
      
    }

}

