import BaseEnumTypes from './BaseEnumTypes';

let i = 0;
export const UnitType = Object.freeze(
  {
    DEFAULT: { label: 'default', value: i++ },
    CURRENCY: { label: 'currency', value: i++ },
    PERCENTAGE: { label: 'percentage', value: i++ },
    UNKNOWN: { label: 'unknown', value: i++ },
  });

export default class UnitTypes implements BaseEnumTypes<UnitTypes> {
  readonly label: string;
  readonly value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  static DEFAULT = new UnitTypes(UnitType.DEFAULT.label, UnitType.DEFAULT.value);
  static CURRENCY = new UnitTypes(UnitType.CURRENCY.label, UnitType.CURRENCY.value);
  static PERCENTAGE = new UnitTypes(UnitType.PERCENTAGE.label, UnitType.PERCENTAGE.value);
  static UNKNOWN = new UnitTypes(UnitType.UNKNOWN.label, UnitType.UNKNOWN.value);

  getType(label: string): UnitTypes {
    return UnitTypes.getUnitType(label);
  }

  static getUnitType = (label: string): UnitTypes => {
    const key = Object.keys(UnitTypes)
      .find(UnitType => UnitType.toLowerCase() == label);
    return UnitTypes[key];
  };
}
