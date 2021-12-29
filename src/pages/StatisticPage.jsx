import { Component } from 'react';
import { ChartMarketPrice } from '../components/ChartMarketPrice';
import { ChartTransactions } from '../components/ChartTransactions';
import { apiService } from '../services/apiService';
export class StatisticPage extends Component {
  state = {
    transData: null,
    priceData: null,
  };
  async componentDidMount() {
    this.setState({
      transData: await apiService.getTradeVolume(),
      priceData: await apiService.getMarketPrice(),
    });
  }
  render() {
    let { transData, priceData } = this.state;
    if (!transData) return <div>Loading...</div>;
    return (
      <div className="statistics container">
        <div>
          <ChartTransactions transData={transData} />
        </div>
        <div>
          <ChartMarketPrice price={priceData} />
        </div>
      </div>
    );
  }
}
