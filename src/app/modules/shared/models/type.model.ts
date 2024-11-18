import { MultiLanguageField } from "./multi-language-field.model";


export interface TypeModel {
  id: number;
  name: MultiLanguageField;
  type_code: string | null;
  value: string;
  description: string | null;
  ordering: number;
  active: boolean;
}
