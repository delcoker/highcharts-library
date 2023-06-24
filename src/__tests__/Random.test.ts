import { getChartData, getChartDataFromFile, greeter } from '../index';
import HighchartsFormatterImpl from '../domain/formatters/HighchartsFormatterImpl';
import HighchartsFactoryImpl from '../domain/factories/HighchartsFactoryImpl';
import ChartData from '../domain/models/ChartData';
import HighchartsRequest from '../application/models/HighchartsRequest';
import { Builder } from 'builder-pattern';
import ChartTypes from '../domain/enums/ChartTypes';
import ChatGPTServiceImpl from '../domain/services/ChatGPTServiceImpl';
import ChatGPTRepositoryImpl from '../infrastructure/repositories/ChatGPTRepositoryImpl';

require('dotenv').config();

test('My Greeter', () => {
  expect(greeter('Del')).toBe('Hello Del');
});

test('Test chart data', () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartData();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    // .chartData(chartData)
    .selectedCategory('2010')
    .chartType(ChartTypes.PIE)
    .build();
  // highchartsFormatter.init({}, chartData);

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  expect(highchartsResponse.chartType).toBe('pie');
  expect(highchartsResponse.chartConfig.series).toStrictEqual([{
      data: [
        { name: 'Canada', y: 190.985 },
        { 'name': 'Sierra Leone', 'y': 66.098 },
        { name: 'Germany', 'y': 3.7777 }],
    }],
  );
});

test('Test Chart Type works', () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartData();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory('2010')
    .chartType(ChartTypes.COLUMN)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  expect(highchartsResponse.chartType).toBe('column');
});


test.each([
  [ChartTypes.SEMI_CIRCLE_DONUT],
  // [ChartTypes.PIE], // fixme data type is not the same
  // Add more chart types
])('TEST PIE & SEMI CIRCLE DONUT SORT', (chartType) => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartDataFromFile();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory('Fri')
    .chartType(chartType)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  const config = highchartsResponse.chartConfig;
  expect(highchartsResponse.chartType).toBe(chartType.label);
  expect(config.series[0].data).toStrictEqual([

      ['Scoop of rice', 132],
      ['Just tilapia', 99],
      ['Fries & chicken', 83],
      ['Portion baked beans', 66],
      ['Rice & fish', 43],
      ['Aix lunch', 20],
      ['4.5 biscuits', 20],
      ['9.0 biscuit', 15],
      ['15% service fee', 15],
      ['Apple pear', 11],
    ],
  );
});


test.each([
  [ChartTypes.AREA],
  [ChartTypes.LINE],
  [ChartTypes.COLUMN],
  [ChartTypes.BAR],
  [ChartTypes.AREASPLINE],
  // Add more chart types
])('Ungrouped chart series is sorted using AbstractChart', (chartType) => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartDataFromFile();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory('Doesn\'t Matter')
    .chartType(chartType)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  const config = highchartsResponse.chartConfig;
  expect(highchartsResponse.chartType).toBe(chartType.label);
  expect(config.series).toStrictEqual(
    [
      { name: '15% service fee', data: [15, 67, null, 11] },
      { name: '4.5 biscuits', data: [20, 106, 54, 15] },
      { name: '9.0 biscuit', data: [15, 87, 45, 130] },
      { name: 'Aix lunch', data: [20, 35, null, null] },
      { name: 'Americana', data: [null, null, null, 21] },
      { name: 'Apple', data: [null, 62, null, 32] },
      { name: 'Apple pear', data: [11, 45, null, null] },
      { name: 'Assorted cookies', data: [null, 54, null, null] },
      { name: 'Assorted pastry', data: [null, 55, null, 9] },
      { name: 'Avocado slice', data: [null, 45, 78, null] },
      { name: 'Baguette', data: [null, null, null, 15] },
      { name: 'Baked beans', data: [null, 77, null, null] },
      { name: 'Banana', data: [null, null, null, 44] },
      { name: 'Bb cocktail', data: [null, null, null, 41] },
      { name: 'Beef only', data: [null, null, 33, null] },
      { name: 'Beef sausage', data: [null, 55, null, null] },
      { name: 'Beef saute', data: [null, 99, null, 21] },
      { name: 'Bel malt', data: [null, null, 56, 200] },
      { name: 'Big bottle water', data: [null, null, null, 20] },
      { name: 'Big hollandia', data: [null, null, 22, null] },
      { name: 'Boiled eggs/omelette', data: [null, null, 65, null] },
      { name: 'Boss baker', data: [null, null, 35, null] },
      { name: 'Bread roll', data: [null, null, 45, null] },
      { name: 'Brewed coffee', data: [null, null, 23, null] },
      { name: 'Can bel cola', data: [null, null, 12, null] },
      { name: 'Can drink', data: [null, null, 21, null] },
      { name: 'Carb & fish', data: [null, null, 88, null] },
      { name: 'Carb & sausage', data: [null, null, 10, null] },
      { name: 'Carnation milk', data: [null, null, 11, null] },
      { name: 'Cerelac', data: [null, null, 14, null] },
      { name: 'Fries & chicken', data: [83, null, null, null] },
      { name: 'Just tilapia', data: [99, null, null, null] },
      { name: 'Portion baked beans', data: [66, null, null, null] },
      { name: 'Rice & fish', data: [43, null, null, null] },
      { name: 'Scoop of rice', data: [132, null, null, null] },
    ],
  );
});

test('TEST AKORNO FILE DATA', async () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartDataFromFile();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory('444')
    .chartType(ChartTypes.COLUMN)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  const config = highchartsResponse.chartConfig;
  // const configStringify = JSON.stringify(config);
  // console.dir(config, { depth: null, colors: true });
  // expect(highchartsResponse.chartType).toBe("column");

  // console.log(JSON.stringify(config))
  const questions = [
    'Which item had the highest quantity sold?',
    'Which item had the lowest quantity sold?',
    'What is the overall trend in quantity sold for all items?',
    'Are there any items that consistently had high quantities sold?',
    'Are there any items that had a significant increase or decrease in quantity sold over time?',
    'Which day had the highest total quantity sold?',
    'Which day had the lowest total quantity sold?',
    'What is the overall trend in quantity sold over the days?',
    'Are there any days that consistently had high quantities sold?',
    'Are there any days that had a significant increase or decrease in quantity sold?',
  ];

  const prompt = `${JSON.stringify(config.series)}\n\nyAxis = ${JSON.stringify(config.yAxis)}\n\nxAxis = ${JSON.stringify(config.xAxis)}\n\nAnalysis:\n`;
  const questionsPrompt = questions.map((question, index) => `${index + 1}. ${question}`).join('\n');
  const fullPrompt = `${prompt}${questionsPrompt}\n\n`;

  const chatGPTService = new ChatGPTServiceImpl(new ChatGPTRepositoryImpl(process.env.HIGHCHARTS_LIB_OPEN_AI_API_KEY));

  const analysis = await chatGPTService.getAnalysis(fullPrompt)
    .then(responseText => responseText)
    .catch(error => console.error('Error:', error));

  console.log(analysis);


}, 20000);