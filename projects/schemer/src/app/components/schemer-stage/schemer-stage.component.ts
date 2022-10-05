import { Component, OnInit } from '@angular/core';
import { MainDataService } from '../../services/main-data.service';
import { VariableInfo } from '@response-scheme';
import { MatDialog } from '@angular/material/dialog';
import { NewVarSchemeComponent, NewVarSchemeData } from '../new-var-scheme.component';
import { lastValueFrom, map } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';
import { Coding } from '../../classes/coding.class';
import { ConfirmDialogComponent, ConfirmDialogData } from '../dialogs/confirm-dialog.component';
import { MessageDialogComponent, MessageDialogData, MessageType } from '../dialogs/message-dialog.component';

@Component({
  selector: 'schemer-stage',
  templateUrl: './schemer-stage.component.html',
  styleUrls: ['./schemer-stage.component.scss']
})
export class SchemerStageComponent implements OnInit {

  constructor(
    public mainDataService: MainDataService,
    private newVarSchemeDialog: MatDialog,
    private confirmDialog: MatDialog,
    private messageDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mainDataService.syncVariables();
  }

  selectVarScheme(coding: Coding | null = null) {
    this.mainDataService.selectedCoding$.next(coding);
  }

  addVarScheme() {
    this.addVarSchemeDialog().then((newCoding: Coding | boolean) => {
      if (typeof newCoding !== 'boolean') {
        this.mainDataService.addCoding(newCoding);
        this.mainDataService.updateCodingsStatus();
      }
    });
  }

  resetScheme() {
    this.mainDataService.selectedCoding$.next(null);
    this.mainDataService.invalidDataFormat = '';
    this.mainDataService.setCodingSchemesChanged();
  }

  async addVarSchemeDialog(): Promise<Coding | boolean> {
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
            return new Coding({
              id: (<UntypedFormGroup>dialogResult).get('key')?.value.trim(),
              label: (<UntypedFormGroup>dialogResult).get('label')?.value.trim(),
              sourceType: 'DERIVE_CONCAT',
              deriveSources: [],
              deriveSourceType: 'CODE',
              valueTransformations: [],
              manualInstruction: '',
              codes: []
            });
          }
        }
        return false;
      })
    ));
  }

  deleteVarScheme() {
    const selectedCoding = this.mainDataService.selectedCoding$.getValue();
    if (selectedCoding && selectedCoding.sourceType !== 'BASE') {
      const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: <ConfirmDialogData>{
          title: 'Löschen abgeleitete Variable',
          content: `Die Variable "${selectedCoding.id}" wird gelöscht. Fortsetzen?`,
          confirmButtonLabel: 'Löschen',
          showCancel: true
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== false) {
          this.mainDataService.removeCoding(selectedCoding);
          this.mainDataService.updateCodingsStatus();
        }
      });
    } else {
      this.messageDialog.open(MessageDialogComponent, {
        width: '400px',
        data: <MessageDialogData>{
          title: 'Löschen Variable',
          content: 'Bitte erst eine abgeleitete Variable auswählen!',
          type: MessageType.error
        }
      });
    }
  }

  showBasicVarDetails(varBasic: VariableInfo) {
    alert(`Details für Basisvariable ${varBasic.id}`);
  }
}
