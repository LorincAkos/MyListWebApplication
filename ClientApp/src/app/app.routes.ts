import { Routes } from '@angular/router';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail.component';

export const routes: Routes = [
    { 
        path: "",
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: HomeComponent 
    },
    { 
        path: 'anime-list', 
        component: AnimeListComponent,
    },
    { 
        path: 'manga-list',
        component: MangaListComponent
    },
    { 
        path: 'anime/:id', 
        component: AnimeDetailComponent 
    }

];
