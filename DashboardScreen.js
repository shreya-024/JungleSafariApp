import React from 'react';
import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import InventoryScreen from './InventoryScreen';
import SalesScreen from './SalesScreen';
import ReportsScreen from './ReportsScreen';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  const navigation = useNavigation();

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#32CD32', '#228B22']}
        style={styles.tabButtonGradient}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );

  const CustomHeaderRight = () => (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => navigation.replace('Home')}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#ff4444', '#cc0000']}
        style={styles.logoutGradient}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#006400',
          height: 90,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.6)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        },
        tabBarStyle: {
          backgroundColor: '#006400',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        },
        tabBarActiveTintColor: '#FFD700', // Yellow for active label
        tabBarInactiveTintColor: '#d4ffd4', // Light green for inactive label
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, size }) => {
          let icon;
          const iconColor = '#FFD700'; // Yellow for all icons
          const outlineColor = focused ? '#FFD700' : '#90EE90'; // Yellow outline when active, light green when inactive

          if (route.name === 'Inventory') {
            icon = (
              <FontAwesome5 
                name="boxes" 
                size={size + 4} 
                color={iconColor} 
              />
            );
          } else if (route.name === 'Sales') {
            icon = (
              <MaterialIcons 
                name="attach-money" 
                size={size + 2} 
                color={iconColor} 
              />
            );
          } else if (route.name === 'Reports') {
            icon = (
              <Ionicons 
                name="analytics" 
                size={size + 2} 
                color={iconColor} 
              />
            );
          }
          return (
            <View style={[styles.iconContainer, { borderColor: outlineColor }]}>
              {icon}
            </View>
          );
        },
        headerRight: () => <CustomHeaderRight />,
      })}
    >
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen 
        name="Sales" 
        component={SalesScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 18,
    padding: 8,
    marginTop: 5,
    borderWidth: 2, // Added outline
    borderColor: '#FFD700', // Default outline color (will be overridden by focused state)
  },
  logoutButton: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  logoutGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default DashboardScreen;