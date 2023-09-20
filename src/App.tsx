import React from 'react'
import { AppNavigator } from './navigators'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './redux/store'
import * as Sentry from 'sentry-expo'

Sentry.init({
    dsn: 'https://d67b5dfe88920e6a3f9d8f4b58cecd39@o4505913662046208.ingest.sentry.io/4505913677053952',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default function App() {

    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
    
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppNavigator />
            </QueryClientProvider>
        </Provider>
    )
    
}