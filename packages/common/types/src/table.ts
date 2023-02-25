export interface Table {
  id?: number;
  name: string;
  rows: number;
  columns: number;
  notes: string;
}

export type Tables = {
  tables: Table[]
}
