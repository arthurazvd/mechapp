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
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles';

interface ExpandingTextAreaProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  minHeight?: number;
}

export const ExpandingTextArea: React.FC<ExpandingTextAreaProps> = ({
  value,
  onChangeText,
  label,
  placeholder = 'Digite aqui...',
  placeholderTextColor = colors.textHint,
  containerStyle,
  contentStyle,
  inputStyle,
  minHeight = 100,
  ...rest
}) => {
  const [height, setHeight] = useState(minHeight);

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
          placeholderTextColor={placeholderTextColor}
          multiline
          onContentSizeChange={handleContentSizeChange}
          style={[
            styles.textArea,
            { height: Math.max(minHeight, height) },
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
    marginBottom: spacing.medium,
    width: '100%', 
  },
  innerContainer: {
    width: '100%',
  },
  textArea: {
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.small,
    padding: spacing.medium,
    color: colors.textHint,
    fontSize: typography.fontSizeText,
    textAlignVertical: 'top', 
  },
});
