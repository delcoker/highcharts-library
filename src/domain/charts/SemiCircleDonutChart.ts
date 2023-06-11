import { Builder } from "builder-pattern";
import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import ChartTypes from "../enums/ChartTypes";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import ChartData from "../models/ChartData";
import Series from "../models/Series";
import AbstractChart from "./AbstractChart";
import { IChart } from "./IChart";

export default class SemiCircleDonutChart implements IChart {
  public chartSettings = {};

  constructor(private readonly highchartFormatter: HighchartsFormatterImpl) {
  }

  public static getSemiCircleDonutSeries(
    chartParameters: HighchartsRequest,
    SemiCircleDonutSeries: Array<Array<string | number>>
  ) {
    return {
      name: chartParameters.selectedCategory,
      data: SemiCircleDonutSeries
    };
  }

  public static getHighchartSemiCircleDonutDataPoint(seriesList: Series[]): Array<string | number> {
    // @ts-ignore
    return [seriesList[0].name, seriesList[0].values[0].y];
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    // let chartSettings = {};
    this.highchartFormatter.init(this.chartSettings, chartData);

    const semiCircleDonutSeries = chartData.seriesList
      // @ts-ignore
      .map((oneSeries) =>
        AbstractChart.getSingleSelectedCategoryDataPointFromSeries(oneSeries, chartParameters.selectedCategory)
      )
      // @ts-ignore
      .map((oneCategorySeries) => SemiCircleDonutChart.getHighchartSemiCircleDonutDataPoint(oneCategorySeries));

    const series = SemiCircleDonutChart.getSemiCircleDonutSeries(chartParameters, semiCircleDonutSeries);

    this.chartSettings = {
      ...this.chartSettings,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      tooltip: {
        pointFormat: `{series.name}:<b> {point.percentage:.${chartData.unit.decimalPlaces}f}</b>`
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
            distance: -50,
            style: {
              fontWeight: "bold",
              color: "white"
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ["50%", "75%"],
          size: "110%"
        }
      },
      series: [
        {
          ...series,
          type: ChartTypes.PIE.type,
          innerSize: "50%"
        }
      ]
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.PIE.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };
}
