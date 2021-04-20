import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let oilTempData: Array<Measurement> = [];
const initialState = {
  oilTempData: oilTempData,
};

const slice = createSlice({
  name: 'oilTempData',
  initialState,
  reducers: {
    oilTempData: (state, action) => {
      state.oilTempData = [...state.oilTempData, action.payload];
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
