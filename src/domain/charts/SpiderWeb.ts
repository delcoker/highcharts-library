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

export default class SpiderWeb implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map((oneSeries) => this.getSeriesData(oneSeries));

    chartSettings =
      {
        chart: {
          polar: true,
          type: "line"
        },

        accessibility: {
          description: "A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000."
        },

        title: {
          text: "Budget vs spending",
          x: -80
        },

        pane: {
          size: "80%"
        },

        xAxis: {
          categories: ["Sales", "Marketing", "Development", "Customer Support",
            "Information Technology", "Administration"],
          tickmarkPlacement: "on",
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0
        },

        tooltip: {
          shared: true,
          pointFormat: "<span style=\"color:{series.color}\">{series.name}: <b>${point.y:,.0f}</b><br/>"
        },

        legend: {
          align: "right",
          verticalAlign: "middle",
          layout: "vertical"
        },

        series:
        series

        ,

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal"
              },
              pane: {
                size: "70%"
              }
            }
          }]
        }


      };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.SPIDER_WEB.label)
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
