import BaseEnumTypes from './BaseEnumTypes';

let i = 0;
export const SeriesType = Object.freeze
(
  {
    DEFAULT: { label: 'default', value: i++ },
    TOTAL: { label: 'total', value: i++ },
    OTHER: { label: 'other', value: i++ },
    AVERAGE: { label: 'average', value: i++ },
    META: { label: 'meta', value: i++ },
  });

export default class SeriesTypes implements BaseEnumTypes<SeriesTypes> {
  readonly label: string;
  readonly value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  static DEFAULT = new SeriesTypes(SeriesType.DEFAULT.label, SeriesType.DEFAULT.value);
  static TOTAL = new SeriesTypes(SeriesType.TOTAL.label, SeriesType.TOTAL.value);
  static OTHER = new SeriesTypes(SeriesType.OTHER.label, SeriesType.OTHER.value);
  static AVERAGE = new SeriesTypes(SeriesType.AVERAGE.label, SeriesType.AVERAGE.value);
  static META = new SeriesTypes(SeriesType.META.label, SeriesType.META.value);

  getType(label: string): SeriesTypes {
    return SeriesTypes.getSeriesType(label);
  }

  static getSeriesType = (label: string): SeriesTypes => {
    const key = Object.keys(SeriesTypes)
      .find(seriesType => seriesType.toLowerCase() == label);
    return SeriesTypes[key];

  };
}
