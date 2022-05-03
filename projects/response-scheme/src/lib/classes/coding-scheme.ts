import { BasisVariableDef } from './basis-variable-def';

export type RuleMethod = "MATCH" | "MATCH_REGEX" | "NUMERIC_RANGE" | "NUMERIC_LESS_THEN" | "NUMERIC_MORE_THEN" |
  "NUMERIC_MAX" | "NUMERIC_MIN" | "IS_EMPTY" | "ELSE";

export interface CodingRule {
    method: RuleMethod,
    parameters: string[],
}

export interface CodeData {
  id: number,
  label: string,
  score: number,
  rules: CodingRule[],
  manualInstruction: string
}

export interface CodingScheme {
  id: string,
  label: string,
  sourceType: 'BASE' | 'DERIVE_CONCAT' | 'DERIVE_SUM',
  deriveSources: string[],
  deriveSourceType: 'VALUE' | 'CODE' | 'SCORE',
  valueTransformations: string[],
  manualInstruction: string,
  codes: CodeData[],
}

export interface UnitCodingScheme {
    generalInstructions: string,
    basisVariables: BasisVariableDef[],
    codingScheme: CodingScheme[]
}
