import { Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2b7fff',
        tabBarStyle: {
          // Use explicit height instead of 'auto'
          height: 75, // Adjust this value based on your needs
          paddingTop: 10,
        },
        tabBarLabelStyle: { marginTop: 2, fontSize: 11, marginBottom: 8 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon type="antd" name="home" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <HeaderButton />
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: 'Group',
          tabBarIcon: ({ color }) => <TabBarIcon type="antd" name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon type="material" name="history" color={color} />,
        }}
      />
    </Tabs>
  );
}
