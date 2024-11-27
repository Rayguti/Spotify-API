import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../songs/interfaces/tracks.interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpotifyService } from '../../songs/services/spotify.service';
import { Item } from '../../songs/interfaces/tableItems.interfaces';

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input()
  items!:Item[];

  constructor(private sanitizer: DomSanitizer , private spotifyService: SpotifyService) {}
  
  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
