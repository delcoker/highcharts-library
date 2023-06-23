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

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public static getSemiCircleDonutSeries(
    chartParameters: HighchartsRequest,
    SemiCircleDonutSeries: (string | number | null)[][]
  ) {
    return {
      name: chartParameters.selectedCategory,
      data: SemiCircleDonutSeries
    };
  }

  public static getHighchartsSemiCircleDonutDataPoint(seriesList: Series[]): (string | number | null)[] {
    const name = seriesList[0].name;
    const y = seriesList[0].values[0].y ?? null;

    return [name, y];
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    this.highchartsFormatter.init(this.chartSettings, chartData);

    const semiCircleDonutSeries = chartData.seriesList
      .map((oneSeries) => AbstractChart.getSingleSelectedCategoryDataPointFromSeries(oneSeries, chartParameters.selectedCategory))
      .map((oneCategorySeries) => SemiCircleDonutChart.getHighchartsSemiCircleDonutDataPoint(oneCategorySeries))
      .filter((dataPoint) => dataPoint[1] !== null)
      .sort((a, b) => {
        if (typeof a[1] === "number" && typeof b[1] === "number") {
          return b[1] - a[1];
        }
        return 0;
      });

    const series: { data: (string | number | null)[][]; name: string } = SemiCircleDonutChart.getSemiCircleDonutSeries(chartParameters, semiCircleDonutSeries);

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
      .chartType(ChartTypes.SEMI_CIRCLE_DONUT.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };
}
