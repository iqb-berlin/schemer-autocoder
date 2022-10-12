import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { MainDataService } from '../services/main-data.service';
import { VosStartCommand } from '../services/verona-api.service';

@Component({
  selector: 'schemer-toolbar',
  template: `
    <button mat-fab [matMenuTriggerFor]="menu" matTooltip="Load/Save..." matTooltipPosition="above" fxFlex>
      <mat-icon>menu</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="loadVariables()">
        <mat-icon>input</mat-icon>{{'toolbar.loadVarList' | translate}}
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="loadCodingScheme()">
        <mat-icon>input</mat-icon>{{'toolbar.loadCodingScheme' | translate}}
      </button>
      <button mat-menu-item (click)="saveCodingScheme()">
        <mat-icon>get_app</mat-icon>{{'toolbar.saveCodingScheme' | translate}}
      </button>
      <button mat-menu-item (click)="toggleDrawerClick.emit()">
        <mat-icon>check</mat-icon>Antwortschema prüfen
      </button>
    </mat-menu>
  `,
  styles: [
    '.mat-fab {z-index: 999; position: absolute; top: 20px; right: 20px}'
  ]
})
export class SchemerToolbarComponent {
  @Output() toggleDrawerClick = new EventEmitter();

  constructor(
    private fileService: FileService,
    private mainDataService: MainDataService
  ) { }

  saveCodingScheme(): void {
    FileService.saveToFile(JSON.stringify({
      variables: this.mainDataService.varList,
      codings: this.mainDataService.codings
    }), 'coding-scheme.json');
  }

  async loadVariables(): Promise<void> {
    const vosStartCommandPayload: VosStartCommand = {
      type: 'vosStartCommand',
      sessionId: 'dev',
      codingScheme: JSON.stringify({
        variableCodings: this.mainDataService.codings
      }),
      codingSchemeType: '',
      variables: JSON.parse(await FileService.loadFile(['.json']))
    };
    this.postMessage(vosStartCommandPayload);
  }

  private postMessage = (message: VosStartCommand): void => {
    window.postMessage(message, '*');
  };

  async loadCodingScheme(): Promise<void> {
    const codingData = JSON.parse(await FileService.loadFile(['.json']));
    const vosStartCommandPayload: VosStartCommand = {
      type: 'vosStartCommand',
      sessionId: 'dev',
      codingScheme: JSON.stringify({
        variableCodings: codingData.codings
      }),
      codingSchemeType: 'iqb@1.1',
      variables: codingData.variables
    };
    this.postMessage(vosStartCommandPayload);
  }
}
