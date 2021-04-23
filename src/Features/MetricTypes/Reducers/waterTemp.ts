import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let waterTempData: Array<Measurement> = [];
const initialState = {
  waterTempData: waterTempData,
};

const slice = createSlice({
  name: 'waterTempData',
  initialState,
  reducers: {
    waterTempData: (state, action) => {
      state.waterTempData = [...state.waterTempData, action.payload];
    },
    waterTempInitialData: (state, action) => {
      state.waterTempData = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
