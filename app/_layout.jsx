import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store'

const tokenCache = {
    async getToken(key) {
        try {
            const item = await SecureStore.getItemAsync(key)
            if (item) {
                console.log('${key} was used \n')
            } else {
                console.log('No values stored under key:' + key)
            }
            return item
        } catch (error) {
            console.error('SecureStore get item error:', error)
            await SecureStore.deleteItemAsync(key)
            return null
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return
        }
    }
}

export default function Layout() {
    const CLERK_PUBLISHABLE_KEY = "pk_test_dHJ1c3R5LXNuaXBlLTkyLmNsZXJrLmFjY291bnRzLmRldiQ"

    const [fontsLoaded] = useFonts({
        'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
        'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),

    })

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={CLERK_PUBLISHABLE_KEY}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="Login/index"
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ClerkProvider>
    );
} 