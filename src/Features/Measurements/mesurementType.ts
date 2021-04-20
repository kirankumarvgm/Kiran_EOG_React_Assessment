export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type Measurements = {
  metric: string;
  measurements: Array<Measurement>;
};
