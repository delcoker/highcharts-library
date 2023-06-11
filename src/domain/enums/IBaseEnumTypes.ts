// https://www.sohamkamani.com/javascript/enums/
export default interface IBaseEnumTypes<T> {
  readonly label: string;
  readonly value: number;

  getType(label: string): T;
}
