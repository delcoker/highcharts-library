import UnitTypes from "../enums/UnitTypes";

export default class Unit {
  public name: string = "";
  public description: string = "no description";
  public axisName: string = "";
  public prefix: string = "";
  public suffix: string = "";
  public decimalPlaces: number = 2;
  public unitType: UnitTypes = UnitTypes.DEFAULT;
}
