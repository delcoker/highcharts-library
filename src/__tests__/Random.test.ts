import { getChartData, getChartDataFromFile, greeter } from "../index";
import HighchartsFormatterImpl from "../domain/formatters/HighchartsFormatterImpl";
import HighchartsFactoryImpl from "../domain/factories/HighchartsFactoryImpl";
import ChartData from "../domain/models/ChartData";
import HighchartsRequest from "../application/models/HighchartsRequest";
import { Builder } from "builder-pattern";
import ChartTypes from "../domain/enums/ChartTypes";

test("My Greeter", () => {
  expect(greeter("Del")).toBe("Hello Del");
});

test("Test chart data", () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartData();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    // .chartData(chartData)
    .selectedCategory("2010")
    .chartType(ChartTypes.PIE)
    .build();
  // highchartsFormatter.init({}, chartData);

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  expect(highchartsResponse.chartType).toBe("pie");
  expect(highchartsResponse.chartConfig.series).toStrictEqual([{
      data: [
        { name: "Canada", y: 190.985 },
        { name: "Germany", "y": 3.7777 },
        { "name": "Sierra Leone", "y": 66.098 }]
    }]
  );
});

test("MANUAL Test chart data for JSFIDDLE", () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartData();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory("2010")
    .chartType(ChartTypes.COLUMN)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  // console.dir(highchartsResponse, { depth: null, colors: true });
  expect(highchartsResponse.chartType).toBe("column");
});


test("TEST AKORNO FILE DATA", () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  const chartData: ChartData = getChartDataFromFile();
  const highchartsRequest: HighchartsRequest = Builder(HighchartsRequest)
    .chartData(chartData)
    .selectedCategory("Thu")
    .chartType(ChartTypes.PIE)
    .build();

  const highchartsResponse = highchartsFactory.getChart(chartData, highchartsRequest);
  const config = highchartsResponse.chartConfig;
  // const configStringify = JSON.stringify(config);
  console.dir(config, { depth: null, colors: true });
  // expect(highchartsResponse.chartType).toBe("column");

  // console.log(JSON.stringify(config))

});
