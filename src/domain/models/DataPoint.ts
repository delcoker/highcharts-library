import { Builder } from "builder-pattern";
import { CategoryTypes } from "../enums/CategoryTypes";
import Category from "./Category";

export default class DataPoint {
  public category: Category = Builder<Category>()
    .label("2000")
    .value(2000)
    .categoryType(CategoryTypes.DEFAULT)
    .build();
  public y: number | undefined ;
}