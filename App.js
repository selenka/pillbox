import React from 'react';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Title, Text, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import MedicineScreen from './src/screens/medicine/MedicineScreen';
import MedicineItem from './src/screens/medicine/MedicineItem';
import MedicineGroup from './src/screens/medicine/MedicineGroup';
import MedicineGroupChecklist from './src/screens/medicine/MedicineGroupChecklist';
import ViewPillScreen from './src/screens/medicine/ViewPillScreen';
import CoursesScreen from './src/screens/courses/CoursesScreen';
import CourseItem from './src/screens/courses/CourseItem';
import { ProvideStore } from "./src/store";
import { ProvideCoursesStore } from "./src/store/courses";

import { ProvideModalStore } from "./src/store/modal";
import theme from "./src/utils/theme";
import Icon from 'react-native-vector-icons/AntDesign';

const HomeStack = createStackNavigator();
const MedicineStack = createStackNavigator();
const CoursesStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode="float">
            <HomeStack.Screen
                name="Home"
                options={{
                    headerTitle:
                        <Title style={{ color: theme.colors.disabled}}>
                          <Text style={{ color: theme.colors.accent}}>Heal</Text>
                          <Text style={{ color: theme.colors.primary}}>Me</Text> - Домашняя Аптечка
                        </Title>
                }}
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    );
};

const MedicineStackScreen = () => {
  return (
    <MedicineStack.Navigator headerMode="float">
      <MedicineStack.Screen
        name="Medicine"
        options={{ headerTitle: <Title>Аптечка</Title> }}
        component={MedicineScreen}
      />
      <MedicineStack.Screen
        name="MedicineItem"
        options={{ headerTitle: <Title>Лекарство</Title> }}
        component={MedicineItem}
      />
      <MedicineStack.Screen
        name="MedicineGroup"
        options={{ headerTitle: <Title>Группа</Title> }}
        component={MedicineGroup}
      />
      <MedicineStack.Screen
        name="MedicineGroupChecklist"
        options={{ headerTitle: <Title>Выберите группу</Title> }}
        component={MedicineGroupChecklist}
      />
      <MedicineStack.Screen
        name="ViewPillScreen"
        options={({ route, navigation }) => (
          {
            headerTitle: <Title>{route.params.name}</Title>,
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <Pressable
                onPress={() => {
                  navigation.navigate('MedicineItem', {
                    mode: 'edit',
                    pill: route.params.pill
                  })
                }}
              >
                <Icon style={{ margin: 5 }} name="pencil" size={30} color={theme.colors.accent} />
              </Pressable>
            ),
          }
        )}

        component={ViewPillScreen}
      />
    </MedicineStack.Navigator>
  );
}

const CoursesStackScreen = () => {
  return (
    <CoursesStack.Navigator>
      <CoursesStack.Screen
          name="Courses"
          options={{ headerTitle: <Title>Курсы</Title> }}
          component={CoursesScreen}
      />
      <CoursesStack.Screen
          name="CourseItem"
          options={{ headerTitle: <Title>Назначение</Title> }}
          component={CourseItem}
      />
    </CoursesStack.Navigator>
  );
}

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <ProvideStore>
                <ProvideModalStore>
                    <ProvideCoursesStore>
                        <NavigationContainer theme={theme}>
                          <Tab.Navigator
                            // screenOptions={{ tabBarLabel: false }}
                          >
                            <Tab.Screen
                              name="Home"
                              options={{
                                tabBarLabel: 'Главная',
                                tabBarIcon: ({ color }) => (
                                  <Icon name="home" color={color} size={25} />
                                ),
                              }}
                              component={HomeStackScreen}
                            />
                            <Tab.Screen
                              name="Medicine"
                              options={{
                                tabBarLabel: 'Аптечка',
                                tabBarIcon: ({ color }) => (
                                  <Icon name="medicinebox" color={color} size={25} />
                                ),
                              }}
                              component={MedicineStackScreen}
                            />
                            <Tab.Screen
                              name="Courses"
                              options={{
                                tabBarLabel: 'Расписание',
                                tabBarIcon: ({ color }) => (
                                  <Icon name="clockcircleo" color={color} size={24} />
                                ),
                              }}
                              component={CoursesStackScreen}
                            />
                          </Tab.Navigator>
                        </NavigationContainer>
                    </ProvideCoursesStore>
                 </ProvideModalStore>
            </ProvideStore>
        </PaperProvider>
    );
}

export default App;
