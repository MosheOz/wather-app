import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FavorietsListComponent } from './favoriets-list/favoriets-list.component';

const routes: Routes = [
  { path: 'home', component: AutoCompleteComponent },
  { path: 'favoriets', component: FavorietsListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
