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
import * as Highcharts from "highcharts";


export default class WordCloud implements IChart {
  public chartSettings: {} = {};

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
  }

  public getChart = (chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse => {
    // let data;

    let chartSettings = {};
    this.highchartsFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map((oneSeries) => this.getSeriesData(oneSeries));

    const text =
        "Chapter 1. Down the Rabbit-Hole " +
        "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: " +
        "once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations " +
        "in it, 'and what is the use of a book,' thought Alice 'without pictures or conversation?'" +
        "So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy " +
        "and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking " +
        "the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
      lines = text.replace(/[():'?0-9]+/g, "").split(/[,\. ]+/g),
      data = lines.reduce((arr, word) => {
        let obj = Highcharts.find(arr, (obj: { name: string; }) => obj.name === word);
        if (obj) {
          // @ts-ignore
          obj.weight += 1;
        } else {
          // @ts-ignore
          obj = {
            name: word,
            weight: 1
          };
          // @ts-ignore
          arr.push(obj);
        }
        return arr;
      }, []);

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
