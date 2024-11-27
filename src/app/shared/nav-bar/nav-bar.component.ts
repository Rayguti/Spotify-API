import { Component, EventEmitter, Output } from '@angular/core';
import { SpotifyService } from '../../songs/services/spotify.service';
import { Item } from '../../songs/interfaces/lastRealeses.interfaces';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../songs/services/auth.service';



@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  items : Item[] | null = [];

  constructor(
    private spotifyService: SpotifyService, private authService: AuthService,private router: Router){
      
    }
  
  printToken(){
    this.spotifyService.getLastestAlbums()
      .subscribe(  search => {
        if(search){
          this.items = search.albums.items;
          console.log(this.items);
          
        }
      });
  }

  @Output() dataEvent = new EventEmitter<Item[] | null>();
  
  sendArrayToParent() {
    
    this.dataEvent.emit(this.items);
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
