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

export default class VennDiagram implements IChart {
  chartSettings: {} = {};

  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
  }

  getChart = (chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse => {

    let chartSettings = {};
    this.highchartFormatter.init(chartSettings, chartData);

    const series = chartData.seriesList.map(oneSeries => this.getSeriesData(oneSeries));

    chartSettings =
      {
        accessibility: {
          point: {
            descriptionFormatter: function(point) {
              var intersection = point.sets.join(', '),
                name = point.name,
                ix = point.index + 1,
                val = point.value;
              return ix + '. Intersection: ' + intersection + '. ' +
                (point.sets.length > 1 ? name + '. ' : '') + 'Value ' + val + '.';
            },
          },
        },
        series: [{
          type: ChartTypes.VENN_DIAGRAM.type,
          name: 'The Unattainable Triangle',
          data: [{
            sets: ['Good'],
            value: 2,
          }, {
            sets: ['Fast'],
            value: 2,
          }, {
            sets: ['Cheap'],
            value: 2,
          }, {
            sets: ['Good', 'Fast'],
            value: 1,
            name: 'More expensive',
          }, {
            sets: ['Good', 'Cheap'],
            value: 1,
            name: 'Will take time to deliver',
          }, {
            sets: ['Fast', 'Cheap'],
            value: 1,
            name: 'Not the best quality',
          }, {
            sets: ['Fast', 'Cheap', 'Good'],
            value: 1,
            name: 'They\'re dreaming',
          }],
        }],
        title: {
          text: 'The Unattainable Triangle',
        },
      };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.VENN_DIAGRAM.label)
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