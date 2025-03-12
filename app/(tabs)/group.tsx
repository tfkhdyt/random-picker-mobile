import { useMutation, useQuery } from '@tanstack/react-query';
import { and, eq, ne } from 'drizzle-orm';
import { AlertTriangle } from 'lucide-react-native';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { toast } from 'sonner-native';

import GroupItemMenu from '~/components/GroupItemMenu';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { groupsTable } from '~/db/schema';
import { db } from '~/lib/db';
import { queryClient } from '~/lib/tanstack-query';

async function getGroups() {
  const groups = await db.query.groupsTable.findMany({ with: { items: true } });

  return groups;
}

export default function Home() {
  const groupsQuery = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        await db.delete(groupsTable).where(eq(groupsTable.id, id));
        toast.success('Group has been deleted');
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        toast.error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newName }: { id: number; newName: string }) => {
      try {
        const checkName = await db
          .select({ id: groupsTable.id })
          .from(groupsTable)
          .where(and(eq(groupsTable.name, newName), ne(groupsTable.id, id)));
        if (checkName.length > 0) {
          throw new Error('Group name already exists');
        }

        await db.update(groupsTable).set({ name: newName }).where(eq(groupsTable.id, id));

        toast.success('Group has been renamed');
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        toast.error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  const onDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const onUpdate = (id: number, newName: string) => {
    updateMutation.mutate({ id, newName });
  };

  return (
    <View className="p-6">
      {groupsQuery.isLoading && <ActivityIndicator />}
      {groupsQuery.error && (
        <Alert icon={AlertTriangle} variant="destructive" className="max-w-xl">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{groupsQuery.error.message}</AlertDescription>
        </Alert>
      )}
      <FlatList
        data={groupsQuery.data}
        renderItem={({ item }) => (
          <Card className="w-full rounded-xl">
            <CardHeader className="w-full flex-row items-center justify-between">
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <GroupItemMenu
                name={item.name}
                onDelete={onDelete}
                onUpdate={onUpdate}
                id={item.id}
              />
            </CardHeader>
            <CardContent className="-mt-3">
              <Text className="text-sm text-gray-500">
                {item.items.length} item{item.items.length > 1 && 's'}
              </Text>
              {item.items.length > 0 && (
                <View className="mt-4 flex-row gap-1">
                  {item.items.slice(0, 3).map((it) => (
                    <Badge key={it.id} variant="secondary">
                      <Text>{it.name}</Text>
                    </Badge>
                  ))}
                  {item.items.length - 3 > 0 && (
                    <Badge variant="secondary">
                      <Text>+{item.items.length - 3} more</Text>
                    </Badge>
                  )}
                </View>
              )}
            </CardContent>
          </Card>
        )}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={
          <>
            <Text className="text-center">You have no group yet!</Text>
            {/* <Text className="text-center text-blue-600 underline">Create new group</Text> */}
          </>
        }
      />
    </View>
  );
}
