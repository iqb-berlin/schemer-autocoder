import { BasisVariableDef } from './basis-variable-def';

export const schemeTypes: Record<string, string> = {
  'BASE': 'Basisvariable',
  'DERIVE_CONCAT': 'Ableiten: Kopieren/Aneinanderketten',
  'DERIVE_SUM': 'Ableiten: Summieren (numerisch)'
}

export const deriveSourceTypes: Record<string, string> = {
    'VALUE': 'Wert',
    'CODE': 'Code',
    'SCORE': 'Bewertung'
};

export type TransformMethod = 'TO_UPPER' | 'REMOVE_WHITE_SPACES' | 'DATE_TO_ISO' | 'TIME_TO_ISO';

export const transformMethods: Record<string, string> = {
    'TO_UPPER': 'In Großbuchstaben umwandeln',
    'REMOVE_WHITE_SPACES': 'Leerzeichen entfernen',
    'DATE_TO_ISO': 'Datum zu ISO-Format JJJJ-MM-TT',
    'TIME_TO_ISO': 'Zeit zu ISO-Format hh:mm:ss'
}

export const METHOD_KEY_ELSE = 'ELSE';
export const METHOD_KEY_EMPTY = 'IS_EMPTY';

export interface RuleData {
    label: string,
    minParameterCount: number,
    maxParameterCount: number
}

export const ruleDefinitions: Record<string, RuleData> = {
  'MATCH': {label: 'Übereinstimmung', minParameterCount: 1, maxParameterCount: -1},
  'MATCH_REGEX': {label: 'Übereinstimmung regulärer Ausdruck', minParameterCount: 1, maxParameterCount: -1},
  'NUMERIC_RANGE': {label: 'Numerischer Bereich: min < Wert <= max', minParameterCount: 2, maxParameterCount: 2},
  'NUMERIC_LESS_THEN': {label: 'Numerisch: Kleiner als', minParameterCount: 1, maxParameterCount: 1},
  'NUMERIC_MORE_THEN': {label: 'Numerisch: Größer als', minParameterCount: 1, maxParameterCount: 1},
  'NUMERIC_MAX': {label: 'Numerisch: Maximal', minParameterCount: 1, maxParameterCount: 1},
  'NUMERIC_MIN': {label: 'Numerisch: Mindestens', minParameterCount: 1, maxParameterCount: 1},
  METHOD_KEY_ELSE: {label: 'Ist leer', minParameterCount: 0, maxParameterCount: 0},
  METHOD_KEY_EMPTY: {label: 'Alle anderen Antworten', minParameterCount: 0, maxParameterCount: 0}
};

export interface RuleBasedParameter {
    method: string,
    parameters: string[],
}

export interface CodeData {
    id: string,
    label: string,
    score: number,
    rules: RuleBasedParameter[],
    instruction: string
}

export interface CodingScheme {
  id: string,
  label: string,
  sourceType: 'BASE' | 'DERIVE_CONCAT' | 'DERIVE_SUM',
  deriveSources: string[],
  deriveSourceType: 'VALUE' | 'CODE' | 'SCORE' | '',
  valueTransformations: TransformMethod[],
  manualGeneralInstruction: string,
  codes: CodeData[],
}

export interface UnitCodingScheme {
    generalInstructions: string,
    basisVariables: BasisVariableDef[],
    codingScheme: CodingScheme[]
}
