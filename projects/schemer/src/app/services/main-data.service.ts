import {Injectable} from "@angular/core";import {VariableScheme, BasisVariableDef} from '@response-scheme';import {BehaviorSubject} from "rxjs";@Injectable({  providedIn: 'root'})export class MainDataService {  varList: BasisVariableDef[] = [];  codingSchemes: VariableScheme[] = [];  selectedScheme$ = new BehaviorSubject<VariableScheme | null>(null);  public syncVariables() {    this.varList.forEach(varScheme => {      const codingScheme = this.getSchemeById(varScheme.id);      if (!codingScheme) {        this.codingSchemes.push(<VariableScheme>{          id: varScheme.id,          label: varScheme.id,          deriveData: null,          transformations: [],          manualGeneralInstruction: '',          codes: []        })      }    });    this.codingSchemes.sort(function (a, b) {      const idA = a.id.toUpperCase();      const idB = b.id.toUpperCase();      if (idA < idB) return -1;      if (idA > idB) return 1;      return 0;    })  }  public filteredCodingSchemes(codingSchemes: VariableScheme[], checkForNull: boolean): VariableScheme[] {    const returnCodingSchemes: VariableScheme[] = [];    codingSchemes.forEach(cS => {      if ((cS.deriveData === null && checkForNull) || (cS.deriveData !== null && !checkForNull)) returnCodingSchemes.push(cS)    });    return returnCodingSchemes;  }  public getSchemeById(id: string): VariableScheme | null {    if (this.codingSchemes.length === 0) return null;    let variableScheme = null;    this.codingSchemes.forEach(codingScheme => {      if (codingScheme.id === id) {        variableScheme = codingScheme;      }    });    return variableScheme  }}