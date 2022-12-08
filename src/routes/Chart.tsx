import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistroy } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: number;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistroy(coinId));
  return (
    <div>
      {isLoading ? (
        'Loading Chart..'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'black',
            },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['gold'], stops: [0, 100] },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
