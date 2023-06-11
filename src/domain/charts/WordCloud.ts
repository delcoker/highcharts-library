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

export default class WordCloud implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    const data: any = [];

    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map((oneSeries) => this.getSeriesData(oneSeries));

    // const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.',
    //   lines = text.split(/[,\. ]+/g),
    //   data = lines.reduce((arr, word) => {
    //       let obj = Highcharts.find(arr, obj => obj.name === word);
    //       if (obj) {
    //         obj.weight += 1;
    //       } else {
    //         obj = {
    //           name: word,
    //           weight: 1,
    //         };
    //         arr.push(obj);
    //       }
    //       return arr;
    //     }, [],
    //   );

    chartSettings = {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<h5>{chartTitle}</h5>" +
            "<div>{chartSubtitle}</div>" +
            "<div>{chartLongdesc}</div>" +
            "<div>{viewTableButton}</div>"
        }
      },
      series: [
        {
          type: ChartTypes.WORD_CLOUD.type,
          data,
          name: "Occurrences"
        }
      ],
      title: {
        text: "Wordcloud of Lorem Ipsum"
      }
    };

    return Builder<HighchartsResponse>()
      .chartType(ChartTypes.WORD_CLOUD.label)
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
