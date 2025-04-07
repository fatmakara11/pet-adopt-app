import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import Colors from '../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useSSO, useAuth, useClerk } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { router } from 'expo-router';

export default function LoginScreen() {
    const { startSSOFlow } = useSSO();
    const { isSignedIn } = useAuth();
    const { signOut } = useClerk();

    useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            if (isSignedIn) {
                try {
                    await signOut();
                } catch (error) {
                    console.error('Signout error:', error);
                }
            }
        };
        checkSession();
    }, [isSignedIn, signOut]);

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri({
                    path: "/(tabs)/home"
                }),
            });

            if (createdSessionId) {
                await setActive({ session: createdSessionId });
                router.replace('/home');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    }, []);

    return (
        <View style={{
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Image
                source={require('./../../assets/images/login2.png')}
                style={{
                    width: '100%',
                    height: 500,
                }}
            />
            <View style={{
                padding: 20,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    textAlign: 'center'
                }}>
                    Ready to make new friend?
                </Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    textAlign: 'center',
                    color: Colors.GRAY
                }}>Let's adopt the pet which you like and make there life happy again</Text>

                <Pressable
                    onPress={onPress}
                    style={{
                        padding: 14,
                        marginTop: 100,
                        backgroundColor: Colors.PRIMARY,
                        width: '100%',
                        borderRadius: 14
                    }}

                >
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                        textAlign: 'center'
                    }}>Get Started</Text>
                </Pressable>
            </View>
        </View>
    )
} 