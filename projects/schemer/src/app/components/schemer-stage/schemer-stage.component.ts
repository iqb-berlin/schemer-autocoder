import { Component, OnInit } from '@angular/core';
import { MainDataService } from '../../services/main-data.service';
import { VariableInfo, VariableCodingData } from '@response-scheme';
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
  }

  selectVarScheme(varScheme: VariableCodingData | null = null) {
    this.mainDataService.selectedCoding$.next(varScheme);
  }

  addVarScheme() {
    this.addVarSchemeDialog().then((newVarScheme: VariableCodingData | boolean) => {
      if (typeof newVarScheme !== 'boolean') {
        this.mainDataService.addCoding(newVarScheme);
      }
    });
  }

  resetScheme() {
    this.mainDataService.selectedCoding$.next(null);
    this.mainDataService.invalidDataFormat = '';
    this.mainDataService.codingSchemeChanged.emit(this.mainDataService.variableCodingData);
  }

  async addVarSchemeDialog(): Promise<VariableCodingData | boolean> {
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
            return <VariableCodingData>{
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

  showBasicVarDetails(varBasic: VariableInfo) {
    alert(`Details für Basisvariable ${varBasic.id}`);
  }
}
