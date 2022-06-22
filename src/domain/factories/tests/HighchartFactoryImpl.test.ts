import ChartData from '../../models/ChartData';
import HighchartFormatterImpl from '../../formatters/HighchartFormatterImpl';
import HighchartFactoryImpl from '../HighchartFactoryImpl';
import { Builder } from 'builder-pattern';
import HighchartRequest from '../../../application/models/HighchartRequest';
import ChartTypes from '../../enums/ChartTypes';

jest.mock('../../formatters/HighchartFormatterImpl');

describe('Appropriate object/class produced by factory', () => {
  const highchartFormatter = new HighchartFormatterImpl();
  const highchartFactory = new HighchartFactoryImpl(highchartFormatter);

  let chartData;
  let highchartRequest;

  beforeEach(() => {
    chartData = Builder(ChartData).build();
    highchartRequest = Builder(HighchartRequest).build();
    highchartFormatter.init({}, chartData);
  });


  test('Default chart type used: column', () => {
    const highchartResponse = highchartFactory.getChartData(chartData, highchartRequest);
    expect(highchartResponse.chartType).toBe('column');
  });


  test('Specified chart type used', () => {
    highchartRequest.chartType = ChartTypes.SPLIT_PACKED_BUBBLE_CHART;
    const highchartResponse = highchartFactory.getChartData(chartData, highchartRequest);
    expect(highchartResponse.chartType).toBe(ChartTypes.SPLIT_PACKED_BUBBLE_CHART.label);
  });


  test('Default category used: 2000', () => {
    const highchartResponse = highchartFactory.getChartData(chartData, highchartRequest);
    expect(highchartResponse.selectedCategory).toBe('2000');
  });


  test('Passed category used', () => {
    highchartRequest.selectedCategory = '3333';
    const highchartResponse = highchartFactory.getChartData(chartData, highchartRequest);
    expect(highchartResponse.selectedCategory).toBe('3333');
  });
});

