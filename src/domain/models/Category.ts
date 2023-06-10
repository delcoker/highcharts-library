import { CategoryTypes } from "../enums/CategoryTypes";

export default class Category {
  public label: string = "";
  public key: string = "";
  public value: number = 0 ;
  public categoryType: CategoryTypes = CategoryTypes.DEFAULT;
}