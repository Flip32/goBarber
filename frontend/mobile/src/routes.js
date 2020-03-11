import React from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { MaterialCommunityIcons } from 'react-native-vector-icons'


import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Dashboard from "~/pages/Dashboard";
import Profile from "~/pages/Profile";
import SelectProvider from "~/pages/New/SelectProvider";
import SelectDateTime from "~/pages/New/SelectDateTime";
import Confirm from "~/pages/New/Confirm";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function New({ navigation }) {

    return (
        <Stack.Navigator
            initialRouteName="SelectProvider"
            headerMode="screen"
        >
            <Stack.Screen
                name="SelectProvider"
                component={SelectProvider}
                options={{
                    title: 'Selecione o Prestador',
                    headerLeft:  () => (
                        <TouchableOpacity onPress={() => { navigation.push('Home') }} >
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                        marginLeft: 20
                    }
                }}
            />
            <Stack.Screen
                name="SelectDateTime"
                component={SelectDateTime}
                options={{
                    title: 'Agendamentos',
                    headerLeft:  () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('SelectProvider') }} >
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                        marginLeft: 20
                    }
                }}
            />
            <Stack.Screen
                name="Confirm"
                component={Confirm}
                options={{
                    title: 'Confirmar Agendamento',
                    headerLeft:  () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('SelectDateTime') }} >
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                        marginLeft: 20
                    }
                }}
            />


        </Stack.Navigator>
    )
}


function Home() {
    return (
        <Tab.Navigator initialRouteName="Dashboard"
                       tabBarOptions={{
                        keyboardHidesTabBar: true,
                        showIcon: true,
                        activeTintColor: '#e91e63',
                        inactiveTintColor: '#fff',
                        style: {
                            backgroundColor: '#DAA520'
                        }
        }}>
            <Tab.Screen
                name="DashBoard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: () => (
                        <Icon name="event" color='#fff' size={20} />
                    )
                }}
            />
            <Tab.Screen
                name="New"
                component={New}
                options={{
                    tabBarVisible: false,
                    tabBarLabel: 'Agendar',
                    tabBarIcon: () => (
                        <Icon name="add-circle-outline" color='#fff' size={20} />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Meu Perfil',
                    tabBarIcon: () => (
                        <Icon name="person" color='#fff' size={20} />
                    )
                }}
            />
        </Tab.Navigator>

    )
}


function Routes() {
    const signed = useSelector(state => state.auth.signed)

    return (
        <Stack.Navigator
            initialRouteName={ signed ? 'Home' : 'SignIn'}
            headerMode="none"
        >
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: 'Sign In',
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: 'Sign Up',
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
            />

        </Stack.Navigator>
    )
}


export default Routes
