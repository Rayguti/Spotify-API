import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-artist-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './artist-about.component.html',
  styleUrl: './artist-about.component.css'
})
export class ArtistAboutComponent {
  @Input()
  name : string = '';

  @Input()
  image : string = '';

  @Input()
  url : string = '';

  constructor(private router: Router,
     private spotifyService: SpotifyService,
     private historyService: HistoryService
    ){}

  getLastPage():string{
    return this.historyService.getLastPage();
  }


}
