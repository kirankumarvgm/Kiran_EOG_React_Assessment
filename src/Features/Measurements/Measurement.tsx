import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import Dashboard from './../../components/Dashboard';
import moment from 'moment';

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
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    const { getMultipleMeasurements } = data;
    dispatch(actions.mesurementDataRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return null;
};
