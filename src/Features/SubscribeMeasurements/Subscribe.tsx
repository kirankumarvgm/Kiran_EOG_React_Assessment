import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions as subActions } from '../SubscribeMeasurements/reducer';
import { IState } from '../../store';
import {
  CasingPressureActions,
  FlareTempActions,
  InjValveActions,
  OilTempActions,
  TubingPressureActions,
  WaterTempActions,
} from '../MetricTypes/Reducers/index';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Subscriber />
    </Provider>
  );
};
type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};
const metrics = {
  tubingPressure: 'tubingPressure',
  injValveOpen: 'injValveOpen',
  waterTemp: 'waterTemp',
  flareTemp: 'flareTemp',
  casingPressure: 'casingPressure',
  oilTemp: 'oilTemp',
};
const Subscriber = () => {
  const reducerSwitch = (measurement: Measurement) => {
    const { metric } = measurement;
    switch (metric) {
      case metrics.casingPressure:
        return dispatch(CasingPressureActions.casingPressureData(measurement));
      case metrics.injValveOpen:
        return dispatch(InjValveActions.injValueOpenData(measurement));
      case metrics.tubingPressure:
        return dispatch(TubingPressureActions.tubingPressureData(measurement));
      case metrics.waterTemp:
        return dispatch(WaterTempActions.waterTempData(measurement));
      case metrics.flareTemp:
        return dispatch(FlareTempActions.flareTempData(measurement));
      case metrics.oilTemp:
        return dispatch(OilTempActions.oilTempData(measurement));
    }
  };

  const dispatch = useDispatch();
  const receiveMeasurement = useCallback(measurement => reducerSwitch(measurement), [reducerSwitch]);
  const [subscriptionResponse] = useSubscription({ query: newMessages });
  const { data: subscriptionData } = subscriptionResponse;

  useEffect(() => {
    if (!subscriptionData) return;
    receiveMeasurement(subscriptionData.newMeasurement);
  }, [subscriptionData, receiveMeasurement]);

  return null;
};
