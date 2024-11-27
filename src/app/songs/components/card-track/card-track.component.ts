import { Component, Input } from '@angular/core';
import { Track } from '../../interfaces/tracks.interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Item } from '../../interfaces/search.interfaces';

@Component({
  selector: 'app-card-track',
  standalone: true,
  imports: [],
  templateUrl: './card-track.component.html',
  styleUrl: './card-track.component.css'
})
export class CardTrackComponent {

  @Input()
  track! : Item;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}


  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToTopTrack(idArtist: string): void {
    this.router.navigate(['/searches/top-track', idArtist]);
  }
}
