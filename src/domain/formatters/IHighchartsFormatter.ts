import ChartData from "../models/ChartData";

export default interface IHighchartsFormatter {
  init(chartSettings: object, chartData: ChartData): void;
}