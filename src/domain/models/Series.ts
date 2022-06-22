import SeriesTypes, { SeriesType } from '../enums/SeriesTypes';
import Unit from './Unit';
import { Builder } from 'builder-pattern';
import DataPoint from './DataPoint';
import UnitTypes from '../enums/UnitTypes';

export default class Series {
  name: string = '';
  description: string = '';
  key: string = '';
  seriesType: SeriesTypes = SeriesTypes.DEFAULT;
  isVisible: boolean = true;
  values: Array<DataPoint> = new Array<DataPoint>();
  unit: Unit = Builder<Unit>().unitType(UnitTypes.UNKNOWN).build();
  meta: Map<string, string>; // is this automatically null?
}