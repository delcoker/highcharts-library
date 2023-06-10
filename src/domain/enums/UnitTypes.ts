import IBaseEnumTypes from "./IBaseEnumTypes";

let i = 0;
export const UnitType = Object.freeze(
  {
    DEFAULT: { label: "default", value: i++ },
    CURRENCY: { label: "currency", value: i++ },
    PERCENTAGE: { label: "percentage", value: i++ },
    UNKNOWN: { label: "unknown", value: i++ },
  });

export default class UnitTypes implements IBaseEnumTypes<UnitTypes> {
  public readonly label: string;
  public readonly value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  public static DEFAULT = new UnitTypes(UnitType.DEFAULT.label, UnitType.DEFAULT.value);
  public static CURRENCY = new UnitTypes(UnitType.CURRENCY.label, UnitType.CURRENCY.value);
  public static PERCENTAGE = new UnitTypes(UnitType.PERCENTAGE.label, UnitType.PERCENTAGE.value);
  public static UNKNOWN = new UnitTypes(UnitType.UNKNOWN.label, UnitType.UNKNOWN.value);

  public static getUnitType = (label: string): UnitTypes => {
    const key = Object.keys(UnitTypes)
      .find((unitType) => unitType.toLowerCase() === label);
    if (key === undefined) {
      throw new Error();
    }
    return (UnitTypes as any)[key];
  };

  public getType(label: string): UnitTypes {
    return UnitTypes.getUnitType(label);
  }
}
