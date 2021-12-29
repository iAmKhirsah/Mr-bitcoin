import { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export class ChartMarketPrice extends Component {
  state = {
    data: null,
    values: null,
  };

  async componentDidMount() {
    console.log(this.props);
    let values = this.props.price.values.map((value) => {
      return { date: new Date(value.x * 1000).toDateString(), USD: value.y };
    });
    this.setState({ data: this.props.price, values });
  }

  render() {
    let { data, values } = this.state;
    if (!data && !values) return <div>Loading...</div>;

    return (
      <div>
        <h1>
          {data.description.substring(0, data.description.length - 1)} in the
          past 2 Months.
        </h1>
        <div className="chart chart-market">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={values}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
