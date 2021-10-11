import React, { useRef }  from 'react';
import { Pressable, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Title, Subheading, Text, Provider as PaperProvider, Caption } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import MedicineScreen from './src/screens/medicine/MedicineScreen';
import MedicineItem from './src/screens/medicine/MedicineItem';
import MedicineGroup from './src/screens/medicine/MedicineGroup';
import MedicineGroupChecklist from './src/screens/medicine/MedicineGroupChecklist';
import ViewPillScreen from './src/screens/medicine/ViewPillScreen';
import CoursesScreen from './src/screens/courses/CoursesScreen';
import CourseItem from './src/screens/courses/CourseItem';
import CourseItemTimers from './src/screens/courses/CourseItemTimers';
import { ProvideStore } from "./src/store/medicine";

import { ProvideCoursesStore, useCourses } from './src/store/courses';
import { ProvideModalStore, useModal } from './src/store/modal';
import theme from "./src/utils/theme";
import Icon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ViewCourseScreen from './src/screens/courses/ViewCourseScreen';
import Notification from './src/components/Notification';
import FABgroup from './src/components/FABgroup';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import { Level } from './src/components/HealLevel';

const Stack = createStackNavigator();

const HomeStack = createStackNavigator();
const MedicineMainStack = createStackNavigator();
const MedicineStack = createStackNavigator();
const MainCoursesStack = createStackNavigator();
const CoursesStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                options={{
                  headerTitle:
                    <Title >
                      <Text style={{ color: theme.colors.accent}}>Heal</Text>
                      <Text style={{ color: theme.colors.primary}}>Me</Text>
                      <Text style={{ fontSize: 17, color: theme.colors.disabled}}> - Домашняя Аптечка</Text>
                    </Title>,
                  // eslint-disable-next-line react/display-name
                  headerLeft: () => (
                    // <Pressable onPress={() => setVisible(true)}>
                      <Level />
                    // </Pressable>
                  )
                }}
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    );
};

const MainMedicineStackScreen = () => {
  const { setFABVisible } = useModal()
  return (
    <MedicineMainStack.Navigator>
      <MedicineMainStack.Screen
        name="MedicineHome"
        options={({  navigation }) => (
          {
            headerTitle: <Title>Аптечка</Title>,
            // eslint-disable-next-line react/display-name
            headerRight: () =>(
              <Button title='Группы' onPress={() => {
                setFABVisible(false)
                navigation.navigate('Medicine', { screen: 'MedicineGroup' })
              }}/>
            )
          }
        )}
        component={MedicineScreen}
      />
    </MedicineMainStack.Navigator>
  );
};

const MainCoursesStackScreen = () => {
  return (
    <MainCoursesStack.Navigator>
      <MainCoursesStack.Screen
        name="CoursesHome"
        options={() => (
          {
            headerTitle: <Title>Расписание</Title>,
          }
        )}
        component={CoursesScreen}
      />
    </MainCoursesStack.Navigator>
  );
};

const MedicineStackScreen = () => {
  const { setVisible } = useModal()

  return (
    <MedicineStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <MedicineStack.Screen
        name="MedicineItem"
        options={{
          headerTitle: <Title>Лекарство</Title>,
          headerBackTitle: <Subheading>Аптечка</Subheading>,
        }}
        component={MedicineItem}
      />
      <MedicineStack.Screen
        name="MedicineGroup"
        options={{
          headerTitle: <Title>Группа</Title>,
          headerBackTitle: <Subheading>Назад</Subheading>,
        }}
        component={MedicineGroup}
      />
      <MedicineStack.Screen
        name="MedicineGroupChecklist"
        options={() => (
          {
            headerTitle: <Title>Выберите группу</Title>,
            headerBackTitle: <Subheading>Назад</Subheading>,
            // eslint-disable-next-line react/display-name
            headerRight: () =>(
              <Pressable onPress={() => setVisible(true)}>
                <Icon style={{ margin: 5 }} name="plus" size={25} color={theme.colors.accent} />
              </Pressable>
            )
          }
        )}
        component={MedicineGroupChecklist}
      />
      <MedicineStack.Screen
        name="ViewPillScreen"
        options={({ route, navigation }) => (
          {
            headerTitle: <Title>{route.params.name}</Title>,
            headerBackTitle: <Subheading>Аптечка</Subheading>,
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Medicine', {
                    screen: 'MedicineItem',
                    params: {
                      mode: 'edit',
                      pill: route.params.pill
                    }
                  })
                }}
              >
                <Icon style={{ margin: 5 }} name="edit" size={30} color={theme.colors.accent} />
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
  const { newCourse, setNewCourse } = useCourses()
  return (
    <CoursesStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <CoursesStack.Screen
          name="CourseItem"
          options={{
            headerTitle: <Title>Назначение</Title>,
            headerBackTitle: <Subheading>Расписание</Subheading>,
          }}
          component={CourseItem}
      />
      <CoursesStack.Screen
        name="CourseItemTimers"
        options={() => (
          {
            headerTitle: <Title>Напоминания</Title>,
            headerBackTitle: <Subheading>Назад</Subheading>,
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <Pressable
                onPress={() => {
                  let timers = newCourse.timers.map((t) => ({ ...t }));
                  const lastTimer = timers[timers.length - 1]
                  timers.push({
                    id: lastTimer.id + 1,
                    time: moment(lastTimer.time).add(3, 'hours').toDate(),
                    meal: 'any_meal'
                  })
                  setNewCourse({ ...newCourse, timers})
                }}
              >
                <Icon style={{ margin: 5 }} name="plus" size={30} color={theme.colors.accent} />
              </Pressable>
            ),
          }
        )}
        component={CourseItemTimers}
      />
      <CoursesStack.Screen
        name="ViewCourseScreen"
        options={({ route, navigation }) => (
          {
            headerTitle: <Title>{route.params.name}</Title>,
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Courses', {
                    screen: 'CourseItem',
                    params: {
                      mode: 'edit',
                      course: route.params.course
                    }
                  })
                }}
              >
                <Icon style={{ margin: 5 }} name="edit" size={30} color={theme.colors.accent} />
              </Pressable>
            ),
          }
        )}

        component={ViewCourseScreen}
      />
    </CoursesStack.Navigator>
  );
}

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        options={{
          headerTitle:
          <View style={{ paddingTop: 7, alignItems: 'center' }}>
            <Title style={{ color: theme.colors.disabled}}>
              <Text style={{ color: theme.colors.accent}}>Heal</Text>
              <Text style={{ color: theme.colors.primary}}>Me</Text> - Домашняя Аптечка
            </Title>
            <Caption>v. 1.0</Caption>
          </View>
        }}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color }) => (
            <IIcon name="home" color={color} size={25} />
          ),
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="MedicineTab"
        options={{
          tabBarLabel: 'Аптечка',
          tabBarIcon: ({ color }) => (
            <IIcon name="ios-medkit-outline" color={color} size={25} />
          ),
        }}
        component={MainMedicineStackScreen}
      />
      <Tab.Screen
        name="CoursesTab"
        options={{
          tabBarLabel: 'Расписание',
          tabBarIcon: ({ color }) => (
            <IIcon name="time-outline" color={color} size={26} />
          ),
        }}
        component={MainCoursesStackScreen}
      />
      <Tab.Screen
        name="SettingsTab"
        options={{
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ color }) => (
            <IIcon name="cog-outline" color={color} size={26} />
          ),
        }}
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  const ref = useRef(null);
  const isAuthorized = true;
    return (
        <PaperProvider theme={theme}>
            <ProvideStore>
                <ProvideModalStore>
                    <ProvideCoursesStore>
                      <SafeAreaProvider>
                        {
                          isAuthorized
                            ? <>
                              <NavigationContainer ref={ref} theme={theme}>
                                <Stack.Navigator
                                  initialRouteName='Home'
                                  screenOptions={{
                                    ...TransitionPresets.ModalSlideFromBottomIOS,
                                  }}
                                >
                                  <Stack.Screen
                                    name="Home"
                                    component={Tabs}
                                    options={{ headerShown: false }}
                                  />
                                  <Stack.Screen
                                    name="Medicine"
                                    options={{ headerShown: false }}
                                    component={MedicineStackScreen}
                                  />
                                  <Stack.Screen
                                    name="Courses"
                                    options={{ headerShown: false }}
                                    component={CoursesStackScreen}
                                  />
                                </Stack.Navigator>
                              </NavigationContainer>
                              <FABgroup appRef={ref}/>
                              <Notification />
                            </>
                            : <Login />
                        }
                      </SafeAreaProvider>
                    </ProvideCoursesStore>
                 </ProvideModalStore>
            </ProvideStore>
        </PaperProvider>
    );
}

export default App;
