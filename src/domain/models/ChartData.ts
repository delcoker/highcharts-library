import ChartTypes from '../enums/ChartTypes';
import Series from './Series';
import Category from './Category';
import Unit from './Unit';
import { COLOUR_CODES } from '../enums/ColorPalette';

// type ChartTypeKey = keyof typeof ChartTypes; // https://stackoverflow.com/questions/43042549/typed-enum-instance-in-typescript

export default class ChartData {
  id: string = '';
  // @Transform(({ value }) => ChartTypes.getChartType(value), { toClassOnly: true })
  defaultChartType: ChartTypes = ChartTypes.COLUMN;
  seriesList: Array<Series> = new Array<Series>();
  categories: Map<string, Category> = new Map<string, Category>();
  defaultCategory: string = '';
  unit: Unit = new Unit();
  colours: Array<string> | string[] = COLOUR_CODES;
  title: string = '';


  public isNumericCategories = () => {
    if (this.categories.values) {
      const firstCategory = Array.from(this.categories.values())[0];
      return typeof firstCategory.value === 'number';
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