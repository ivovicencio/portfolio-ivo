import { Routes } from '@angular/router';
import { HomeComponent } from './components/layouts/home/home';
import { ProjectsComponent } from './components/projects/projects';
import { ContactMe } from './components/contact-me/contact-me';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'contact-me',
        component: ContactMe
    },

    // Redirección de seguridad
  { path: '**', redirectTo: 'home' }
];
