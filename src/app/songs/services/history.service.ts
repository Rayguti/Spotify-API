import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyArtists: string[] = [];
  private historyTracks: string[] = [];
  private lastPage: string = '';

  constructor() { 
    this.loadHistoryArtist();
    this.loadHistoryTracks();
  }

  setLastPage(lastpage : string){
    this.lastPage = lastpage;
  }

  getLastPage(){
    return  this.lastPage;
  }

  saveArtistSearch(search:string){
    if (this.historyArtists.includes(search)){
      this.historyArtists = this.historyArtists.filter((oldSearch) => oldSearch !== search);
    }
    this.historyArtists.unshift(search);
    this.historyArtists = this.historyArtists.splice(0,10);
    
    localStorage.setItem('historyArtists', JSON.stringify( this.historyArtists ));
  }

  saveTrackSearch(search:string){
    if (this.historyTracks.includes(search)){
      this.historyTracks = this.historyTracks.filter((oldSearch) => oldSearch !== search);
    }
    this.historyTracks.unshift(search);
    this.historyTracks = this.historyTracks.splice(0,10);
      
    localStorage.setItem('historyTracks', JSON.stringify( this.historyTracks ));

  }

  loadHistoryTracks(){
    if( !localStorage.getItem('historyTracks') ) return;
    this.historyTracks = JSON.parse (localStorage.getItem('historyTracks')!);
  }

  loadHistoryArtist(){
    if( !localStorage.getItem('historyArtists') ) return;
    this.historyArtists = JSON.parse (localStorage.getItem('historyArtists')!);
  }

  get historyArtists_() : string[] {
    return this.historyArtists;
  }

  get historyTracks_() : string[] {
    return this.historyTracks;
  }
}
