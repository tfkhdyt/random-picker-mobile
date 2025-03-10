import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = (
  | {
      type: 'antd';
      name: keyof typeof AntDesign.glyphMap;
    }
  | {
      type: 'material';
      name: keyof typeof MaterialIcons.glyphMap;
    }
) & {
  color: string;
};

export const TabBarIcon = ({ type, name, color }: Props) => {
  return type === 'antd' ? (
    <AntDesign name={name} size={24} color={color} />
  ) : (
    <MaterialIcons name={name} size={24} color={color} />
  );
};
