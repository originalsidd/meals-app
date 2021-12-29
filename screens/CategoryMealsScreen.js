import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const catId = props.route.params.categoryId;
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: selectedCategory.title,
    });
  }, [props.navigation]);

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
