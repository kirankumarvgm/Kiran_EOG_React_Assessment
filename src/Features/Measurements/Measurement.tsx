import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { Measurements } from './mesurementType';
import {
  CasingPressureActions,
  FlareTempActions,
  InjValveActions,
  OilTempActions,
  TubingPressureActions,
  WaterTempActions,
} from '../MetricTypes/Reducers/index';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurementQuery = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
        measurements {
            metric,
            at,
            value,
            unit
        }
    }                                                                                       
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      <MultipleMetrics />
    </Provider>
  );
};

const MultipleMetrics = () => {
  const { current, past } = useSelector((state: IState) => state.heartbeat);
  const metricSet = [
    {
      metricName: 'tubingPressure',
      after: past,
      before: current,
    },
    {
      metricName: 'injValveOpen',
      before: current,
      after: past,
    },
    {
      metricName: 'oilTemp',
      before: current,
      after: past,
    },
    {
      metricName: 'casingPressure',
      before: current,
      after: past,
    },
    {
      metricName: 'flareTemp',
      before: current,
      after: past,
    },
    {
      metricName: 'waterTemp',
      before: current,
      after: past,
    },
  ];
  const dispatch = useDispatch();

  const [result] = useQuery({
    query: measurementQuery,
    variables: { input: metricSet },
  });
  const { fetching, data, error } = result;
  const metrics = {
    tubingPressure: 'tubingPressure',
    injValveOpen: 'injValveOpen',
    waterTemp: 'waterTemp',
    flareTemp: 'flareTemp',
    casingPressure: 'casingPressure',
    oilTemp: 'oilTemp',
  };
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    getMultipleMeasurements.map((data: Measurements) => {
      if (data.measurements.length > 0) {
        dispatch(actions.mesurementDataRecevied(getMultipleMeasurements));
        switch (data.metric) {
          case metrics.casingPressure:
            return dispatch(CasingPressureActions.casingPressureInitialData(data.measurements));
          case metrics.injValveOpen:
            return dispatch(InjValveActions.injValveInitialData(data.measurements));
          case metrics.tubingPressure:
            return dispatch(TubingPressureActions.tubingPressureInitialData(data.measurements));
          case metrics.waterTemp:
            return dispatch(WaterTempActions.waterTempInitialData(data.measurements));
          case metrics.flareTemp:
            return dispatch(FlareTempActions.flareTempInitialData(data.measurements));
          case metrics.oilTemp:
            return dispatch(OilTempActions.oilTempInitialData(data.measurements));
        }
      }
    });
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return null;
};
