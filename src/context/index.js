import React from 'react'
import AuthProvider from './AuthProvider'
import ThemeProvider from "./ThemeProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from './SearchProvider';


function ContextProviders({ children }) {
    return (
        <NotificationProvider>
            <SearchProvider>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
            </SearchProvider>
        </NotificationProvider>
    )
}

export default ContextProviders