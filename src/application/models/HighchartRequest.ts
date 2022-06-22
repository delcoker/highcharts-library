import { Expose, Transform } from 'class-transformer';
import ChartTypes from '../../domain/enums/ChartTypes';
import ChartData from '../../domain/models/ChartData';
import { Builder } from 'builder-pattern';

export default class HighchartRequest {
  @Transform(({ value }) => ChartTypes.getChartType(value), { toClassOnly: true })
  @Expose() chartType: ChartTypes = ChartTypes.COLUMN;
  @Expose() selectedCategory: string = '2000';
  @Expose() chartData: ChartData = Builder(ChartData).build();
}

// (<EnumLayout>RewardCategory['swapPoints']).display
