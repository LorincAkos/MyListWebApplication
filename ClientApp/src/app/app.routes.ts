import { Routes } from '@angular/router';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail.component';
import { AddRecordComponent } from './pages/add-record/add-record.component';
import { AnimeEditComponent } from './pages/anime-edit/anime-edit.component';
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaEditComponent } from './pages/manga-edit/manga-edit.component';
import { StorageComponent } from './pages/storage/storage.component';
import { ShopComponent } from './pages/shop/shop.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
        path: 'add-record',
        component: AddRecordComponent
    },
    { 
        path: 'anime/:id', 
        component: AnimeDetailComponent 
    },
    { 
        path: 'manga/:id', 
        component: MangaDetailComponent 
    },
    { 
        path: 'anime-edit',
        component: AnimeEditComponent
    },
    { 
        path: 'manga-edit',
        component: MangaEditComponent
    },
    { 
        path: 'storage',
        component: StorageComponent
    },
    { 
        path: 'shop',
        component: ShopComponent
    },
    { 
        path: 'login',
        component: LoginComponent
    },
    { 
        path: 'profile',
        component: ProfileComponent
    },

];
