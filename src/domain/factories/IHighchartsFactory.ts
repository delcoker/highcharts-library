import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import ChartData from "../models/ChartData";

export default interface IHighchartsFactory {
  getChart(chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse;

  // getGlobalSettings(highchartGlobalSettings: HighchartGlobalSettings): string
}
