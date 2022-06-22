import BaseEnumTypes from './BaseEnumTypes';

let i = 0;

export default class ChartTypes implements BaseEnumTypes<ChartTypes> {
  readonly label: string;
  readonly value: number;
  readonly display: string;
  readonly type: string;

  constructor(label: string, display: string, type: string, value: number) {
    this.label = label;
    this.display = display;
    this.value = value;
    this.type = type;
  }

  static BAR = new ChartTypes('bar', 'Bar', 'bar', i++);
  static COLUMN = new ChartTypes('column', 'Column', 'column', i++);
  static LINE = new ChartTypes('line', 'Line', 'line', i++);
  static AREA = new ChartTypes('area', 'Area', 'area', i++);
  static SPLINE = new ChartTypes('spline', 'Spline', 'spline', i++);
  static AREASPLINE = new ChartTypes('areaspline', 'Area Spline', 'areaspline', i++);
  static PIE = new ChartTypes('pie', 'pie', 'pie', i++);
  static SEMI_CIRCLE_DONUT = new ChartTypes('semi_circle_donut', 'Semi Circle Donut', 'semi circle donut', i++);
  static STACKED_COLUMN = new ChartTypes('stacked_column', 'Stacked Chart', 'column', i++);
  static STACKED_PERCENTAGE_COLUMN = new ChartTypes('stacked_percentage_column', 'Stacked Percentage Column', 'column', i++);
  static STACKED_PERCENTAGE_BAR = new ChartTypes('stacked_percentage_bar', 'Stacked Percentage Bar', 'bar', i++);
  static STACKED_BAR = new ChartTypes('stacked_bar', 'Stacked Bar', 'bar', i++);
  static SPLIT_PACKED_BUBBLE_CHART = new ChartTypes('split_packed_bubble_chart', 'Split Packed Bubble', 'packedbubble', i++);
  static TABLE = new ChartTypes('table', 'table', 'table', i++);
  static ORGANOGRAM = new ChartTypes('organogram', 'Organogram', 'organization', i++);
  static SPIDER_WEB = new ChartTypes('spider_web', 'Spider Web', 'line', i++);
  static VENN_DIAGRAM = new ChartTypes('venn_diagram', 'Venn Diagram', 'venn', i++);
  static WORD_CLOUD = new ChartTypes('word_cloud', 'Word Cloud', 'wordcloud', i++);
  static TREEMAP = new ChartTypes('treemap', 'treemap', 'treemap', i++);
  static MAP = new ChartTypes('map', 'map', 'map', i++);
  static TILE = new ChartTypes('tile', 'tile', 'tile', i++);

  getType(label: string): ChartTypes {
    return ChartTypes.getChartType(label);
  }

  static getChartType = (label: string): ChartTypes => {
    const key = Object.keys(ChartTypes)
      .find(chartType => chartType.toLowerCase() == label);
    return ChartTypes[key];

  };
}

// // This actually works
// ChartTypes.prototype.toString = function() {
//   return this.type;
// };
