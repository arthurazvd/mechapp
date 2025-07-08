import React from 'react';
import { Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DatePickerModalProps {
  visible: boolean;
  selectedDate: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  selectedDate,
  onChange,
  onClose,
}) => {
  if (!visible) return null;

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (event.type === 'set' && date) {
        onChange(date);
      }
    } else {
      if (date) onChange(date);
    }
  };

  return (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
      minimumDate={new Date()}
      onChange={handleChange}
    />
  );
};

