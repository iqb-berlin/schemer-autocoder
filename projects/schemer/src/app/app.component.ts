import { Component } from '@angular/core';
import { UnitCodingScheme } from 'projects/response-scheme/src/public-api';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="column" class="mainView">
      <schemer-toolbar *ngIf="isStandalone()"></schemer-toolbar>
      <schemer-stage fxFlex></schemer-stage>
    </div>`,
  styles: [
    '.mainView {height: 100%;}'
  ]})
export class AppComponent {
  isStandalone = (): boolean => window === window.parent;
  title = 'schemer';
  unitCodingScheme: UnitCodingScheme = {
    generalInstructions: 'yoyo',
    basisVariables: [],
    codingScheme: []
  }
}
