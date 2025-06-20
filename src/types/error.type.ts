export type ErrorDetail = {
  field: string;
  message: string;
  received?: any;
  expected?: string;
};