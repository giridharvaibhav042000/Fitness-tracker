import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#1a1a1a', borderTopColor: '#2a2a2a', height: 60, paddingBottom: 8 },
      tabBarActiveTintColor: '#a3e635',
      tabBarInactiveTintColor: '#52525b',
    }}>
      <Tabs.Screen name="index"     options={{ title: 'Home',      tabBarLabel: 'Home' }} />
      <Tabs.Screen name="workout"   options={{ title: 'Workout',   tabBarLabel: 'Workout' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition', tabBarLabel: 'Nutrition' }} />
      <Tabs.Screen name="progress"  options={{ title: 'Progress',  tabBarLabel: 'Progress' }} />
      <Tabs.Screen name="more"      options={{ title: 'More',      tabBarLabel: 'More' }} />
    </Tabs>
  )
}
