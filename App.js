import React from 'react';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Title, Text, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import MedicineScreen from './src/screens/medicine/MedicineScreen';
import MedicineItem from './src/screens/medicine/MedicineItem';
import MedicineGroup from './src/screens/medicine/MedicineGroup';
import MedicineGroupChecklist from './src/screens/medicine/MedicineGroupChecklist';
import ViewPillScreen from './src/screens/medicine/ViewPillScreen';
import CoursesScreen from './src/screens/courses/CoursesScreen';
import { ProvideStore } from "./src/store";
import { ProvideModalStore } from "./src/store/modal";
import theme from "./src/utils/theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeStack = createStackNavigator();

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <ProvideStore>
                <ProvideModalStore>
                    <NavigationContainer>
                        <HomeStack.Navigator headerMode="float">
                            <HomeStack.Screen
                                name="Home"
                                options={{
                                    headerTitle:
                                        <Title style={{ color: theme.colors.disabled}}>
                                            Heal<Text style={{ color: theme.colors.accent}}>Me</Text> - Домашняя Аптечка
                                        </Title>
                                }}
                                component={HomeScreen}
                            />
                            <HomeStack.Screen
                                name="Medicine"
                                options={{ headerTitle: <Title>Аптечка</Title> }}
                                component={MedicineScreen}
                            />
                            <HomeStack.Screen
                                name="MedicineItem"
                                options={{ headerTitle: <Title>Лекарство</Title> }}
                                component={MedicineItem}
                            />
                            <HomeStack.Screen
                                name="MedicineGroup"
                                options={{ headerTitle: <Title>Группа</Title> }}
                                component={MedicineGroup}
                            />
                            <HomeStack.Screen
                                name="MedicineGroupChecklist"
                                options={{ headerTitle: <Title>Выберите группу</Title> }}
                                component={MedicineGroupChecklist}
                            />
                            <HomeStack.Screen
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
                            <HomeStack.Screen
                                name="Courses"
                                options={{ headerTitle: <Title>Курсы</Title> }}
                                component={CoursesScreen}
                            />
                        </HomeStack.Navigator>
                    </NavigationContainer>
                </ProvideModalStore>
            </ProvideStore>
        </PaperProvider>
    );
}

export default App;
