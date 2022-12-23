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
  chartName: string|undefined;
  coinId: string;
}
function Chart({ chartName, coinId }: ChartProps) {
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistroy(coinId), {
    refetchInterval:10000
  });
  const ChartData = data?.map((Data) => ({
    x: Data.time_open,
    y: [Data.open, Data.high, Data.low, Data.close]
  }));
  return (
    <div>
      {isLoading ? (
        'Loading Chart..'
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: ChartData }] as unknown as number[]} 
          options={{
            chart: {
              height: 350,
              type: 'candlestick',
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
            annotations: {
              xaxis: [
                {
                  x: 'Oct 06 14:00',
                  borderColor: '#00E396',
                  label: {
                    borderColor: '#00E396',
                    style: {
                      fontSize: '12px',
                      color: '#fff',
                      background: '#00E396'
                    },
                    orientation: 'horizontal',
                    offsetY: 7,
                    text: 'Annotation Test'
                  }
                }
              ]
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              labels:{
                show: false
              }
            },
            yaxis: {
              labels:{
                show: false
              },
              tooltip: {
                enabled: true
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
