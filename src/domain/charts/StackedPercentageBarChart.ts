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

export default class StackedPercentageBarChart implements IChart {
  chartSettings: {} = {};

  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
  }

  getChart = (chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse => {

    let chartSettings = {};
    this.highchartFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));

    chartSettings = {
      ...chartSettings,
      chart: {
        type: ChartTypes.STACKED_PERCENTAGE_BAR.type,
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      },
      tooltip: {
        pointFormat: `<span style="color:{series.color}">{series.name}</span>: ${chartData.unit.prefix} <b> {point.y:.${chartData.unit.decimalPlaces}f}</b> ${chartData.unit.suffix} ({point.percentage:.0f}%)<br/>`,
        shared: true,
      },
      plotOptions: {
        bar: {
          stacking: 'percent',
          dataLabels: {
            enabled: true,
          },
        },
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
      series: series,
    };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.STACKED_PERCENTAGE_BAR.label)
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