import ChartData from '../models/ChartData';
import HighchartRequest from '../../application/models/HighchartRequest';
import HighchartResponse from '../../application/models/HighchartResponse';
import { IChart } from './IChart';
import { Builder } from 'builder-pattern';
import ChartTypes from '../enums/ChartTypes';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';
import HighchartDataPoint from '../models/highchart/HighchartDataPoint';
import AbstractChart from './AbstractChart';
import Series from '../models/Series';

export default class WordCloud implements IChart {
  chartSettings: {} = {};

  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
  }

  getChart = (chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse => {
    const data = [];

    let chartSettings = {};
    this.highchartFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));

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

    chartSettings =
      {
        accessibility: {
          screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
              '<div>{chartSubtitle}</div>' +
              '<div>{chartLongdesc}</div>' +
              '<div>{viewTableButton}</div>',
          },
        },
        series: [{
          type: ChartTypes.WORD_CLOUD.type,
          data,
          name: 'Occurrences',
        }],
        title: {
          text: 'Wordcloud of Lorem Ipsum',
        },
      };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.WORD_CLOUD.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private getSeriesData(oneSeries: Series): { name: string, data: HighchartDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values.map(dataPoint => AbstractChart.getHighchartDataPoint(dataPoint)),
    };
  }
}