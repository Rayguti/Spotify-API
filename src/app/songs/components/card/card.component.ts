import { Component, Input } from '@angular/core';
import { Item as ItemLR} from '../../interfaces/lastRealeses.interfaces';
import { Item as ItemAlbum} from '../../interfaces/album.interfaces';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  item! : ItemLR | ItemAlbum;

  constructor(private router: Router) {}

  // Ejemplo de método que navega a la ruta 'searches/top-track/:id_artist'
  navigateToTopTrack(idArtist: string): void {
    this.router.navigate(['/searches/top-track', idArtist]);
  }

  navigateToAlbumTracks(idAlbum: string): void {
    this.router.navigate(['/searches/album-tracks', idAlbum]);
  }
}
