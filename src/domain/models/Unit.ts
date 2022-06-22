import UnitTypes from '../enums/UnitTypes';

export default class Unit {
  name: string = '';
  description: string = 'no unit description';
  axisName: string = '';
  prefix: string = '';
  suffix: string = '';
  decimalPlaces: number = 2;
  unitType: UnitTypes = UnitTypes.DEFAULT;
}