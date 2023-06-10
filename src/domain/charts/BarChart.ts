import { Builder } from "builder-pattern";
import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import ChartTypes from "../enums/ChartTypes";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import ChartData from "../models/ChartData";
import HighchartsDataPoint from "../models/highchart/HighchartsDataPoint";
import Series from "../models/Series";
import AbstractChart from "./AbstractChart";
import { IChart } from "./IChart";

export default class BarChart implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
     this.chartSettings = {};
    this.highchartsFormatter.init( this.chartSettings, chartData);

    const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));

    this.chartSettings = {
      ... this.chartSettings,
      chart: {
        type: ChartTypes.BAR.type,
      },
      tooltip: {
        pointFormat: `{series.name}: <b>${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix}</b>`,
      },
      series,
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.BAR.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };

  private getSeriesData(oneSeries: Series): { name: string, data: HighchartsDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values.map(dataPoint => AbstractChart.getHighchartsDataPoint(dataPoint)),
    };
  }
}