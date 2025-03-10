import { useState } from 'react';
import { FlatList, View } from 'react-native';

import GroupItemMenu from '~/components/GroupItemMenu';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

type Group = {
  name: string;
  items: string[];
};

export default function Home() {
  const [groups, setGroups] = useState<Group[]>([
    {
      name: 'Games',
      items: ['Balatro', 'FL 24', 'Roblox', 'BioShock'],
    },
  ]);

  const onDelete = (name: string) => {
    setGroups(groups.filter((group) => group.name !== name));
  };

  return (
    <View className="p-6">
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Card className="w-full rounded-xl">
            <CardHeader className="w-full flex-row items-center justify-between">
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <GroupItemMenu name={item.name} onDelete={onDelete} />
            </CardHeader>
            <CardContent className="-mt-3">
              <Text className="text-sm text-gray-500">
                {item.items.length} item{item.items.length > 1 && 's'}
              </Text>
              <View className="mt-4 flex-row gap-1">
                {item.items.slice(0, 3).map((it) => (
                  <Badge key={it} variant="secondary">
                    <Text>{it}</Text>
                  </Badge>
                ))}
                {item.items.length - 3 > 0 && (
                  <Badge variant="secondary">
                    <Text>+{item.items.length - 3} more</Text>
                  </Badge>
                )}
              </View>
            </CardContent>
          </Card>
        )}
        ListEmptyComponent={
          <>
            <Text className="text-center">You have no group yet!</Text>
            <Text className="text-center text-blue-600 underline">Create new group</Text>
          </>
        }
      />
    </View>
  );
}
