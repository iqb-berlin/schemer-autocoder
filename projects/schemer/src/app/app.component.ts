import { Component } from '@angular/core';
import { UnitCodingScheme } from 'projects/response-scheme/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schemer';
  unitCodingScheme: UnitCodingScheme = {
    generalInstructions: 'yoyo',
    basisVariables: [],
    codingScheme: []
  }
}
