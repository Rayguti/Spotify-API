import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Realeses } from '../interfaces/lastRealeses.interfaces';
import { Artist } from '../interfaces/artist.interfaces';
import { Album , Item as AlbumByID} from '../interfaces/album.interfaces';
import { ArstistTracks } from '../interfaces/tracks.interfaces';
import { ArtistByID } from '../interfaces/artistByID.interfaces';
import { AlbumTracks } from '../interfaces/albumTracks.interfaces';
import { Search } from '../interfaces/search.interfaces';
import { AuthService } from './auth.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl: string = 'https://api.spotify.com/v1';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private historyService: HistoryService
  ) {

  }

  private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`,
      'Content-Type': 'application/json',
    });
  }


  getAlbumByID(id: string) : Observable<AlbumByID | null>{
    const url = `${this.apiUrl}/albums/${id}`; 

    return this.httpClient.get<AlbumByID>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getAlbumByID(id))
    );
  }
  
  getAlbumsTracks(id: string) : Observable<AlbumTracks | null>{
    const url = `${this.apiUrl}/albums/${id}/tracks`;//?limit=20&offset=0`; 

    return this.httpClient.get<AlbumTracks>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getAlbumsTracks(id))
    );
  }

  getArtistTopTracks(id: string) : Observable<ArstistTracks | null>{
    const url = `${this.apiUrl}/artists/${id}/top-tracks?market=ES`;

    return this.httpClient.get<ArstistTracks>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getArtistTopTracks(id))
    );
  }

  getArtistById(id : string) : Observable <ArtistByID | null> {
    
    const url = `${this.apiUrl}/artists/${id}`;

    return this.httpClient.get<ArtistByID>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getArtistById(id))
    );

  }

  searchArtist(search : string) : Observable <Artist | null> {
    
    const url = `${this.apiUrl}/search?query=${search}&type=artist&&offset=0&limit=1`;
    this.historyService.saveArtistSearch(search);
    return this.httpClient.get<Artist>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.searchArtist(search))
    );

  }

  searchTracks(search : string) : Observable <Search | null> {
    
    const url = `${this.apiUrl}/search?query=${search}&type=track&&offset=0&limit=20`;
    this.historyService.saveTrackSearch(search);
    return this.httpClient.get<Search>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.searchTracks(search))
    );

  }

  getAlbumByArtist(id: string) : Observable<Album | null>{

    const url = `${this.apiUrl}/artists/${id}/albums?limit=20&offset=0`;
    
    return this.httpClient.get<Album>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getAlbumByArtist(id))
    );

  }

  getLastestAlbums() : Observable<Realeses | null> {

    const url = `${this.apiUrl}/search?q=tag%3Anew&type=album&limit=20`; 
  
    return this.httpClient.get<Realeses>(url, {headers: this.createAuthHeaders()}).pipe(
      this.authService.handleAuthError(() => this.getLastestAlbums())
    );

  }


  
}
