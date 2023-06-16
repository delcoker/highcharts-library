import { Builder } from "builder-pattern";
import { CategoryTypes } from "./domain/enums/CategoryTypes";
import Category from "./domain/models/Category";
import DataPoint from "./domain/models/DataPoint";
import Series from "./domain/models/Series";
import Unit from "./domain/models/Unit";
import UnitTypes from "./domain/enums/UnitTypes";
import ChartData from "./domain/models/ChartData";
import SeriesTypes from "./domain/enums/SeriesTypes";
import * as data from "./domain/formatters/akorno.json"

export const greeter = (name: string) => `Hello ${name}`;

export const getChartData = (): ChartData => {
  // dummy chart data start
  const category2010 = Builder(Category).label("2010").categoryType(CategoryTypes.DEFAULT).value(2010).build();
  const category2011 = Builder(Category).label("2011").categoryType(CategoryTypes.DEFAULT).value(2011).build();
  const category2012 = Builder(Category).label("2012").categoryType(CategoryTypes.DEFAULT).value(2012).build();
  const category2013 = Builder(Category).label("2013").categoryType(CategoryTypes.DEFAULT).value(2013).build();
  const category2014 = Builder(Category).label("2014").categoryType(CategoryTypes.DEFAULT).value(2014).build();
  const category2015 = Builder(Category).label("2015").categoryType(CategoryTypes.DEFAULT).value(2015).build();

  const canadaDataPoint1 = Builder(DataPoint).y(190.985).category(category2010).build();
  const canadaDataPoint2 = Builder(DataPoint).y(200.544).category(category2011).build();
  const canadaDataPoint3 = Builder(DataPoint).y(140.5).category(category2012).build();
  const canadaDataPoint4 = Builder(DataPoint).y(600.333).category(category2013).build();
  const canadaDataPoint5 = Builder(DataPoint).y(203.345).category(category2014).build();
  const canadaDataPoint6 = Builder(DataPoint).y(14.222).category(category2015).build();

  const germanyDataPoint1 = Builder(DataPoint).y(3.7777).category(category2010).build();
  const germanyDataPoint2 = Builder(DataPoint).y(10.999).category(category2011).build();
  const germanyDataPoint3 = Builder(DataPoint).y(481.989).category(category2012).build();
  const germanyDataPoint4 = Builder(DataPoint).y(30.7899).category(category2013).build();
  const germanyDataPoint5 = Builder(DataPoint).y(410.654).category(category2014).build();
  const germanyDataPoint6 = Builder(DataPoint).y(110.345).category(category2015).build();

  const sierraLeonePoint1 = Builder(DataPoint).y(66.098).category(category2010).build();
  const sierraLeonePoint2 = Builder(DataPoint).y(60.543).category(category2011).build();
  const sierraLeonePoint3 = Builder(DataPoint).y(81.654).category(category2012).build();
  const sierraLeonePoint4 = Builder(DataPoint).y(130.919).category(category2013).build();
  const sierraLeonePoint5 = Builder(DataPoint).y(910.76999997).category(category2014).build();
  const sierraLeonePoint6 = Builder(DataPoint).y(710.9).category(category2015).build();

  const dpsCanada = new Array<DataPoint>(canadaDataPoint1, canadaDataPoint2, canadaDataPoint3, canadaDataPoint4, canadaDataPoint5, canadaDataPoint6);
  const dps2 = new Array<DataPoint>(germanyDataPoint1, germanyDataPoint2, germanyDataPoint3, germanyDataPoint4, germanyDataPoint5, germanyDataPoint6);
  const dps3 = new Array<DataPoint>(sierraLeonePoint1, sierraLeonePoint2, sierraLeonePoint3, sierraLeonePoint4, sierraLeonePoint5, sierraLeonePoint6);

  let canada = Builder(Series).name("Canada").isVisible(true).values(dpsCanada).build();
  let germany = Builder(Series).name("Germany").isVisible(true).values(dps2).build();
  let sierraLeone = Builder(Series).name("Sierra Leone").isVisible(true).values(dps3).build();

  const seriesList = new Array<Series>(canada, germany, sierraLeone);
  const seriesUnit = Builder(Unit)
    .name("unit name")
    .axisName("axis name")
    .unitType(UnitTypes.UNKNOWN)
    .prefix("pre")
    .suffix("suf")
    .decimalPlaces(2)
    .build();

  const categories = seriesList
    .flatMap((oneSeries) => oneSeries.values)
    .map((dataP: { category: any }) => dataP.category)
    .map((category: { label: any }) => [category.label, category]);

  // console.logger(categories);
  // const intersection = manualCategories.filter(element => categories.includes(element));
  // console.logger(intersection);

  return Builder(ChartData)
    .id("special")
    .title("title")
    // .defaultChartType(ChartTypes.COLUMN)
    .categories(new Map<string, Category>(Object.assign(categories))) // what's this property for
    .seriesList(seriesList)
    .defaultCategory("2012")
    .unit(seriesUnit)
    // .colours([COLOUR_CODES[5], COLOUR_CODES[9]]) // use default colour scheme cause Builder default
    .build();
};

  export const getChartDataFromFile = (): ChartData => {
    const categoriesMap = new Map<string, Category>();
    Object.entries(data.categories).forEach(([key, value]) => {
      const category = new Category();
      category.label = value.label;
      category.key = value.key ?? "";
      category.value = value.value;
      category.categoryType = CategoryTypes[value.categoryType as keyof typeof CategoryTypes];
      categoriesMap.set(key, category);
    });

    const seriesArray: Array<Series> = data.seriesList.map(series => {
      const dataPoints: Array<DataPoint> = series.values.map(value => {
        const dataPoint = new DataPoint();
        dataPoint.category = {
          label: value.category.label,
          key: value.category.key ?? "",
          value: value.category.value,
          categoryType: CategoryTypes[value.category.categoryType as keyof typeof CategoryTypes]
        };
        dataPoint.y = value.y;
        return dataPoint;
      });

      return Builder<Series>()
        .name(series.name)
        .description(series.description ?? "")
        .key(series.key ?? "")
        .seriesType(SeriesTypes.getSeriesType(series.seriesType.label))
        .isVisible(series.visible)
        .values(dataPoints)
        .unit(Builder<Unit>().unitType(UnitTypes.UNKNOWN).build())
        .meta(new Map<string, string>())
        .build();
    });

    const unitObject = data.unit;
    const unit = Builder<Unit>()
      .name(unitObject.name)
      .description(unitObject.description || "no description")
      .axisName(unitObject.axisName)
      .prefix(unitObject.prefix)
      .suffix(unitObject.suffix)
      .decimalPlaces(unitObject.decimalPlaces)
      .unitType(UnitTypes.getUnitType(unitObject.unitType))
      .build();

    return Builder(ChartData)
      .categories(categoriesMap)
      .seriesList(seriesArray)
      .id(data.id)
      .unit(unit)
      .defaultCategory(data.defaultCategory)
      .title(data.title)
      .colours(data.colours)
      .build();
  }