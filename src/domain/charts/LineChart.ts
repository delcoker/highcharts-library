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

export default class LineChart extends AbstractChart implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
    super();
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList
      .map((oneSeries) => this.getSeriesDataBarCol(oneSeries))
      .sort((a, b) => a.name.localeCompare(b.name));

    chartSettings = {
      ...chartSettings,
      chart: {
        type: chartParameters.chartType.type // trying out request param here
      },
      tooltip: {
        pointFormat: `{series.name}: <b>${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix}</b>`
      },
      series
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.LINE.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private getSeriesDataLine(oneSeries: Series): { name: string; data: HighchartsDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values.map((dataPoint) => AbstractChart.getHighchartsDataPoint(dataPoint))
    };
  }
}
