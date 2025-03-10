import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

export default function GroupItemMenu({
  name,
  onDelete,
}: {
  name: string;
  onDelete: (name: string) => void;
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <View>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Pressable>
            {({ pressed }) => (
              <View className={cn('rounded-md p-2', pressed && 'bg-gray-200')}>
                <Entypo name="dots-three-vertical" size={14} color="black" />
              </View>
            )}
          </Pressable>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          <DropdownMenuItem>
            <Feather name="edit" size={16} color="black" />
            <Text className="native:text-base">Edit</Text>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => setOpenDeleteDialog((v) => !v)}>
            <Feather name="trash-2" size={16} color="black" />
            <Text className="native:text-base">Delete</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to delete "{name}"?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction asChild onPress={() => onDelete(name)}>
              <Text className="bg-red-500 text-center">Yes, delete</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
