import {Component, Input, OnInit} from '@angular/core';
import {CodingScheme} from "@response-scheme";

@Component({
  selector: 'var-scheme',
  templateUrl: './coding-scheme.component.html',
  styleUrls: ['./coding-scheme.component.scss']
})
export class CodingSchemeComponent implements OnInit {
  @Input() codingScheme: CodingScheme | null = null;
  @Input() allVariables: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getNewSources(usedVars: string[]) {
    const returnSources: string[] = [];
    this.allVariables.forEach(v => {
      if (this.codingScheme && usedVars.indexOf(v) < 0 && v !== this.codingScheme.id) returnSources.push(v);
    });
    returnSources.sort();
    return returnSources
  }

  deleteDeriveSource(source: string) {
    if (this.codingScheme) {
      const sourcePos = this.codingScheme.deriveSources.indexOf(source);
      if (sourcePos >= 0) this.codingScheme.deriveSources.splice(sourcePos, 1);
    }
  }

  addDeriveSource(v: string) {
    if (this.codingScheme) {
      this.codingScheme.deriveSources.push(v);
      this.codingScheme.deriveSources.sort();
    }
  }

  alterValueTransformation(transId: string, checked: boolean) {
    if (this.codingScheme) {
      const transPos = this.codingScheme.valueTransformations.indexOf(transId);
      if (checked && transPos < 0) {
        this.codingScheme.valueTransformations.push(transId);
      } else if (!checked && transPos >= 0) {
        this.codingScheme.valueTransformations.splice(transPos, 1);
      }
    }
  }
}
