import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import { InventoryProvider } from './context/InventoryContext'; // Import Inventory Provider

const Stack = createStackNavigator();

const App = () => {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
};

export default App;
