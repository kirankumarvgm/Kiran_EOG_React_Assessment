import { createSlice } from 'redux-starter-kit';
import { Measurement } from '../../Measurements/mesurementType';
let injValueOpenData: Array<Measurement> = [];
const initialState = {
  injValueOpenData: injValueOpenData,
};

const slice = createSlice({
  name: 'injValueOpenData',
  initialState,
  reducers: {
    injValueOpenData: (state, action) => {
      state.injValueOpenData = [...state.injValueOpenData, action.payload];
    },
    injValveInitialData: (state, action) => {
      state.injValueOpenData = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
