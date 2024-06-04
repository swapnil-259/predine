import Toast from 'react-native-toast-message';

export const handleToastCodeWise = ({ statusCode, statusMsg }) => {
    if (statusCode == 400 || statusCode == 401 || statusCode == 403) {
        return ShowToast(
            { type: "error", title: "MESSAGE!", msg: statusMsg }
        )
    }
    else if (statusCode == 404 || statusCode == 500 || statusCode == 405)
        return ShowToast(
            { type: "error", title: "SOMETHING WENT WRONG!", msg: "Please wait a few minutes before you try again." }
        )
    else if (statusCode == 502)
        return ShowToast(
            { type: "error", title: "POOR NETWORK!", msg: "There is something wrong with newtwork, try again later." }
        )
    else if (statusCode == 200 || statusCode == 201 || statusCode == 202)
        return ShowToast(
            { type: "success", title: "SUCCESS!", msg: statusMsg }
        )
}

const ShowToast = ({ type, title, msg }) => {
    Toast.show({
        type: type,
        text1: title,
        text2: msg,
        visibilityTime: 8000
    })

}
export default ShowToast;