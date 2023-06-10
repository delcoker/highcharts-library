import { Builder } from "builder-pattern";
import SeriesTypes, { SeriesType } from "../enums/SeriesTypes";
import UnitTypes from "../enums/UnitTypes";
import DataPoint from "./DataPoint";
import Unit from "./Unit";

export default class Series {
  public name: string = "";
  public description: string = "";
  public key: string = "";
  public seriesType: SeriesTypes = SeriesTypes.DEFAULT;
  public isVisible: boolean = true;
  public values: DataPoint[] = new Array<DataPoint>();
  public unit: Unit = Builder<Unit>().unitType(UnitTypes.UNKNOWN).build();
  public meta: Map<string, string> = new Map<string, string>(); // is this automatically null?
}