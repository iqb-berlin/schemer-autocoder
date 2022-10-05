import { EventEmitter, Injectable, Output } from '@angular/core';import { VariableInfo } from '@response-scheme';import { BehaviorSubject } from 'rxjs';import { Coding } from '../classes/coding.class';@Injectable({  providedIn: 'root'})export class MainDataService {  @Output() codingSchemeChanged = new EventEmitter<Coding[]>();  invalidDataFormat = '';  varList: VariableInfo[] = [];  codings: Coding[] = [];  selectedCoding$ = new BehaviorSubject<Coding | null>(null);  syncVariables() {    this.codings = this.varList      .reduce((accumulator, current) => {        if (!this.getCodingById(current.id)) {          accumulator.push(Coding.fromVariableInfo(current));        }        return accumulator;      }, this.codings);    MainDataService.sortByID(this.codings);    this.updateCodingsStatus();  }  addCoding(newCoding: Coding): void {    const haveAlready = this.codings.filter(c => c.id.toUpperCase() === newCoding.id.toUpperCase());    if (haveAlready.length === 0) {      this.codings.push(newCoding);      MainDataService.sortByID(this.codings);      this.setCodingSchemesChanged();    }  }  setSortedVarList(variables: VariableInfo[]): void {    this.varList = MainDataService.sortByID(variables);  }  private static sortByID<T>( array: Array<T & { id: string }>): Array<T & { id: string }> {    return array.sort((a, b) => {      const idA = a.id.toUpperCase();      const idB = b.id.toUpperCase();      if (idA < idB) return -1;      if (idA > idB) return 1;      return 0;    });  }  setCodingSchemesChanged(): void {    this.codingSchemeChanged.emit(this.codings);  }  filteredCodings(codings: Coding[], checkForBase: boolean): Coding[] {    return codings      .filter(c => (c.sourceType === 'BASE' && checkForBase) ||        (c.sourceType !== 'BASE' && !checkForBase));  }  allCodingIds(): string[] {    return this.codings.map(coding => coding.id);  }  getCodingById(id: string): Coding | undefined {    return this.codings.find(coding => coding.id === id);  }  removeCoding(selectedCoding: Coding) {    this.selectedCoding$.next(null);    this.codings = this.codings.filter(c => c.id !== selectedCoding.id);    this.codings.forEach(c => c.validate());    this.setCodingSchemesChanged();  }  updateCodingsStatus() {    const allVariableIds = this.allCodingIds();    this.codings.forEach(c => {      if (c.sourceType === 'BASE') {        c.validate()      } else if (c.deriveSources.length > 0) {        const invalidSources = c.deriveSources.filter(c => allVariableIds.indexOf(c) < 0)        if (invalidSources.length > 0) {          c.status = 'INVALID_SOURCE'        } else {          c.validate()        }      } else {        c.status = 'INVALID_SOURCE'      }    });  }}