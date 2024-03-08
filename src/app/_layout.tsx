import { Slot } from "expo-router"

import { 
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
} from "@expo-google-fonts/poppins"

import { StatusBar } from "react-native"

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium,  
    })

    if(!fontsLoaded) {
        return
    }

    return fontsLoaded ? (
        <>
            <Slot />
            <StatusBar barStyle="dark-content" />
        </>
    ) : null
}