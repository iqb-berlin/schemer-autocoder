import {
  CodeData, ValueTransformation, VariableCodingData, VariableInfo
} from '@iqb/responses';

export class Coding implements VariableCodingData {
  status: 'INVALID_SOURCE' | 'EMPTY' | 'HAS_CODES';
  id: string;
  sourceType: 'BASE' | 'DERIVE_CONCAT' | 'DERIVE_SUM';
  codes: CodeData[];
  deriveSourceType: 'VALUE' | 'CODE' | 'SCORE';
  deriveSources: string[];
  label: string;
  manualInstruction: string;
  valueTransformations: ValueTransformation[];

  constructor(variableCodingData: Partial<VariableCodingData>) {
    this.id = variableCodingData.id || '???';
    this.sourceType = variableCodingData.sourceType || 'BASE';
    this.codes = variableCodingData.codes || [];
    this.status = this.codes.length > 0 ? 'HAS_CODES' : 'EMPTY';
    this.deriveSourceType = variableCodingData.deriveSourceType || 'VALUE';
    this.deriveSources = variableCodingData.deriveSources || [];
    this.label = variableCodingData.label || '';
    this.manualInstruction = variableCodingData.manualInstruction || '';
    this.valueTransformations = variableCodingData.valueTransformations || [];
  }

  validate() {
    this.status = (this.codes.length > 0 || this.manualInstruction.length > 0) ? 'HAS_CODES' : 'EMPTY';
  }

  copyFullFrom(sourceCoding: Coding) {
    const dataSerialized = JSON.stringify(sourceCoding); // decouple objects
    const data: Coding = JSON.parse(dataSerialized);
    if (this.sourceType !== 'BASE' && data.sourceType !== 'BASE') {
      this.sourceType = data.sourceType || 'BASE';
      this.deriveSourceType = data.deriveSourceType || 'VALUE';
      this.deriveSources = data.deriveSources || [];
      this.deriveSources = this.deriveSources.filter(ds => ds !== this.id);
    }
    this.codes = data.codes || [];
    this.status = this.codes.length > 0 ? 'HAS_CODES' : 'EMPTY';
    this.label = data.label || '';
    this.manualInstruction = data.manualInstruction || '';
    this.valueTransformations = data.valueTransformations || [];
  }

  static fromVariableInfo(varInfo: VariableInfo): Coding {
    return new Coding({
      id: varInfo.id,
      label: varInfo.id,
      sourceType: 'BASE',
      deriveSources: [],
      deriveSourceType: 'CODE',
      valueTransformations: [],
      manualInstruction: '',
      codes: []
    });
  }
}
