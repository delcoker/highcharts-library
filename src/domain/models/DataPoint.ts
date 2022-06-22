import Category from './Category';
import { Builder } from 'builder-pattern';
import { CategoryTypes } from '../enums/CategoryTypes';

export default class DataPoint {
  category: Category = Builder<Category>()
    .label("2000")
    .value(2000)
    .categoryType(CategoryTypes.DEFAULT)
    .build();
  y: number = null;
}