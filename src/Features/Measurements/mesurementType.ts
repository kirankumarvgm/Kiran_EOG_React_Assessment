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

export type MeasurementsWithColorCode = {
  metric: string;
  measurements: Array<Measurement>;
  color: string;
};

export type SelectedMetric = {
  metric: string;
};

export type DataCardProps = {
  color: string;
  metric: string;
  data: string;
};
