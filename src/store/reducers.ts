import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as MeasurementReducer } from '../Features/Measurements/reducer';
import { reducer as HeartBeatReducer } from '../Features/EOGHeartBeat/reducer';
import { reducer as MetricDataReducer } from '../Features/MetricTypes/reducer';
import { reducer as SubscriberDataReducer } from '../Features/SubscribeMeasurements/reducer';
import {
  CasingPressureReducer,
  WaterTempReducer,
  FlareTempReducer,
  InjValveReducer,
  OilTempReducer,
  TubingPressureReducer,
  SelectedMetricReducer,
} from '../Features/MetricTypes/Reducers/index';
export default {
  weather: weatherReducer,
  measurement: MeasurementReducer,
  heartbeat: HeartBeatReducer,
  metric: MetricDataReducer,
  newmeasurement: SubscriberDataReducer,
  casingPressure: CasingPressureReducer,
  flareTemp: FlareTempReducer,
  injValueOpen: InjValveReducer,
  oilTemp: OilTempReducer,
  tubingPressure: TubingPressureReducer,
  waterTemp: WaterTempReducer,
  metricsSelected: SelectedMetricReducer,
};
