/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, useColorScheme, View } from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './App/Screens/ProductList';
import ProductDetail from './App/Screens/ProductDetail';
const Stack = createStackNavigator();
const queryClient = new QueryClient();


function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductList}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
    </Stack.Navigator>
  )
}

function AppContent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductStack />
    </QueryClientProvider>
  );
}
function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}

export default App;
