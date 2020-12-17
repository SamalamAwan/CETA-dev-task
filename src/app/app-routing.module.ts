import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDisplayComponent } from './user-display/user-display.component';
const routes: Routes = [
  {
    path: '',
    component: UserDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
