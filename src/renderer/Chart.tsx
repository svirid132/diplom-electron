import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ChartProps {
  data: any[];
}

const countBreakPoint = 16;

const Chart = ({ data }: ChartProps) => {
  const length = data?.length;
  const breakPointlength = length && Math.floor(length / countBreakPoint);
  const breackPoints: any[] = [];
  if (breakPointlength) {
    for (let i = 1; i <= countBreakPoint; ++i) {
      breackPoints.push(i * breakPointlength);
    }
  }
  const points = data?.reduce((accam, elem, index) => {
    if (breackPoints.includes(index)) accam.push(elem);
    return accam;
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={points}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="X" />
        <YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="Y"
          stroke="#8884d8"
          // activeDot={{ r: 28 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
