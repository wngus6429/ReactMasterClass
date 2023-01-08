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
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  chartName: string | undefined;
  coinId: string;
  isDark: boolean;
}
function Chart({ chartName, coinId, isDark }: ChartProps) {
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistroy(coinId), {
    refetchInterval: 10000,
  });
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
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'black',
            },
            title: {
              text: chartName,
              align: 'left',
              style: {
                fontSize:  '24px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  'Gold'
              },
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
              type:'datetime',
              // categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
              categories: data?.map((price) => price.time_close * 1000)
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
