import { Component, OnInit } from '@angular/core';
import {MainDataService} from "../../services/main-data.service";

@Component({
  selector: 'schema-checker',
  templateUrl: './scheme-checker.component.html',
  styleUrls: ['./scheme-checker.component.scss']
})
export class SchemeCheckerComponent implements OnInit {
  values: { [Key in string]: string } = {};

  constructor(
    public mainDataService: MainDataService
  ) { }

  ngOnInit(): void {
  }

  updateInputValue(sourceElement: EventTarget | null, targetVariable: string) {
    if (sourceElement) this.values[targetVariable] = (sourceElement as HTMLInputElement).value;
  }

  startEvaluation() {
    console.log(this.values);
  }
}
