import { createSlice, PayloadAction } from 'redux-starter-kit';

import { IState } from '../../store';
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
  newMesurement: { metric: '', at: 0, value: 0, unit: '' },
};

const slice = createSlice({
  name: 'newmeasurement',
  initialState,
  reducers: {
    newMesurementDataRecevied: (state, action: PayloadAction<Measurement>) => {
      state.newMesurement = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
