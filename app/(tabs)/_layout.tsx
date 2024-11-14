import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalProvider } from '../../provider/GlobalProvider';

export default function TabLayout() {
  return (
    <GlobalProvider>
    <Tabs 
      screenOptions={{
      tabBarActiveTintColor: '#17fc03',
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#25292e',
        padding: 6,
      },
      
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="gifts"
        options={{
          title: 'Gifts',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'gift' : 'gift-outline'} color={color} size={24}/>
          ),
        }}
      />
       <Tabs.Screen
          name="people" // This corresponds to app/(tabs)/people/index.tsx
          options={{
            title: "People",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "people-sharp" : "people-outline"} color={color} size={24} />
            ),
          }}
        />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar-clear-sharp' : 'calendar-clear-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
    </GlobalProvider>
  );
}