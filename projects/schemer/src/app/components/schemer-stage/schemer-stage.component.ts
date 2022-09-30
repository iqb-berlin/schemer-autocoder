import { Component, OnInit } from '@angular/core';
import { MainDataService } from '../../services/main-data.service';
import { BasisVariableDef, CodingScheme } from '@response-scheme';
import { MatDialog } from '@angular/material/dialog';
import { NewVarSchemeComponent, NewVarSchemeData } from '../new-var-scheme.component';
import { lastValueFrom, map } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';

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
    this.mainDataService.syncVariables();
    if (window === window.parent) document.documentElement.style.setProperty('--schemer-top-margin', '64px');
  }

  selectVarScheme(varScheme: CodingScheme | null = null) {
    this.mainDataService.selectedScheme$.next(varScheme);
  }

  addVarScheme() {
    this.addVarSchemeDialog().then((newVarScheme: CodingScheme | boolean) => {
      if (typeof newVarScheme !== 'boolean') {
        this.mainDataService.addCodingScheme(newVarScheme);
      }
    });
  }


  async addVarSchemeDialog(): Promise<CodingScheme | boolean> {
    this.selectVarScheme();
    const dialogRef = this.newVarSchemeDialog.open(NewVarSchemeComponent, {
      width: '600px',
      data: <NewVarSchemeData>{
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
              id: (<UntypedFormGroup>dialogResult).get('key')?.value.trim(),
              label: (<UntypedFormGroup>dialogResult).get('label')?.value.trim(),
              sourceType: 'DERIVE_CONCAT',
              deriveSources: [],
              deriveSourceType: 'CODE',
              valueTransformations: [],
              manualInstruction: '',
              codes: []
            };
          }
        }
        return false;
      })
    ));
  }

  deleteVarScheme() {

  }

  showBasicVarDetails(varBasic: BasisVariableDef) {
    alert(`Details für Basisvariable ${varBasic.id}`);
  }
}
