import { Component, OnInit } from '@angular/core';
import {MainDataService} from "../../services/main-data.service";
import {BasisVariableDef, CodingScheme} from "@response-scheme";
import {MatDialog} from "@angular/material/dialog";
import {NewVarSchemeComponent} from "../new-var-scheme.component";
import {lastValueFrom, map} from "rxjs";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'schemer-stage',
  templateUrl: './schemer-stage.component.html',
  styleUrls: ['./schemer-stage.component.scss']
})
export class SchemerStageComponent implements OnInit {

  constructor(
    public mainDataService: MainDataService,
    private newVarSchemeDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  selectVarScheme(varScheme: CodingScheme | null = null) {
    this.mainDataService.selectedScheme$.next(varScheme);
  }

  addVarScheme() {
    this.addVarSchemeDialog().then((newVarScheme: CodingScheme | boolean) => {
      if (typeof newVarScheme !== 'boolean') {
        this.mainDataService.codingSchemes.push(newVarScheme);
        this.mainDataService.codingSchemes.sort(function (a, b) {
          const idA = a.id.toUpperCase();
          const idB = b.id.toUpperCase();
          if (idA < idB) return -1;
          if (idA > idB) return 1;
          return 0;
        })
      }
    })
  }


  async addVarSchemeDialog(): Promise<CodingScheme | boolean> {
    this.selectVarScheme();
    const dialogRef = this.newVarSchemeDialog.open(NewVarSchemeComponent, {
      width: '600px',
      data: {
        title: 'Neue Variable',
        key: '',
        label: ''
      }
    });
    return lastValueFrom(dialogRef.afterClosed().pipe(
      map(dialogResult => {
        if (typeof dialogResult !== 'undefined') {
          if (dialogResult !== false) {
            return <CodingScheme>{
              id: (<FormGroup>dialogResult).get('key')?.value.trim(),
              label: (<FormGroup>dialogResult).get('label')?.value.trim(),
              sourceType: 'DERIVE_CONCAT',
              deriveSources: [],
              deriveSourceType: 'CODE',
              valueTransformations: [],
              manualGeneralInstruction: '',
              codes: []
            }
          }
        }
        return false
      })
    ))
  }

  deleteVarScheme() {

  }

  showBasicVarDetails(varBasic: BasisVariableDef) {
    alert(`Details für Basisvariable ${varBasic.id}`);
  }
}
