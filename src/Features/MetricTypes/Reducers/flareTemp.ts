import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let flareTempData: Array<Measurement> = [];
const initialState = {
  flareTempData: flareTempData,
};

const slice = createSlice({
  name: 'flareTempData',
  initialState,
  reducers: {
    flareTempData: (state, action) => {
      state.flareTempData = [...state.flareTempData, action.payload];
    },
    flareTempInitialData: (state, action) => {
      state.flareTempData = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
