import { Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];
