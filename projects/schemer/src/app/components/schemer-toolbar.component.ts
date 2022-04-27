import { Component } from '@angular/core';import {FileService} from "../services/file.service";import {MainDataService} from "../services/main-data.service";@Component({  selector: 'schemer-toolbar',  template: `    <mat-toolbar>      <button mat-raised-button (click)="loadVarList()">        {{'toolbar.loadVarList' | translate}}        <mat-icon>file_upload</mat-icon>      </button>      <button mat-raised-button (click)="loadCodingScheme()">        {{'toolbar.loadCodingScheme' | translate}}        <mat-icon>file_upload</mat-icon>      </button>      <button mat-raised-button (click)="saveCodingScheme()">        {{'toolbar.saveCodingScheme' | translate}}        <mat-icon>file_download</mat-icon>      </button>    </mat-toolbar>  `,  styles: [    'mat-toolbar {background-color: #799}',    'button {margin: 15px}'  ]})export class SchemerToolbarComponent {  constructor(    private fileService: FileService,    private mainDataService: MainDataService  ) { }  saveCodingScheme(): void {    FileService.saveToFile(JSON.stringify(this.mainDataService.codingSchemes), 'coding-scheme.json');  }  async loadVarList(): Promise<void> {    this.mainDataService.varList = JSON.parse(await FileService.loadFile(['.json']));    this.mainDataService.varList.sort(function (a, b) {      const idA = a.id.toUpperCase();      const idB = b.id.toUpperCase();      if (idA < idB) return -1;      if (idA > idB) return 1;      return 0;    });    this.mainDataService.syncVariables();  }  async loadCodingScheme(): Promise<void> {    this.mainDataService.codingSchemes = JSON.parse(await FileService.loadFile(['.json']));    this.mainDataService.syncVariables();  }}