import { ThemeContext } from "../context/ThemeProvider"
import { useContext } from "react"
import { NotificationContext } from "../context/NotificationProvider"
import { AuthContext } from "../context/AuthProvider"
import { SearchContext } from "../context/SearchProvider"



export const useTheme = () =>{
    return useContext(ThemeContext)
}

export const useNotification = () =>{
    return useContext(NotificationContext)
}

export const useAuth = () =>{
    return useContext(AuthContext)
}

export const useSearch = () => useContext(SearchContext);
