export type CodingStatus = 'NOT_SET' | 'NOT_REACHED' | 'DISPLAYED' | 'VALUE_CHANGED' | 'VALUE_DERIVED' | 'SOURCE_MISSING' |
  'DERIVE_ERROR' | 'CODING_COMPLETE' | 'NO_CODING' | 'CODING_INCOMPLETE' | 'CODING_ERROR';

export interface ResponseData {
    id: string,
    status: CodingStatus;
    value: null | string | number | boolean | string[] | number[] | boolean[];
    code?: number;
    score?: number
}
