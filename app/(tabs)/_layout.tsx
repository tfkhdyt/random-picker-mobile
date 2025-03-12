import AntDesign from '@expo/vector-icons/AntDesign';
import { useMutation } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { toast } from 'sonner-native';

import { TabBarIcon } from '../../components/TabBarIcon';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { getDbInstance } from '~/lib/db';
import { queryClient } from '~/lib/tanstack-query';

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
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: 'Group',
          tabBarIcon: ({ color }) => <TabBarIcon type="antd" name="bars" color={color} />,
          headerRight: () => <CreateNewGroup />,
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

const CreateNewGroup = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      try {
        const db = await getDbInstance();

        await db.runAsync('INSERT INTO groups (name) VALUES ($name)', { $name: name });

        setOpen(false);
        toast.success('Group created successfully');
        setValue('');
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        toast.error(msg);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ name: value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <View className="mr-2 rounded p-2 active:bg-gray-200">
          <AntDesign name="pluscircleo" size={20} color="black" />
        </View>
      </DialogTrigger>
      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Create new group</DialogTitle>
        </DialogHeader>
        <View>
          <Label nativeID="name" className="mb-2">
            Name
          </Label>
          <Input
            nativeID="name"
            placeholder="Example: Games, food, etc"
            value={value}
            onChangeText={setValue}
            onSubmitEditing={handleSubmit}
            returnKeyType="send" // Changes the return key label
            className="placeholder:text-base"
          />
        </View>
        <DialogFooter>
          <DialogClose asChild onPress={handleSubmit}>
            <Button>
              <Text>Save</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
