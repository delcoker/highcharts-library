import ChartData from '../models/ChartData';
import HighchartRequest from '../../application/models/HighchartRequest';
import HighchartResponse from '../../application/models/HighchartResponse';
import { IChart } from './IChart';
import { Builder } from 'builder-pattern';
import ChartTypes from '../enums/ChartTypes';
import Series from '../models/Series';
import HighchartDataPoint from '../models/highchart/HighchartDataPoint';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';
import AbstractChart from './AbstractChart';

export default class AreaChart implements IChart {
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
        type: ChartTypes.AREA.type,
      },
      tooltip: {
        pointFormat: `{series.name}: <b>${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f} ${chartData.unit.suffix}</b>`,
      },
      series: series,
    };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.AREA.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private getSeriesData(oneSeries: Series): { name: string, data: HighchartDataPoint[] } {
    return {
      name: oneSeries.name,
      data: oneSeries.values
        .map(dataPoint => AbstractChart.getHighchartDataPoint(dataPoint)),
    };
  }
}