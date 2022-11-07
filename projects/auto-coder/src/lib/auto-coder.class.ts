import { VariableCodingData, ResponseData } from '@iqb/responses';
import { CoderVariableClass } from './coder-variable.class';

export class AutoCoder {
  sourceValues: ResponseData[];
  changed = false;

  constructor(sourceValues: ResponseData[]) {
    this.sourceValues = sourceValues;
  }

  run(codingScheme: VariableCodingData[]): ResponseData[] {
    const usedSources: string[] = [];
    const coderVariables: CoderVariableClass[] = [];
    this.sourceValues.forEach(v => {
      let myCodingScheme: VariableCodingData | null = null;
      codingScheme.forEach(cs => {
        if (cs.id === v.id) myCodingScheme = cs;
      });
      coderVariables.push(new CoderVariableClass(v, myCodingScheme));
      usedSources.push(v.id);
    });
    codingScheme.forEach(cs => {
      if (usedSources.indexOf(cs.id) < 0) coderVariables.push(new CoderVariableClass(null, cs));
    });
    this.changed = true;
    let cycleCount = 0;
    while (this.changed && cycleCount < 1000) {
      this.changed = false;
      cycleCount += 1;
      coderVariables.forEach(cv => {
        if (cv.deriveAndCode_changesMade(coderVariables)) this.changed = true;
      });
    }
    if (cycleCount >= 1000) console.log('iteration cancelled');
    return coderVariables;
  }
}
