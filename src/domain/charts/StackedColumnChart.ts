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

export default class StackedColumnChart implements IChart {
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
        type: ChartTypes.STACKED_COLUMN.type,
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      },
      // legend: {
      //   align: 'right',
      //   x: -30,
      //   verticalAlign: 'top',
      //   y: 25,
      //   floating: true,
      //   backgroundColor:
      //     /*Highcharts.defaultOptions.legend.backgroundColor ||*/ 'white',
      //   borderColor: '#CCC',
      //   borderWidth: 1,
      //   shadow: false,
      // },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: `{series.name}: ${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix} <br/>Total: ${chartData.unit.prefix} {point.stackTotal} ${chartData.unit.suffix}`,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
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
      .chartType(ChartTypes.STACKED_COLUMN.label)
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