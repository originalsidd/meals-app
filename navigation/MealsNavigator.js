import { Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const MealsStack = createStackNavigator();
const FavMealsStack = createStackNavigator();
const RootStack =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const FiltersStack = createStackNavigator();
const MainStack = createDrawerNavigator();

const mealOptions = {
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
};

const MealsNavigator = () => {
  return (
    <MealsStack.Navigator
      screenOptions={{ ...mealOptions, headerTitle: "Meals Category" }}
    >
      <MealsStack.Screen name="Categories" component={CategoriesScreen} />
      <MealsStack.Screen name="MealDetail" component={MealDetailScreen} />
      <MealsStack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        // options={CategoryMealsScreen.navigationOptions}
      />
    </MealsStack.Navigator>
  );
};

const FavMealsNavigator = () => {
  return (
    <FavMealsStack.Navigator
      screenOptions={{ ...mealOptions, headerTitle: "Your Favourites" }}
    >
      <FavMealsStack.Screen name="Favourite" component={FavouritesScreen} />
      <FavMealsStack.Screen name="MealDetail" component={MealDetailScreen} />
      <FavMealsStack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        // options={CategoryMealsScreen.navigationOptions}
      />
    </FavMealsStack.Navigator>
  );
};

const FiltersNavigator = () => {
  return (
    <FiltersStack.Navigator
      screenOptions={{
        ...mealOptions,
        headerTitle: "Filters",
      }}
    >
      <FiltersStack.Screen name="Filters" component={FiltersScreen} />
    </FiltersStack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accentColor,
        tabBarLabelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
      shifting={true}
    >
      <RootStack.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={25}
                color={tabInfo.focused ? "white" : "rgba(255,255,255,0.5)"}
              />
            );
          },
          tabBarColor: Colors.primaryColor,
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
            ) : (
              "Meals"
            ),
        }}
      />
      <RootStack.Screen
        name="FavMeals"
        component={FavMealsNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-star"
                size={25}
                color={tabInfo.focused ? "white" : "rgba(255,255,255,0.5)"}
              />
            );
          },
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text>
            ) : (
              "Favourites"
            ),
        }}
      />
    </RootStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: Colors.accentColor,
          drawerLabelStyle: {
            fontFamily: "open-sans-bold",
          },
        }}
        initialRouteName="Root"
      >
        <MainStack.Screen
          name="Root"
          component={RootNavigator}
          options={{ drawerLabel: "Meals" }}
        />
        <MainStack.Screen
          name="Filter"
          component={FiltersNavigator}
          options={{ drawerLabel: "Filters" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
