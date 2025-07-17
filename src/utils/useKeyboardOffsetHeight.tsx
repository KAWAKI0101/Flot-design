

import { useEffect, useState } from "react";
import { Keyboard } from "react-native";


export default function useKeyboardOffsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0)

    useEffect(() => {
        // For Android, we primarily rely on keyboardDidShow and keyboardDidHide
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height)
            }
        )

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => { // Keyboard is hidden, so offset height is 0
                setKeyboardOffsetHeight(0)
            }
        )

        // Cleanup function to remove listeners when component unmounts
        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }

    }, []) // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return keyboardOffsetHeight
}