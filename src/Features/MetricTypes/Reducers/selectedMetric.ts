import { createSlice } from 'redux-starter-kit';
import { Measurement, SelectedMetric } from '../../Measurements/mesurementType';
let metricsSelected: Array<SelectedMetric> = [];
const initialState = {
  metricsSelected: metricsSelected,
};

const slice = createSlice({
  name: 'metricsSelected',
  initialState,
  reducers: {
    metricSelected: (state, action) => {
      state.metricsSelected = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
