import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Colors, Fonts } from '../utils/Constants'; // use your color constants
import { useNetInfo } from "@react-native-community/netinfo";

const NetworkStatusBanner = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [slideAnim] = useState(new Animated.Value(-100));
    // const { type, isConnected } = useNetInfo();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                setIsConnected(false);
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setIsConnected(true);
                });
            }
        });

        return () => unsubscribe();
    }, [slideAnim]);

    if (isConnected) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.text}>No Internet Connection</Text>
        </Animated.View>
    );
};

export default NetworkStatusBanner;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#f87171', // red background for error
        width: '100%',
        paddingVertical: 8,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontFamily: Fonts.Medium,
        fontSize: 14,
    },
});
