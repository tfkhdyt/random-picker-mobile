import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';

export default function GroupItemMenu({
  id,
  name,
  onDelete,
  onUpdate,
}: {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newName: string) => void;
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  return (
    <View>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <View className="rounded p-2 active:bg-gray-200">
            <Entypo name="dots-three-vertical" size={14} color="black" />
          </View>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onPress={() => setOpenUpdateDialog((v) => !v)}>
            <Feather name="edit" size={16} color="black" />
            <Text className="native:text-base">Rename</Text>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => setOpenDeleteDialog((v) => !v)}>
            <Feather name="trash-2" size={16} color="black" />
            <Text className="native:text-base">Delete</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={onDelete}
        name={name}
        id={id}
      />

      {/* update dialog */}
      <UpdateDialog
        open={openUpdateDialog}
        onUpdate={onUpdate}
        onOpenChange={setOpenUpdateDialog}
        name={name}
        id={id}
      />
    </View>
  );
}

const UpdateDialog = ({
  open,
  onOpenChange,
  id,
  name,
  onUpdate,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  id: number;
  name: string;
  onUpdate: (id: number, newName: string) => void;
}) => {
  const [value, setValue] = useState(name);

  const handleSubmit = () => {
    onUpdate(id, value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Rename "{name}"</DialogTitle>
        </DialogHeader>
        <View>
          <Label nativeID="name" className="mb-2">
            Name
          </Label>
          <Input
            nativeID="name"
            placeholder="New group name"
            value={value}
            onChangeText={setValue}
            onSubmitEditing={handleSubmit}
            returnKeyType="send" // Changes the return key label
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

const DeleteDialog = ({
  open,
  onOpenChange,
  name,
  onDelete,
  id,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  name: string;
  id: number;
  onDelete: (id: number) => void;
}) => {
  const handleSubmit = () => {
    onDelete(id);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete "{name}"?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction asChild onPress={handleSubmit}>
            <Text className="bg-red-600 text-center">Yes, delete</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
