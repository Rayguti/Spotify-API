import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { TableComponent } from "../../../shared/table/table.component";
import { ArtistAboutComponent } from "../../components/artist-about/artist-about.component";
import { Item } from '../../interfaces/tableItems.interfaces';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";

@Component({
    selector: 'app-artist-profile-page',
    standalone: true,
    templateUrl: './artist-profile-page.component.html',
    styleUrl: './artist-profile-page.component.css',
    imports: [TableComponent, ArtistAboutComponent, NavBarComponent]
})
export class ArtistProfilePageComponent {

  idArtist!: string;
  items: Item[] = [];
  artistImage: string = '';
  artistName: string = '';
  artistUrl: string = '';

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idArtist = params.get('id_artist') ?? '';
      this.getArtistTopTracks(this.idArtist);
    });
  }

  getArtistByID(id: string) {
    this.spotifyService.getArtistById(id)
      .subscribe(artist => {
        if (artist) {
          this.artistImage = artist.images[0].url;
          this.artistName = artist.name;
          this.artistUrl = artist.external_urls.spotify;
          console.log(artist);
        }
      });
  }

  getArtistTopTracks(id: string) {

    this.spotifyService.getArtistTopTracks(id)
      .subscribe(toptracks => {
        if (toptracks) {
          toptracks.tracks.forEach((item) => {
            let element: Item =
              {
                idTrack: item.id,
                albumName: item.album.name,
                albumPhoto: item.album.images[0].url,
                trackName: item.name
              };
            this.items.push(element);
          });

          // console.log(toptracks);
          this.getArtistByID(id);
        }

      });

  }
}
