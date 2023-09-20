
import * as WebBrowser from 'expo-web-browser'

import { getQueryParam } from './getQueryParam'

import { saveString } from './storage'
import { NavigationProp } from '@react-navigation/native'
import { AppStackParamList } from '../navigators'


export const handleOpenURL = async (event: { url: string; }, navigation: NavigationProp<AppStackParamList, 'Tabs'>) => {

    
    try {
    
        const token = getQueryParam(event.url, 'userTkn')
    
        if (!token) {
            throw new Error('Could not process the request, please try again.')
        }

        const savedToken = await saveString('token', token)

        if (!savedToken) {
            throw new Error('Could not process the request, please try again.')
        }

        navigation.navigate('Tabs')

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message)
        }
    }
    finally {
        // execute regardless of the outcome
        WebBrowser.dismissBrowser()
    }
}
