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

export default class TreeMap implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  private static getPieSeries(chartParameters: HighchartsRequest, pieSeries: HighchartsDataPoint[]): { name: string; y: number }[] {
    return pieSeries.map((dataPoint: HighchartsDataPoint) => {
      return {
        name: dataPoint.name || "",
        y: dataPoint.y || 0
      };
    });
  }

  private static getHighchartsDataPoint(seriesList: Series[]): HighchartsDataPoint {
    return {
      name: seriesList[0].name,
      x: undefined,
      y: seriesList[0].values[0].y
    };
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    // const pieSeries = chartData.seriesList
    //   .map((oneSeries) =>
    //     AbstractChart.getSingleSelectedCategoryDataPointFromSeries(oneSeries, chartParameters.selectedCategory)
    //   )
    //   .map((oneCategorySeries) => PieChart.getHighchartsDataPoint(oneCategorySeries));
    //
    // const series = PieChart.getPieSeries(chartParameters, pieSeries);

    chartSettings = {
      ...chartSettings,

      series: [{
        type: "treemap",
        layoutAlgorithm: "stripes",
        alternateStartingDirection: true,
        borderColor: "#fff",
        borderRadius: 6,
        borderWidth: 2,
        dataLabels: {
          style: {
            textOutline: "none"
          }
        },
        levels: [{
          level: 1,
          layoutAlgorithm: "sliceAndDice",
          dataLabels: {
            enabled: true,
            align: "left",
            verticalAlign: "top",
            style: {
              fontSize: "15px",
              fontWeight: "bold"
            }
          }
        }],
        data: [{
          id: "A",
          name: "Nord-Norge",
          color: "#50FFB1"
        }, {
          id: "B",
          name: "Trøndelag",
          color: "#F5FBEF"
        }, {
          id: "C",
          name: "Vestlandet",
          color: "#A09FA8"
        }, {
          id: "D",
          name: "Østlandet",
          color: "#E7ECEF"
        }, {
          id: "E",
          name: "Sørlandet",
          color: "#A9B4C2"
        }, {
          name: "Troms og Finnmark",
          parent: "A",
          value: 70923
        }, {
          name: "Nordland",
          parent: "A",
          value: 35759
        }, {
          name: "Trøndelag",
          parent: "B",
          value: 39494
        }, {
          name: "Møre og Romsdal",
          parent: "C",
          value: 13840
        }, {
          name: "Vestland",
          parent: "C",
          value: 31969
        }, {
          name: "Rogaland",
          parent: "C",
          value: 8576
        }, {
          name: "Viken",
          parent: "D",
          value: 22768
        }, {
          name: "Innlandet",
          parent: "D",
          value: 49391
        },
          {
            name: "Oslo",
            parent: "D",
            value: 454
          },
          {
            name: "Vestfold og Telemark",
            parent: "D",
            value: 15925
          },
          {
            name: "Agder",
            parent: "E",
            value: 14981
          }]
      }],
      title: {
        text: "Norwegian regions and counties by area",
        align: "left"
      },
      subtitle: {
        text:
          "Source: <a href=\"https://snl.no/Norge\" target=\"_blank\">SNL</a>",
        align: "left"
      },
      tooltip: {
        useHTML: true,
        pointFormat:
          "The area of <b>{point.name}</b> is <b>{point.value} km<sup>2</sup></b>"
      }
    }
    ;

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.TREEMAP.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };
}
