import {CodingScheme, ResponseData} from "@response-scheme";
import {CoderVariableClass} from "./coder-variable.class";

export class AutoCoder {
  sourceValues: ResponseData[];

  constructor(sourceValues: ResponseData[]) {
    this.sourceValues = sourceValues;
  }

  run(codingScheme: CodingScheme[]): ResponseData[] {
    let usedSources: string[] = [];
    let coderVariables: CoderVariableClass[] = [];
    this.sourceValues.forEach(v => {
      let myCodingScheme: CodingScheme | null = null;
      codingScheme.forEach(cs => {
        if (cs.id === v.id) myCodingScheme = cs
      });
      coderVariables.push(new CoderVariableClass(v, myCodingScheme));
      usedSources.push(v.id);
    })
    codingScheme.forEach(cs => {
      if (usedSources.indexOf(cs.id) < 0) coderVariables.push(new CoderVariableClass(null, cs));
    });
    let changed = true;
    let cycleCount = 0;
    while (changed && cycleCount < 1000) {
      changed = false;
      cycleCount += 1;
      coderVariables.forEach(cv => {
        if (cv.deriveAndCode_changesMade(coderVariables)) changed = true;
      })
    }
    if (cycleCount >= 1000) console.log('iteration cancelled');
    return coderVariables
  }
}
