import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterSheet } from './character-sheet/character-sheet.component';

const routes: Routes = [
  { path: '', component: CharacterSheet },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
