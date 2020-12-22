function logger (api) {
    return next => {
        return action => {
            console.log(api.getState())
            next(action)
            console.log(api.getState())
        }
    }
}
export default logger