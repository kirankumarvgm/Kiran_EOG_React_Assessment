import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Measurements } from '../Measurements/mesurementType';
export type ApiErrorAction = {
  error: string;
};
let list: Array<Measurements> = [];

const initialState = {
  mesurements: list,
};
const metrics = {
  tubingPressure: 'tubingPressure',
  injValveOpen: 'injValveOpen',
  waterTemp: 'waterTemp',
  flareTemp: 'flareTemp',
  casingPressure: 'casingPressure',
  oilTemp: 'oilTemp',
};
const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    mesurementDataRecevied: (state, action) => {
      const measurementsdata = action.payload;
      state.mesurements.push(measurementsdata);
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
