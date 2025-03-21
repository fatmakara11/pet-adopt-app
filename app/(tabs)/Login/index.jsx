import { View, Text, Image } from 'react-native';
import React from 'react';

export default function LoginScreen() {
    return (
        <View>
            <Image
                source={require('../../../assets/images/login.png')}
                style={{
                    width: '100%',
                    height: 500,
                }}
            />
        </View>
    )
}