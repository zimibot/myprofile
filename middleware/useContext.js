import { createContext, useState } from "react"
const UserContext = createContext()

const value = () => {
    const [isDashboard, setIsDashboard] = useState(false)

    let value = {
        dashboard: { isDashboard, setIsDashboard }
    }

    return value
}


export const ContextProvider = ({ children }) => {
    return <UserContext.Provider value={value()}>
        {children}
    </UserContext.Provider>
}


export default UserContext