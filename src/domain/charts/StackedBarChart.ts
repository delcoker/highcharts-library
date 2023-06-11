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

export default class StackedBarChart implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map((oneSeries) => this.getSeriesData(oneSeries));

    chartSettings = {
      ...chartSettings,
      chart: {
        type: ChartTypes.STACKED_BAR.type
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: `{series.name}: ${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix} <br/>Total: ${chartData.unit.prefix} {point.stackTotal} ${chartData.unit.suffix}`
      },
      xAxis: {
        // not needed
        categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"]
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        // series: {
        //   stacking: 'normal',
        // },

        bar: {
          stacking: "normal",
          dataLabels: {
            enabled: true
          }
        }
      },
      // series: [{
      //   name: 'John',
      //   data: [5, 3, 4, 7, 2],
      // }, {
      //   name: 'Jane',
      //   data: [2, 2, 3, 2, 1],
      // }, {
      //   name: 'Joe',
      //   data: [3, 4, 4, 2, 5],
      // }]
      // ,
      series
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.STACKED_BAR.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private getSeriesData(oneSeries: Series): { name: string; data: HighchartsDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values.map((dataPoint) => AbstractChart.getHighchartsDataPoint(dataPoint))
    };
  }
}
