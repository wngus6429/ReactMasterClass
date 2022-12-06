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
              name: 'sales',
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: { height: 500, width: 500 },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
