import React from 'react'
import { View, Button, StyleSheet, Linking } from 'react-native'
import { googleAuthEndpoint } from '../api/baseUrl'
import * as WebBrowser from 'expo-web-browser'
import { handleOpenURL } from '../utils/handleOpenUrl'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { AppStackParamList } from '../navigators'


type GoogleSignInProps = {
    onSignInSuccess: (userInfo: unknown) => void;
    onSignInFailure: (error: unknown) => void;
};



const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignInFailure }) => {

    const navigation = useNavigation<NavigationProp<AppStackParamList, 'Tabs'>>()
    
    React.useEffect(() => {
        const handleUrl = (event: { url: string; }) => {
            handleOpenURL(event, navigation)
        }

        Linking.addEventListener('url', handleUrl)
        
    }, [navigation])


    const openWebBrowser = async () => {
        try {
            await WebBrowser.openBrowserAsync(googleAuthEndpoint)
        } catch (error) {
            onSignInFailure(error)
            console.log('ERROR', error)
        }
    
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <Button title="Sign in with Google" 
                    testID='google-sign-in-button'
                    onPress={openWebBrowser} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GoogleSignIn