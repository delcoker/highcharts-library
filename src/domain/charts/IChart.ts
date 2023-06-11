import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import ChartData from "../models/ChartData";

export interface IChart {
  chartSettings: {};

  getChart(chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse;
}
