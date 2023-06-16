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

  constructor() {
    this.id = "";
    this.defaultChartType = ChartTypes.COLUMN;
    this.seriesList = [];
    this.categories = new Map<string, Category>();
    this.defaultCategory = "";
    this.unit = new Unit();
    this.colours = COLOUR_CODES;
    this.title = "";
  }

  public isNumericCategories = (): boolean => {
    if (this.categories && this.categories.values) {
      const firstCategory = Array.from(this.categories.values())[0];
      return true;
    }
    return false;
  };

}
