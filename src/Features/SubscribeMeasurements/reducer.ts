import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  mesurement: { metric: '', at: 0, value: 0, unit: '' },
};

const slice = createSlice({
  name: 'newmeasurement',
  initialState,
  reducers: {
    newMesurementDataRecevied: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      console.log('Data is', metric, at, value, unit);
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
