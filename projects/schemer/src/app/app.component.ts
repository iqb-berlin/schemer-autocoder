import { Component, OnInit } from '@angular/core';
import { VeronaAPIService, VosStartCommand } from './services/verona-api.service';
import { MetaDataService } from './services/meta-data.service';
import { MainDataService } from './services/main-data.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container class="mainView" fxLayout="column" autosize hasBackdrop="false">
      <schemer-toolbar *ngIf="isStandalone" (toggleDrawerClick)="drawer.toggle()"></schemer-toolbar>
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
  ] })
export class AppComponent implements OnInit {
  isStandalone: boolean = window === window.parent;
  title = 'schemer';

  constructor(private veronaAPIService: VeronaAPIService,
              private metaDataService: MetaDataService,
              private mainDataService: MainDataService) {
  }

  ngOnInit(): void {
    this.veronaAPIService.sendVosReadyNotification(this.metaDataService.metadata);
    this.veronaAPIService.vosStartCommand
      .subscribe((message: VosStartCommand) => this.setVariables(message));
  }

  private setVariables(message: VosStartCommand): void {
    this.mainDataService.selectedScheme$.next(null);
    this.mainDataService.varList = message.variables;
    this.mainDataService.codingSchemes = [];
    this.mainDataService.varList.sort(function (a, b) {
      const idA = a.id.toUpperCase();
      const idB = b.id.toUpperCase();
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });
    this.mainDataService.syncVariables();
  }
}
