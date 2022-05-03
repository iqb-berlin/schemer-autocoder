import { Component, OnInit } from '@angular/core';
import {MainDataService} from "../../services/main-data.service";
import {ResponseData} from "@response-scheme";
import {AutoCoder} from "@auto-coder";
import {ShowCodingResultsComponent} from "./show-coding-results.component";
import {MatDialog} from "@angular/material/dialog";

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
    Object.keys(this.values).forEach(k => {
      myValues.push({
        id: k,
        value: this.values[k],
        status: "VALUE_CHANGED"
      })
    })
    const autoCoder = new AutoCoder(myValues);
    this.showCodingResultsDialog.open(ShowCodingResultsComponent, {
      width: '600px',
      data: autoCoder.run(this.mainDataService.codingSchemes)
    });
  }
}
