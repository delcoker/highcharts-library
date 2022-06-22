import { CategoryTypes } from '../enums/CategoryTypes';

export default class Category {
  label: string = '';
  key: string = '';
  value: number = null;
  categoryType: CategoryTypes;
}