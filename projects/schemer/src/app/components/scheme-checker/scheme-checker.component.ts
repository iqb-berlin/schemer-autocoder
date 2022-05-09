import { Component, OnInit } from '@angular/core';
import { MainDataService } from '../../services/main-data.service';
import { ResponseData } from '@response-scheme';
import { AutoCoder } from '@auto-coder';
import { ShowCodingResultsComponent } from './show-coding-results.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'schema-checker',
  templateUrl: './scheme-checker.component.html',
  styleUrls: ['./scheme-checker.component.scss']
})
export class SchemeCheckerComponent implements OnInit {
  values: { [Key in string]: string } = {};

  constructor(
    public mainDataService: MainDataService,
    private showCodingResultsDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  updateInputValue(sourceElement: EventTarget | null, targetVariable: string) {
    if (sourceElement) this.values[targetVariable] = (sourceElement as HTMLInputElement).value;
  }

  startEvaluation() {
    const myValues: ResponseData[] = [];
    this.mainDataService.filteredCodingSchemes(this.mainDataService.codingSchemes, true).forEach(cs => {
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
      data: autoCoder.run(this.mainDataService.codingSchemes)
    });
  }
}
