const randomString = () => {
    return Math.random().toString(36).substring(7).split('').join('.')
}
const ActionTypes = {
    INIT: `@@REDUX/INIT${randomString()}`
}
export default ActionTypes