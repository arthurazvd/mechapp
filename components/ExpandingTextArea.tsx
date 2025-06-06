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
import { globalStyles } from '../styles/globalStyles';


interface ExpandingTextAreaProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>; // estilo da View externa (centralizadora)
  contentStyle?: StyleProp<ViewStyle>;   // estilo da View interna (controla largura)
  inputStyle?: StyleProp<TextStyle>;
}

export const ExpandingTextArea: React.FC<ExpandingTextAreaProps> = ({
  value,
  onChangeText,
  label,
  placeholder = 'Digite aqui...',
  containerStyle,
  contentStyle,
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
    <View style={[styles.outerContainer, containerStyle]}>
      <View style={[styles.innerContainer, contentStyle]}>
        {label && <Text style={globalStyles.label}>{label}</Text>}
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
  },
  textArea: {
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 16,

    color: '#868686',
  },
});
