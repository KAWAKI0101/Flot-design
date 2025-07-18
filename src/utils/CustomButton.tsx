import React, { FC } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Fonts } from '../utils/Constants';
import CustomText from '../utils/CustomText';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  loading = false,
  title,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }): ViewStyle => {
        const backgroundColor = disabled
          ? Colors.disabled
          : pressed
          ? Colors.primary_light
          : Colors.primary;

        return {
          ...styles.btn,
          backgroundColor,
        } as ViewStyle; // ✅ ensure it's valid ViewStyle
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <CustomText style={styles.text} variant="h6" fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
  },
});

export default CustomButton;
