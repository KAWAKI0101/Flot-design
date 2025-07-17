import React, { useState, useRef, useEffect } from "react";
import {
  Keyboard,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");
const OTP_LENGTH = 4;

const OTPInput = ({ otp, onOtpChange }) => {
  const [otpArray, setOtpArray] = useState(otp.split(""));
  const inputRefs = useRef([]);
  const scaleAnim = useRef(otpArray.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    setOtpArray(otp.split(""));
    if (otp === new Array(OTP_LENGTH).fill("").join("")) {
      inputRefs.current[0]?.focus();
    }
  }, [otp]);

  const handleChangeText = (text, index) => {
    if (text.length > 1) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = text;
    setOtpArray(newOtpArray);
    onOtpChange(newOtpArray.join(""));

    if (text) {
      Animated.sequence([
        Animated.timing(scaleAnim[index], {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otpArray[index] === "") {
        if (index > 0) {
          const newOtpArray = [...otpArray];
          newOtpArray[index - 1] = "";
          setOtpArray(newOtpArray);
          onOtpChange(newOtpArray.join(""));
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = "";
        setOtpArray(newOtpArray);
        onOtpChange(newOtpArray.join(""));
      }
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otpArray.map((digit, index) => (
        <Animated.View
          key={index}
          style={[
            styles.otpBox,
            digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
            { transform: [{ scale: scaleAnim[index] }] },
          ]}
        >
          <TextInput
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.otpInput}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectionColor="#000"
            autoFocus={index === 0}
          />
        </Animated.View>
      ))}
    </View>
  );
};

const BOX_SIZE = width * 0.15;

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  otpBox: {
    width: BOX_SIZE,
    height: BOX_SIZE * 1.1,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  otpBoxEmpty: {
    borderColor: "#ccc",
  },
  otpBoxFilled: {
    borderColor: "#2563eb",
  },
  otpInput: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    width: "100%",
    height: "100%",
  },
});

export default OTPInput;
