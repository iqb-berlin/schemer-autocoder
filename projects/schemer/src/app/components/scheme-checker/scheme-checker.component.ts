import { Component } from '@angular/core';
import { ResponseData } from '@response-scheme';
import { AutoCoder } from '@auto-coder';
import { MatDialog } from '@angular/material/dialog';
import { MainDataService } from '../../services/main-data.service';
import { ShowCodingResultsComponent } from './show-coding-results.component';

@Component({
  selector: 'schema-checker',
  templateUrl: './scheme-checker.component.html',
  styleUrls: ['./scheme-checker.component.scss']
})
export class SchemeCheckerComponent {
  values: { [Key in string]: string } = {};

  constructor(
    public mainDataService: MainDataService,
    private showCodingResultsDialog: MatDialog
  ) { }

  updateInputValue(sourceElement: EventTarget | null, targetVariable: string) {
    if (sourceElement) this.values[targetVariable] = (sourceElement as HTMLInputElement).value;
  }

  startEvaluation() {
    const myValues: ResponseData[] = [];
    this.mainDataService.filteredCodings(this.mainDataService.codings, true).forEach(cs => {
      if (this.values[cs.id]) {
        myValues.push({
          id: cs.id,
          value: this.values[cs.id],
          status: 'VALUE_CHANGED'
        });
      } else {
        myValues.push({
          id: cs.id,
          value: null,
          status: 'NOT_SET'
        });
      }
    });
    const autoCoder = new AutoCoder(myValues);
    this.showCodingResultsDialog.open(ShowCodingResultsComponent, {
      width: '800px',
      data: autoCoder.run(this.mainDataService.codings)
    });
  }
}
