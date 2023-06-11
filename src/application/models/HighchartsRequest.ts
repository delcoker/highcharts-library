import { Builder } from "builder-pattern";
import { Expose, Transform } from "class-transformer";
import ChartTypes from "../../domain/enums/ChartTypes";
import ChartData from "../../domain/models/ChartData";

export default class HighchartsRequest {
  @Transform(({ value }: { value: string }) => ChartTypes.getChartType(value), { toClassOnly: true })
  @Expose()
  public chartType: ChartTypes = ChartTypes.COLUMN;
  @Expose() public selectedCategory: string = "2000";
  @Expose() public chartData: ChartData = Builder(ChartData).build();
}

// (<EnumLayout>RewardCategory['swapPoints']).display
