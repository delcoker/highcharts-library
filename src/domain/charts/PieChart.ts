import ChartData from '../models/ChartData';
import HighchartRequest from '../../application/models/HighchartRequest';
import HighchartResponse from '../../application/models/HighchartResponse';
import { IChart } from './IChart';
import { Builder } from 'builder-pattern';
import ChartTypes from '../enums/ChartTypes';
import Series from '../models/Series';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';
import AbstractChart from './AbstractChart';
import HighchartDataPoint from '../models/highchart/HighchartDataPoint';

export default class PieChart implements IChart {
  chartSettings: {} = {};


  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
  }

  getChart = (chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse => {

    let chartSettings = {};
    this.highchartFormatter.init(chartSettings, chartData);

    const pieSeries = chartData.seriesList
      .map(oneSeries => AbstractChart.getCategorySeriesList(oneSeries, chartParameters.selectedCategory))
      .map(oneCategorySeries => PieChart.getHighchartDataPoint(oneCategorySeries));

    const series = PieChart.getPieSeries(chartParameters, pieSeries);

    chartSettings = {
      ...chartSettings,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: ChartTypes.PIE.type,
      },
      tooltip: {
        pointFormat: `{series.name}:<b> ${chartData.unit.prefix} {point.y:.${chartData.unit.decimalPlaces}f}  ${chartData.unit.suffix}</b>`,
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: `<b>{point.name}</b>: {point.percentage:.${chartData.unit.decimalPlaces}f} %`,
          },
          showInLegend: true,
        },
      },
      series: series,
    };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.PIE.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(chartSettings)
      .build();
  };

  private static getPieSeries(chartParameters: HighchartRequest, pieSeries: { name: string; y: number }[]) {
    return new Array({
      name: chartParameters.selectedCategory,
      data: pieSeries,
    });
  }

  private static getHighchartDataPoint(seriesList: Array<Series>): HighchartDataPoint {
    return {
      name: seriesList[0].name,
      x: undefined,
      y: seriesList[0].values[0].y,
    };
  }
}