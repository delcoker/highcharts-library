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

export default class PieChart implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  private static getPieSeries(chartParameters: HighchartsRequest, pieSeries: HighchartsDataPoint[]): { name: string; y: number }[] {
    const series = pieSeries
      .filter((dataPoint) => dataPoint.y !== null)
      .map((dataPoint: HighchartsDataPoint) => this.mapDataToPoint(dataPoint))
      .sort((a, b) => b.y - a.y);

    return series;
  }

  private static mapDataToPoint(dataPoint: HighchartsDataPoint) {
    return {
      name: dataPoint.name || "",
      y: dataPoint.y as number
    };
  }

  private static getHighchartsDataPoint(seriesList: Series[]): HighchartsDataPoint {
    return {
      name: seriesList[0].name,
      x: undefined,
      y: seriesList[0].values[0].y
    };
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    this.highchartsFormatter.init(this.chartSettings, chartData);

    const pieSeries = chartData.seriesList
      // .filter((series) => series.values.some((dataPoint) => dataPoint.category.label === chartParameters.selectedCategory))
      .map((oneSeries) => AbstractChart.getSingleSelectedCategoryDataPointFromSeries(oneSeries, chartParameters.selectedCategory))
      .map((oneCategorySeries) => PieChart.getHighchartsDataPoint(oneCategorySeries));

    const series = PieChart.getPieSeries(chartParameters, pieSeries);

    this.chartSettings = {
      ...this.chartSettings,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: ChartTypes.PIE.type
      },
      tooltip: {
        pointFormat: `{series.name}:<b> ${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix}</b>`
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: `<b>{point.name}</b>: {point.percentage:.${chartData.unit.decimalPlaces}f} %`
          },
          showInLegend: true
        }
      },
      series: [
        { data: series }
      ]
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.PIE.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };
}
