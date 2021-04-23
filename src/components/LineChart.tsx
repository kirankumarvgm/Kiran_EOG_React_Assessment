import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { MeasurementsWithColorCode } from '../Features/Measurements/mesurementType';
import moment from 'moment';
import DataCard from './DataCard';

const LineChartsMeasurement = () => {
  const stateData: Array<MeasurementsWithColorCode> = [];
  const [chartData, setChartData] = useState(stateData);
  const injValveData = useSelector((state: IState) => state.injValueOpen.injValueOpenData);
  const oilTempData = useSelector((state: IState) => state.oilTemp.oilTempData);
  const flareTempData = useSelector((state: IState) => state.flareTemp.flareTempData);
  const waterTempData = useSelector((state: IState) => state.waterTemp.waterTempData);
  const casingPressureData = useSelector((state: IState) => state.casingPressure.casingPressureData);
  const tubingPressureData = useSelector((state: IState) => state.tubingPressure.tubingPressureData);
  const selectedMetrics = useSelector((state: IState) => state.metricsSelected.metricsSelected);

  const formatXAxis = (tickItem: number) => {
    return moment.unix(tickItem).format('h:mm A');
  };
  const names = {
    injValveOpen: 'INJ Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    flareTemp: 'Flare Temp',
    casingPressure: 'Casing Pressure',
    waterTemp: 'Water Temp',
    default: 'metric',
  };

  const filterByActive = (data: MeasurementsWithColorCode) => {
    for (let i = 0; i < selectedMetrics.length; i++) {
      if (data.metric === selectedMetrics[i].toString()) {
        return true;
      }
    }
  };
  const colors = {
    injValveOpen: '#008000',
    oilTempData: '#800000',
    casingPressure: '#DE3163',
    tubingPressure: '#40E0D0',
    flareTemp: '#6495ED',
    waterTemp: '#000080',
  };
  const dataForChart = chartData.filter(filterByActive);
  useEffect(() => {
    return setChartData([
      {
        metric: 'injValveOpen',
        measurements: injValveData,
        color: '#008000',
      },
      {
        metric: 'oilTemp',
        measurements: oilTempData,
        color: '#800000',
      },
      {
        metric: 'casingPressure',
        measurements: casingPressureData,
        color: '#DE3163',
      },
      {
        metric: 'tubingPressure',
        measurements: tubingPressureData,
        color: '#40E0D0',
      },
      {
        metric: 'flareTemp',
        measurements: flareTempData,
        color: '#6495ED',
      },
      {
        metric: 'waterTemp',
        measurements: waterTempData,
        color: '#000080',
      },
    ]);
  }, [injValveData, oilTempData, casingPressureData, tubingPressureData, flareTempData, waterTempData]);

  return (
    <>
      {selectedMetrics.map(i => {
        if (i.toString() === injValveData[0].metric) {
          return (
            <DataCard
              color="#008000"
              metric={i.toString()}
              data={`${injValveData[injValveData.length - 1].value}${injValveData[0].unit}`}
            />
          );
        } else if (i.toString() === oilTempData[0].metric) {
          return (
            <DataCard
              color="#800000"
              metric={i.toString()}
              data={`${oilTempData[oilTempData.length - 1].value} ${oilTempData[0].unit}`}
            />
          );
        } else if (i.toString() === flareTempData[0].metric) {
          return (
            <DataCard
              color="#6495ED"
              metric={i.toString()}
              data={`${flareTempData[flareTempData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } else if (i.toString() === waterTempData[0].metric) {
          return (
            <DataCard
              color="#000080"
              metric={i.toString()}
              data={`${waterTempData[waterTempData.length - 1].value} ${waterTempData[0].unit}`}
            />
          );
        } else if (i.toString() === casingPressureData[0].metric) {
          return (
            <DataCard
              color="#DE3163"
              metric={i.toString()}
              data={`${casingPressureData[casingPressureData.length - 1].value} ${casingPressureData[0].unit}`}
            />
          );
        } else if (i.toString() === tubingPressureData[0].metric) {
          return (
            <DataCard
              color="#40E0D0"
              metric={i.toString()}
              data={`${tubingPressureData[tubingPressureData.length - 1].value} ${tubingPressureData[0].unit}`}
            />
          );
        }
      })}
      {dataForChart.length > 0 && (
        <LineChart width={1000} height={600}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="at" tickFormatter={formatXAxis} type="category" allowDuplicatedCategory={false} />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
          {dataForChart.map(item => {
            return (
              <Line
                dataKey="value"
                data={item.measurements}
                name={item.metric}
                key={item.metric}
                dot={false}
                stroke={item.color}
              />
            );
          })}
        </LineChart>
      )}
    </>
  );
};
export default LineChartsMeasurement;
