import IBaseEnumTypes from "./IBaseEnumTypes";

let i = 0;

export default class ChartTypes implements IBaseEnumTypes<ChartTypes> {
  public static BAR = new ChartTypes("bar", "Bar", "bar", i++);
  public static COLUMN = new ChartTypes("column", "Column", "column", i++);
  public static LINE = new ChartTypes("line", "Line", "line", i++);
  public static AREA = new ChartTypes("area", "Area", "area", i++);
  public static SPLINE = new ChartTypes("spline", "Spline", "spline", i++);
  public static AREASPLINE = new ChartTypes("areaspline", "Area Spline", "areaspline", i++);
  public static PIE = new ChartTypes("pie", "pie", "pie", i++);
  public static SEMI_CIRCLE_DONUT = new ChartTypes("semi_circle_donut", "Semi Circle Donut", "semi circle donut", i++);
  public static STACKED_COLUMN = new ChartTypes("stacked_column", "Stacked Chart", "column", i++);
  public static STACKED_PERCENTAGE_COLUMN = new ChartTypes(
    "stacked_percentage_column",
    "Stacked Percentage Column",
    "column",
    i++
  );
  public static STACKED_PERCENTAGE_BAR = new ChartTypes("stacked_percentage_bar", "Stacked Percentage Bar", "bar", i++);
  public static STACKED_BAR = new ChartTypes("stacked_bar", "Stacked Bar", "bar", i++);
  public static SPLIT_PACKED_BUBBLE_CHART = new ChartTypes(
    "split_packed_bubble_chart",
    "Split Packed Bubble",
    "packedbubble",
    i++
  );
  public static TABLE = new ChartTypes("table", "table", "table", i++);
  public static ORGANOGRAM = new ChartTypes("organogram", "Organogram", "organization", i++);
  public static SPIDER_WEB = new ChartTypes("spider_web", "Spider Web", "line", i++);
  public static VENN_DIAGRAM = new ChartTypes("venn_diagram", "Venn Diagram", "venn", i++);
  public static WORD_CLOUD = new ChartTypes("word_cloud", "Word Cloud", "wordcloud", i++);
  public static TREEMAP = new ChartTypes("treemap", "treemap", "treemap", i++);
  public static MAP = new ChartTypes("map", "map", "map", i++);
  public static TILE = new ChartTypes("tile", "tile", "tile", i++);
  public readonly label: string;
  public readonly value: number;
  public readonly display: string;
  public readonly type: string;

  constructor(label: string, display: string, type: string, value: number) {
    this.label = label;
    this.display = display;
    this.value = value;
    this.type = type;
  }

  public static getChartType = (label: string): ChartTypes => {
    const key = Object.keys(ChartTypes).find((chartType) => chartType.toLowerCase() === label);

    if (key === undefined) {
      throw new Error();
    }
    return (ChartTypes as any)[key];
  };

  public getType(label: string): ChartTypes {
    return ChartTypes.getChartType(label);
  }
}

// // This actually works
// ChartTypes.prototype.toString = function() {
//   return this.type;
// };
