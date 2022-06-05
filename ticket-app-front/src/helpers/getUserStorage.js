
export const getUserStorage = () => {
    
    const data = localStorage.getItem('data')
    const information = data ? JSON.parse(data) : null
    
    return information
}