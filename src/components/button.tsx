import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="bg-blue-600 p-4 rounded-xl items-center justify-center shadow-sm"
    >
      <Text className="text-white font-bold text-base">{label}</Text>
    </TouchableOpacity>
  );
}