import ChartData from '../models/ChartData';
import HighchartResponse from '../../application/models/HighchartResponse';
import HighchartRequest from '../../application/models/HighchartRequest';
import IHighchartFactory from './IHighchartFactory';
import ChartTypes from '../enums/ChartTypes';
import { IChart } from '../charts/IChart';
import BarChart from '../charts/BarChart';
import { IllegalArgumentException } from '../exceptions/IllegalArgumentException';
import ColumnChart from '../charts/ColumnChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import AreaSplineChart from '../charts/AreaSplineChart';
import AreaChart from '../charts/AreaChart';
import { Service } from 'typedi';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';
import StackedColumnChart from '../charts/StackedColumnChart';
import SplineChart from '../charts/SplineChart';
import StackedBarChart from '../charts/StackedBarChart';
import StackedPercentageColumnChart from '../charts/StackedPercentageColumnChart';
import SemiCircleDonutChart from '../charts/SemiCircleDonutChart';
import SplitPackedBubbleChart from '../charts/SplitPackedBubbleChart';
import StackedPercentageBarChart from '../charts/StackedPercentageBarChart';
import Organogram from '../charts/Organogram';
import VennDiagram from '../charts/VennDiagram';
import SpiderWeb from '../charts/SpiderWeb';
import WordCloud from '../charts/WordCloud';

@Service()
export default class HighchartFactoryImpl implements IHighchartFactory {
  chartFactories: Map<ChartTypes, IChart>;

  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {
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
    this.chartFactories.set(ChartTypes.ORGANOGRAM, new Organogram(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.VENN_DIAGRAM, new VennDiagram(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.SPIDER_WEB, new SpiderWeb(this.highchartFormatter));
    this.chartFactories.set(ChartTypes.WORD_CLOUD, new WordCloud(this.highchartFormatter));
  }

  getChartData(chartData: ChartData, chartParameters: HighchartRequest): HighchartResponse {
    const chartType = chartParameters.chartType;
    if (chartType == ChartTypes.TABLE) {
      throw new IllegalArgumentException('Chart type coming soon! => ' + chartType.display);
    }

    const chartFactory = this.chartFactories.get(chartType);
    if (chartFactory == undefined) {
      throw new IllegalArgumentException('Unsupported chart type!');
    }
    return chartFactory.getChart(chartData, chartParameters);
  }

  // getGlobalSettings(highchartGlobalSettings: HighchartGlobalSettings): string
}