import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let casingPressureData: Array<Measurement> = [];
const initialState = {
  casingPressureData: casingPressureData,
};

const slice = createSlice({
  name: 'casingPressureData',
  initialState,
  reducers: {
    casingPressureData: (state, action) => {
      state.casingPressureData = [...state.casingPressureData, action.payload];
    },
    casingPressureInitialData: (state, action) => {
      state.casingPressureData = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
