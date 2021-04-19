import { createSlice, PayloadAction } from 'redux-starter-kit';

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

export type ApiErrorAction = {
  error: string;
};
let list: Array<Measurements> = [];

const initialState = {
  mesurements: list,
};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    mesurementDataRecevied: (state, action: PayloadAction<Measurements>) => {
      const measurementsdata = action.payload;
      state.mesurements.push(measurementsdata);
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
