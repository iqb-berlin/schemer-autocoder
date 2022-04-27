import {Component, Input, OnInit} from '@angular/core';
import {VariableScheme} from "@response-scheme";

@Component({
  selector: 'var-scheme',
  templateUrl: './var-scheme.component.html',
  styleUrls: ['./var-scheme.component.scss']
})
export class VarSchemeComponent implements OnInit {
  @Input() varScheme: VariableScheme | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
