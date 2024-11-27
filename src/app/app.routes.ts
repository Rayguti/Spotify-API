import { Routes } from '@angular/router';
import { TracksPageComponent } from './songs/pages/tracks-page/tracks-page.component';
import { ArtistPageComponent } from './songs/pages/artist-page/artist-page.component';
import { MainPageComponent } from './songs/pages/main-page/main-page.component';
import { ArtistProfilePageComponent } from './songs/pages/artist-profile-page/artist-profile-page.component';
import { AlbumPageComponent } from './songs/pages/album-page/album-page.component';


export const routes: Routes = [
   
    {
        path: '',
        component: MainPageComponent,
    },

    {
        path: 'searches',
        children: [
            {
                path: 'by-artist',
                component: ArtistPageComponent
            },

            {
                path: 'by-track',
                component: TracksPageComponent
            },
            {
                path: 'top-track/:id_artist',
                component: ArtistProfilePageComponent
            },

            {
                path: 'album-tracks/:id_album',
                component: AlbumPageComponent
            },


            {
                path: '**',
                redirectTo: 'by-artist'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    },

];
