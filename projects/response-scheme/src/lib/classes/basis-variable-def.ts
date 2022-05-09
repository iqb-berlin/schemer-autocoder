export interface VariableValue {
  value: string;
  label: string
}
export interface BasisVariableDef {
  id: string;
  type: 'string' | 'integer' | 'number' | 'boolean';
  format: string;
  multiple: boolean;
  nullable: boolean;
  values: VariableValue[];
  valuesComplete?: boolean;
}
