import { Builder } from "builder-pattern";
import HighchartsFormatterImpl from "../formatters/HighchartsFormatterImpl";
import DataPoint from "../models/DataPoint";
import Series from "../models/Series";

export default abstract class AbstractChart {
  protected constructor(private readonly highchartsFormatter: HighchartsFormatterImpl) {

  }


  public static getHighchartsDataPoint(dataPoint: DataPoint): { name: string; x: number; y: number | null | undefined } {
    return {
      name: dataPoint.category.label,
      x: dataPoint.category.value,
      y: dataPoint.y
    };
  }

  public static getSingleSelectedCategoryDataPointFromSeries(oneSeries: Series, selectedCategory: string): Series[] {
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

    const oneSeriesListForCategory: Series[] = seriesList.filter((series): series is NonNullable<Series> => series !== undefined);

    if (oneSeriesListForCategory.length < 1) {
      const dp = Builder<DataPoint>()
        .category(oneSeries.values[0].category)
        .y(oneSeries.values[0].y)
        .build();

      const defaultSeriesListForCategory = Builder<Series>()
        .name(oneSeries.name) // TODO " No dp found for this series"
        .values(new Array<DataPoint>(dp))
        .build();

      return new Array<Series>(defaultSeriesListForCategory);
    }

    return oneSeriesListForCategory;

  }
}