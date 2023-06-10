import { Builder } from "builder-pattern";
import HighchartsRequest from "../../../application/models/HighchartsRequest";
import ChartTypes from "../../enums/ChartTypes";
import HighchartsFormatterImpl from "../../formatters/HighchartsFormatterImpl";
import ChartData from "../../models/ChartData";
import HighchartsFactoryImpl from "../HighchartsFactoryImpl";

jest.mock("../../formatters/HighchartsFormatterImpl");

describe("Appropriate object/class produced by factory", () => {
  const highchartsFormatter = new HighchartsFormatterImpl();
  const highchartsFactory = new HighchartsFactoryImpl(highchartsFormatter);

  let chartData: ChartData;
  let highchartsRequest: HighchartsRequest;

  beforeEach(() => {
    chartData = Builder(ChartData).build();
    highchartsRequest = Builder(HighchartsRequest).build();
    highchartsFormatter.init({}, chartData);
  });


  test("Default chart type used: column", () => {
    const highchartResponse = highchartsFactory.getChartData(chartData, highchartsRequest);
    expect(highchartResponse.chartType).toBe("column");
  });


  test("Specified chart type used", () => {
    highchartsRequest.chartType = ChartTypes.SPLIT_PACKED_BUBBLE_CHART;
    const highchartResponse = highchartsFactory.getChartData(chartData, highchartsRequest);
    expect(highchartResponse.chartType).toBe(ChartTypes.SPLIT_PACKED_BUBBLE_CHART.label);
  });


  test("Default category used: 2000", () => {
    const highchartResponse = highchartsFactory.getChartData(chartData, highchartsRequest);
    expect(highchartResponse.selectedCategory).toBe("2000");
  });


  test("Passed category used", () => {
    highchartsRequest.selectedCategory = "3333";
    const highchartResponse = highchartsFactory.getChartData(chartData, highchartsRequest);
    expect(highchartResponse.selectedCategory).toBe("3333");
  });
});

