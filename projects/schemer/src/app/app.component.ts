import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container class="mainView" fxLayout="column" autosize hasBackdrop="false">
      <schemer-toolbar *ngIf="isStandalone()" (toggleDrawerClick)="drawer.toggle()"></schemer-toolbar>
      <div fxLayout="row">
        <schemer-stage fxFlex></schemer-stage>
        <mat-drawer #drawer mode="over" fxFlex="400px" fxLayout="column">
          <mat-toolbar fxLayout="row" fxLayoutAlign="space-between center">
            Antwortschema prüfen
            <button mat-button (click)="drawer.toggle()">
              <mat-icon>chevron_left</mat-icon>
            </button>
          </mat-toolbar>
          <schema-checker></schema-checker>
        </mat-drawer>
      </div>
    </mat-drawer-container>`,
  styles: [
    '.mainView {height: 100%;}'
  ]})
export class AppComponent {
  isStandalone = (): boolean => window === window.parent;
  title = 'schemer';
}
