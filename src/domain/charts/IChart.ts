import ChartData from '../models/ChartData';
import HighchartRequest from '../../application/models/HighchartRequest';
import HighchartResponse from '../../application/models/HighchartResponse';

export interface IChart {
  chartSettings: {};

  getChart(chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse;
}