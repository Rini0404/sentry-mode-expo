import React from 'react'
import { useUserSession } from '../../hooks/userAuthSession'
import { loadString } from '../../utils/storage'
import { renderHook } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'


jest.mock('../../utils/storage', () => ({
    loadString: jest.fn(),
}))


// Mock the navigation
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}))


describe('useUserSession', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.resetAllMocks()
    })



    it('should check for a session token in storage and then decide to pass the user to the Tabs or HomeScreen.  ', async () => {

        (loadString as jest.Mock).mockResolvedValue('sampleToken')

        const { result } = renderHook(() => useUserSession())

        // Mock the navigate method
        const navigate = jest.fn()
        ;(useNavigation as jest.Mock).mockReturnValue({ navigate })

        expect(result.current).toBe('sampleToken')

        expect(navigate).toHaveBeenCalledWith('Tabs')

    })






})