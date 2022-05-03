import {CodingScheme, ResponseData} from "@response-scheme";

export class AutoCoder {
  sourceValues: ResponseData[];

  constructor(sourceValues: ResponseData[]) {
    this.sourceValues = sourceValues;
  }

  run(codingScheme: CodingScheme[]): ResponseData[] {
    return this.sourceValues
  }
}
