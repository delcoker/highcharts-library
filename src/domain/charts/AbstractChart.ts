import { Builder } from "builder-pattern";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import DataPoint from "../models/DataPoint";
import HighchartsDataPoint from "../models/highchart/HighchartsDataPoint";
import Series from "../models/Series";

export default abstract class AbstractChart {
  protected constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {

  }


  public static getHighchartsDataPoint(dataPoint: DataPoint): HighchartsDataPoint {
    return {
      name: dataPoint.category.label,
      x: dataPoint.category.value,
      y: dataPoint.y,
    };
  }

  public static getCategorySeriesList(oneSeries: Series, selectedCategory: string): Series[] {
    const seriesList = oneSeries.values.map(dataPoint => {
      if (dataPoint.category.label === selectedCategory) {
        const dp = Builder<DataPoint>()
          .category(dataPoint.category)
          .y(dataPoint.y)
          .build();
        return Builder<Series>()
          .name(oneSeries.name)
          .values(new Array<DataPoint>(dp))
          .build();
      }
    });

    return seriesList.filter(series => series !== undefined) as Series[];

  }
}