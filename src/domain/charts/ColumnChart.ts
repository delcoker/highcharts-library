import { Builder } from "builder-pattern";
import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import ChartTypes from "../enums/ChartTypes";
import ChartData from "../models/ChartData";
import Series from "../models/Series";
import { IChart } from "./IChart";
import IHighchartsFormatter from "../formatters/IHighchartsFormatter";
import AbstractChart from "./AbstractChart";
import HighchartsDataPoint from "../models/highchart/HighchartsDataPoint";

export default class ColumnChart extends AbstractChart implements IChart {
  public readonly highchartsFormatter: IHighchartsFormatter;
  public chartSettings: {} = {};

  constructor(highchartsFormatter: IHighchartsFormatter) {
    super();
    this.highchartsFormatter = highchartsFormatter;
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    this.highchartsFormatter.init(this.chartSettings, chartData);

    const series = chartData.seriesList
      .map((oneSeries) => this.getSeriesDataBarCol(oneSeries))
      .sort((a, b) => a.name.localeCompare(b.name));

    this.chartSettings = {
      ...this.chartSettings,
      chart: {
        type: ChartTypes.COLUMN.type
      },
      tooltip: {
        pointFormat: `{series.name}: <b>${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix}</b>`
      },
      series
    };


    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.COLUMN.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };


}
