import ChartTypes from "../enums/ChartTypes";
import { COLOUR_CODES } from "../enums/ColorPalette";
import Category from "./Category";
import Series from "./Series";
import Unit from "./Unit";

// type ChartTypeKey = keyof typeof ChartTypes; // https://stackoverflow.com/questions/43042549/typed-enum-instance-in-typescript

export default class ChartData {
  public id: string = "";
  // @Transform(({ value }) => ChartTypes.getChartType(value), { toClassOnly: true })
  public defaultChartType: ChartTypes = ChartTypes.COLUMN;
  public seriesList: Series[] = new Array<Series>();
  public categories: Map<string, Category> = new Map<string, Category>();
  public defaultCategory: string = "";
  public unit: Unit = new Unit();
  public colours: string[] = COLOUR_CODES;
  public title: string = "";


  public isNumericCategories = () => {
    if (this.categories && this.categories.values) {
      const firstCategory = Array.from(this.categories.values())[0];
      return typeof firstCategory.value === "number";
    }
    return false
  };

  // toHighchartResponse = (): HighchartResponse => {
  //   return Builder<HighchartResponse>()
  //     .chartType(this.defaultChartType.label)
  //     .selectedCategory(this.defaultCategory)
  //     .chartConfig('')
  //     .build();
  // };
}