import {Injectable} from "@angular/core";import {CodingScheme, BasisVariableDef} from '@response-scheme';import {BehaviorSubject} from "rxjs";@Injectable({  providedIn: 'root'})export class MainDataService {  varList: BasisVariableDef[] = [];  codingSchemes: CodingScheme[] = [];  selectedScheme$ = new BehaviorSubject<CodingScheme | null>(null);  public syncVariables() {    this.varList.forEach(varScheme => {      const codingScheme = this.getSchemeById(varScheme.id);      if (!codingScheme) {        this.codingSchemes.push(<CodingScheme>{          id: varScheme.id,          label: varScheme.id,          sourceType: 'BASE',          deriveSources: [],          deriveSourceType: '',          valueTransformations: [],          manualGeneralInstruction: '',          codes: []        })      }    });    this.codingSchemes.sort(function (a, b) {      const idA = a.id.toUpperCase();      const idB = b.id.toUpperCase();      if (idA < idB) return -1;      if (idA > idB) return 1;      return 0;    })  }  public filteredCodingSchemes(codingSchemes: CodingScheme[], checkForNull: boolean): CodingScheme[] {    const returnCodingSchemes: CodingScheme[] = [];    codingSchemes.forEach(cS => {      if ((cS.sourceType === 'BASE' && checkForNull) || (cS.sourceType !== 'BASE' && !checkForNull)) returnCodingSchemes.push(cS)    });    return returnCodingSchemes;  }  public getSchemeById(id: string): CodingScheme | null {    if (this.codingSchemes.length === 0) return null;    let variableScheme = null;    this.codingSchemes.forEach(codingScheme => {      if (codingScheme.id === id) {        variableScheme = codingScheme;      }    });    return variableScheme  }}