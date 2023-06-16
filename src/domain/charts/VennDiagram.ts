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

export default class VennDiagram implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {

    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));


    chartSettings =
      {
        accessibility: {
          point: {
            descriptionFormat: "{add index 1}. Intersection: {sets}. " +
              "{#if (gt sets.length 1)}{name}. {/if}" +
              "Value {value}"
          }
        },
        series: [{
          type: "venn",
          name: "The Unattainable Triangle",
          data: [{
            sets: ["Good"],
            value: 2
          }, {
            sets: ["Fast"],
            value: 2
          }, {
            sets: ["Cheap"],
            value: 2
          }, {
            sets: ["Good", "Fast"],
            value: 1,
            name: "More expensive"
          }, {
            sets: ["Good", "Cheap"],
            value: 1,
            name: "Will take time to deliver"
          }, {
            sets: ["Fast", "Cheap"],
            value: 1,
            name: "Not the best quality"
          }, {
            sets: ["Fast", "Cheap", "Good"],
            value: 1,
            name: "They're dreaming"
          }]
        }],
        title: {
          text: "The Unattainable Triangle"
        }
      }
    ;

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.VENN_DIAGRAM.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private getSeriesData(oneSeries: Series): { name: string, data: HighchartsDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values.map(dataPoint => AbstractChart.getHighchartsDataPoint(dataPoint))
    };
  }
}