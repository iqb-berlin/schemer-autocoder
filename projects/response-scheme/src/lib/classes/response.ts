export const STATUS_KEY_NOT_SET = 'NOT_SET';
export const STATUS_KEY_NOT_REACHED = 'NOT_REACHED';
export const STATUS_KEY_DISPLAYED = 'DISPLAYED';
export const STATUS_KEY_VALUE_CHANGED = 'VALUE_CHANGED';
export const STATUS_KEY_VALUE_DERIVED = 'VALUE_DERIVED';
export const STATUS_KEY_SOURCE_MISSING = 'SOURCE_MISSING';
export const STATUS_KEY_DERIVE_ERROR = 'DERIVE_ERROR';
export const STATUS_KEY_CODING_COMPLETE = 'CODING_COMPLETE';
export const STATUS_KEY_NO_CODING = 'NO_CODING';
export const STATUS_KEY_CODING_INCOMPLETE = 'CODING_INCOMPLETE';
export const STATUS_KEY_CODING_ERROR = 'CODING_ERROR';

export const VALID_STATI = [STATUS_KEY_NOT_SET, STATUS_KEY_NOT_REACHED, STATUS_KEY_DISPLAYED, STATUS_KEY_VALUE_CHANGED, STATUS_KEY_VALUE_DERIVED, 
    STATUS_KEY_SOURCE_MISSING, STATUS_KEY_DERIVE_ERROR, STATUS_KEY_CODING_COMPLETE, STATUS_KEY_NO_CODING, STATUS_KEY_CODING_INCOMPLETE, STATUS_KEY_CODING_ERROR];

export const STATUS_LABELS = [
    {id: STATUS_KEY_NOT_SET, label: 'Status unbekannt'},
    {id: STATUS_KEY_NOT_REACHED, label: 'Nicht erreicht'},
    {id: STATUS_KEY_DISPLAYED, label: 'Gezeigt'},
    {id: STATUS_KEY_VALUE_CHANGED, label: 'Antwort gegeben'},
    {id: STATUS_KEY_VALUE_DERIVED, label: 'Wert abgeleitet'},
    {id: STATUS_KEY_SOURCE_MISSING, label: 'Fehlende Quelle(n) für Ableitung'},
    {id: STATUS_KEY_DERIVE_ERROR, label: 'Fehler bei Ableitung'},
    {id: STATUS_KEY_CODING_COMPLETE, label: 'Kodierung vollständig'},
    {id: STATUS_KEY_NO_CODING, label: 'Wert ohne Kodierung'},
    {id: STATUS_KEY_CODING_INCOMPLETE, label: 'Kodierung unvollständig'},
    {id: STATUS_KEY_CODING_ERROR, label: 'Fehler bei Kodierung'}
];

export interface ResponseData {
    id: string,
    status: string;
    value: null | string | number | boolean | string[] | number[] | boolean[];
    code: number;
    score: number
}