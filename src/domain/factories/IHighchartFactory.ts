import ChartData from '../models/ChartData';
import HighchartResponse from '../../application/models/HighchartResponse';
import HighchartRequest from '../../application/models/HighchartRequest';

export default interface IHighchartFactory {
  getChartData(chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse

  // getGlobalSettings(highchartGlobalSettings: HighchartGlobalSettings): string
}