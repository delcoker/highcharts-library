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
import Organogram from "../charts/Organogram";
import TreeMap from "../charts/TreeMap";

// @Service()
export default class HighchartsFactoryImpl implements IHighchartsFactory {
  public chartFactories: Map<ChartTypes, IChart>;

  constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {
    this.chartFactories = new Map();
    this.chartFactories.set(ChartTypes.BAR, new BarChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.COLUMN, new ColumnChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.LINE, new LineChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.AREA, new AreaChart(highchartsFormatter));
    this.chartFactories.set(ChartTypes.AREASPLINE, new AreaSplineChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.SPLINE, new SplineChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.PIE, new PieChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.STACKED_COLUMN, new StackedColumnChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.STACKED_BAR, new StackedBarChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.STACKED_PERCENTAGE_COLUMN, new StackedPercentageColumnChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.STACKED_PERCENTAGE_BAR, new StackedPercentageBarChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.SEMI_CIRCLE_DONUT, new SemiCircleDonutChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.SPLIT_PACKED_BUBBLE_CHART, new SplitPackedBubbleChart(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.ORGANOGRAM, new Organogram(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.VENN_DIAGRAM, new VennDiagram(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.SPIDER_WEB, new SpiderWeb(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.WORD_CLOUD, new WordCloud(this.highchartsFormatter));
    this.chartFactories.set(ChartTypes.TREEMAP, new TreeMap(this.highchartsFormatter));
  }

  public getChart(chartData: ChartData, chartParameters: HighchartsRequest): HighchartsResponse {
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
