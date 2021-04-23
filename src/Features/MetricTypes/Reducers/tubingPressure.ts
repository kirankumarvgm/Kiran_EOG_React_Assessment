import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let tubingPressureData: Array<Measurement> = [];
const initialState = {
  tubingPressureData: tubingPressureData,
};

const slice = createSlice({
  name: 'tubingPressureData',
  initialState,
  reducers: {
    tubingPressureData: (state, action) => {
      state.tubingPressureData = [...state.tubingPressureData, action.payload];
    },
    tubingPressureInitialData: (state, action) => {
      state.tubingPressureData = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
