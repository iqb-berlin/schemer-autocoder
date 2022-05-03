import {CodingScheme, ResponseData} from "@response-scheme";

export class AutoCoder {
  sourceValues: ResponseData[];

  constructor(sourceValues: ResponseData[]) {
    this.sourceValues = sourceValues;
  }

  run(codingScheme: CodingScheme[]): ResponseData[] {
    const result = this.sourceValues;
    this.sourceValues.forEach(v => {
      result.push(v);
      result.push(v);
      result.push(v);
      result.push(v);
      result.push(v);
      result.push(v);
      result.push(v);
      result.push(v);
    })
    return result
  }
}
