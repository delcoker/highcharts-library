import DataPoint from '../models/DataPoint';
import HighchartDataPoint from '../models/highchart/HighchartDataPoint';
import Series from '../models/Series';
import { Builder } from 'builder-pattern';
import HighchartFormatterImpl from '../formatters/HighchartFormatterImpl';

export default abstract class AbstractChart {
  constructor(private readonly highchartFormatter: HighchartFormatterImpl) {

  }


  public static getHighchartDataPoint(dataPoint: DataPoint): HighchartDataPoint {
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

    return seriesList.filter(series => series);
  }
}