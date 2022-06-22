import ChartData from '../models/ChartData';
import HighchartRequest from '../../application/models/HighchartRequest';
import HighchartResponse from '../../application/models/HighchartResponse';
import { IChart } from './IChart';
import { Builder } from 'builder-pattern';
import ChartTypes from '../enums/ChartTypes';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';
import Series from '../models/Series';
import DataPoint from '../models/DataPoint';
import AbstractChart from './AbstractChart';

export default class SemiCircleDonutChart implements IChart {
  chartSettings = {};

  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
  }

  getChart = (chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse => {

    // let chartSettings = {};
    this.highchartFormatter.init(this.chartSettings, chartData);

    const semiCircleDonutSeries = chartData.seriesList
      .map(oneSeries => AbstractChart.getCategorySeriesList(oneSeries, chartParameters.selectedCategory))
      .map(oneCategorySeries => SemiCircleDonutChart.getHighchartSemiCircleDonutDataPoint(oneCategorySeries));

    const series = SemiCircleDonutChart.getSemiCircleDonutSeries(chartParameters, semiCircleDonutSeries);

    this.chartSettings = {
      ...this.chartSettings,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      tooltip: {
        pointFormat: `{series.name}:<b> {point.percentage:.${chartData.unit.decimalPlaces}f}</b>`,
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
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
        },
      },
      series: [{
        ...series,
        type: ChartTypes.PIE.type,
        innerSize: '50%',
      }],
    };

    return Builder<HighchartResponse>()
      .chartType(ChartTypes.PIE.label)
      .selectedCategory(chartParameters.selectedCategory)
      .chartConfig(this.chartSettings)
      .build();
  };

  public static getSemiCircleDonutSeries(chartParameters: HighchartRequest, SemiCircleDonutSeries: Array<string | number>[]) {
    return {
      name: chartParameters.selectedCategory,
      data: SemiCircleDonutSeries,
    };
  }

  public static getHighchartSemiCircleDonutDataPoint(seriesList: Array<Series>): Array<(string | number)> {
    return [seriesList[0].name, seriesList[0].values[0].y];
  }
}