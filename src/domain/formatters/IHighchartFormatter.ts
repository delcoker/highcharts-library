import ChartData from '../models/ChartData';

export default interface IHighchartFormatter {
  init(chartSettings: object, chartData: ChartData): void
}