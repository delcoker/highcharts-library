import IBaseEnumTypes from "./IBaseEnumTypes";

let i = 0;
export const SeriesType = Object.freeze({
  DEFAULT: { label: "default", value: i++ },
  TOTAL: { label: "total", value: i++ },
  OTHER: { label: "other", value: i++ },
  AVERAGE: { label: "average", value: i++ },
  META: { label: "meta", value: i++ }
});

export default class SeriesTypes implements IBaseEnumTypes<SeriesTypes> {
  public static DEFAULT = new SeriesTypes(SeriesType.DEFAULT.label, SeriesType.DEFAULT.value);
  public static TOTAL = new SeriesTypes(SeriesType.TOTAL.label, SeriesType.TOTAL.value);
  public static OTHER = new SeriesTypes(SeriesType.OTHER.label, SeriesType.OTHER.value);
  public static AVERAGE = new SeriesTypes(SeriesType.AVERAGE.label, SeriesType.AVERAGE.value);
  public static META = new SeriesTypes(SeriesType.META.label, SeriesType.META.value);
  public readonly label: string;
  public readonly value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  public static getSeriesType = (label: string): SeriesTypes => {
    const key = Object.keys(SeriesTypes).find((seriesType) => seriesType.toLowerCase() === label.toLowerCase());
    if (key === undefined) {
      throw new Error();
    }
    return (SeriesTypes as any)[key];
  };

  public getType(label: string): SeriesTypes {
    return SeriesTypes.getSeriesType(label);
  }
}
