// https://www.sohamkamani.com/javascript/enums/
export default interface BaseEnumTypes<T> {
  readonly label: string;
  readonly value: number;

  getType(label: string): T;
}

