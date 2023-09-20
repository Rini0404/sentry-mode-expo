
import * as WebBrowser from 'expo-web-browser'
import { getQueryParam } from '../../utils/getQueryParam'
import { saveString } from '../../utils/storage'
import { handleOpenURL } from '../../utils/handleOpenUrl'

// Mocking WebBrowser
jest.mock('expo-web-browser', () => ({
    dismissBrowser: jest.fn(),
}))

// Mocking getQueryParam
jest.mock('../../utils/getQueryParam.ts', () => ({
    getQueryParam: jest.fn(),
}))

// Mocking saveString
jest.mock('../../utils/storage', () => ({
    saveString: jest.fn(),
}))


describe('handleOpenURL', () => {
    beforeEach(() => {
    // Reset all mocks before each test
        jest.resetAllMocks()
    })

    it('should save token and dismiss the browser when a valid URL is provided', async () => {
        (getQueryParam as jest.Mock).mockReturnValue('sampleToken');
        (saveString as jest.Mock).mockResolvedValue(true)

        await handleOpenURL({ url: 'http://example.com?userTkn=sampleToken' })

        expect(getQueryParam).toHaveBeenCalledWith('http://example.com?userTkn=sampleToken', 'userTkn')
        expect(saveString).toHaveBeenCalledWith('token', 'sampleToken')
        expect(WebBrowser.dismissBrowser).toHaveBeenCalled()
    })

    it('should handle scenarios where token is not found in the URL', async () => {
        (getQueryParam as jest.Mock).mockReturnValue(null)

        global.alert = jest.fn()

        await handleOpenURL({ url: 'http://example.com' })

        expect(global.alert).toHaveBeenCalledWith('Could not process the request, please try again.')
        expect(WebBrowser.dismissBrowser).toHaveBeenCalled()
    })

    // ... Add more test cases for other scenarios
})
