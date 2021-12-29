import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  const renderMealItem = (itemData) => {
    const isFav = favouriteMeals.some((meal) => meal.id === itemData.item.id);
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordibility={itemData.item.affordibility}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
            isFav,
          });
        }}
      />
    );
  };
  return (
    <View styles={styles.screen}>
      <FlatList
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: "100%", paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({});
