// import { Service } from "typedi";
import HighchartsRequest from "../../application/models/HighchartsRequest";
import HighchartsResponse from "../../application/models/HighchartsResponse";
import AreaChart from "../charts/AreaChart";
import AreaSplineChart from "../charts/AreaSplineChart";
import BarChart from "../charts/BarChart";
import ColumnChart from "../charts/ColumnChart";
import { IChart } from "../charts/IChart";
import LineChart from "../charts/LineChart";
// import Organogram from "../charts/Organogram";
import PieChart from "../charts/PieChart";
import SemiCircleDonutChart from "../charts/SemiCircleDonutChart";
import SpiderWeb from "../charts/SpiderWeb";
import SplineChart from "../charts/SplineChart";
import SplitPackedBubbleChart from "../charts/SplitPackedBubbleChart";
import StackedBarChart from "../charts/StackedBarChart";
import StackedColumnChart from "../charts/StackedColumnChart";
import StackedPercentageBarChart from "../charts/StackedPercentageBarChart";
import StackedPercentageColumnChart from "../charts/StackedPercentageColumnChart";
import VennDiagram from "../charts/VennDiagram";
import WordCloud from "../charts/WordCloud";
import ChartTypes from "../enums/ChartTypes";
import { IllegalArgumentException } from "../exceptions/IllegalArgumentException";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import ChartData from "../models/ChartData";
import IHighchartsFactory from "./IHighchartsFactory";

// @Service()
export default class HighchartsFactoryImpl implements IHighchartsFactory {
  public chartFactories: Map<ChartTypes, IChart>;

  constructor(private readonly highchartFormatter: HighchartsFormatterImpl) {
    this.chartFactories = new Map();
    this.chartFactories.set(ChartTypes.BAR, new BarChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.COLUMN, new ColumnChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.LINE, new LineChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.AREA, new AreaChart(highchartFormatter));
    this.chartFactories.set(ChartTypes.AREASPLINE, new AreaSplineChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.SPLINE, new SplineChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.PIE, new PieChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.STACKED_COLUMN, new StackedColumnChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.STACKED_BAR, new StackedBarChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.STACKED_PERCENTAGE_COLUMN, new StackedPercentageColumnChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.STACKED_PERCENTAGE_BAR, new StackedPercentageBarChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.SEMI_CIRCLE_DONUT, new SemiCircleDonutChart(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.SPLIT_PACKED_BUBBLE_CHART, new SplitPackedBubbleChart(this.highchartFormatter));
    // this.chartFactories.set(ChartTypes.ORGANOGRAM, new Organogram(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.VENN_DIAGRAM, new VennDiagram(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.SPIDER_WEB, new SpiderWeb(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.WORD_CLOUD, new WordCloud(this.highchartFormatter));
  }

  public getChartData(chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse {
    const chartType = chartParameters.chartType;
    if (chartType === ChartTypes.TABLE) {
      throw new IllegalArgumentException("Chart type coming soon! => " + chartType.display);
    }

    const chartFactory = this.chartFactories.get(chartType);
    if (chartFactory === undefined) {
      throw new IllegalArgumentException("Unsupported chart type!");
    }
    return chartFactory.getChart(chartData, chartParameters);
  }

  // getGlobalSettings(highchartGlobalSettings: HighchartGlobalSettings): string
}