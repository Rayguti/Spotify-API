import { Component } from '@angular/core';
import { ArtistAboutComponent } from "../../components/artist-about/artist-about.component";
import { TableComponent } from "../../../shared/table/table.component";
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Item } from '../../interfaces/tableItems.interfaces';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-album-page',
    standalone: true,
    templateUrl: './album-page.component.html',
    styleUrl: './album-page.component.css',
    imports: [ArtistAboutComponent, TableComponent, NavBarComponent]
})
export class AlbumPageComponent {
  idArtist!: string;
  idAlbum!: string;
  items: Item[] = [];
  artistImage : string = '';
  artistName : string = '';
  artistUrl : string = '';

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idAlbum = params.get('id_album') ?? '';
      this.getAlbumInfo(this.idAlbum);
      
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

  getAlbumsTracks(id: string, albumPhoto_: string , albumName_: string, idArtist: string) {

    this.idArtist = idArtist;

    this.spotifyService.getAlbumsTracks(id)
      .subscribe(album => {
        if (album) {
          album.items.forEach((item) => {
            let element: Item = { idTrack: item.id, trackName: item.name, albumName: albumName_, albumPhoto:  albumPhoto_};
            this.items.push(element);
          });

          console.log(album);
          this.getArtistByID(idArtist);
        }

      });

  }

  getAlbumInfo(id: string ){
    this.spotifyService.getAlbumByID(id)
      .subscribe(album => {
        if (album) {
          this.getAlbumsTracks(id,album.images[0].url, album.name, album.artists[0].id);
          console.log(album);
         
        }

      });
  }
}
