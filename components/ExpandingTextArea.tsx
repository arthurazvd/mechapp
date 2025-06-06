import {
  TextInput,
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import React, { useState } from 'react';

interface ExpandingTextAreaProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const ExpandingTextArea: React.FC<ExpandingTextAreaProps> = ({
  value,
  onChangeText,
  label,
  placeholder = 'Digite aqui...',
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const [height, setHeight] = useState(100);

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    setHeight(e.nativeEvent.contentSize.height);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        onContentSizeChange={handleContentSizeChange}
        style={[
          styles.textArea,
          { height: Math.max(100, height) },
          inputStyle,
        ]}
        textAlignVertical="top"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#888',
  },
  textArea: {
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#868686',
  },
});
