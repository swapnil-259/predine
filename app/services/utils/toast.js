import Toast from 'react-native-toast-message';
import { StatusCodes } from '../../constants/statusCodes';
export const handleToastCodeWise = ({ statusCode, statusMsg }) => {
    if (statusCode == StatusCodes.BAD_REQUEST || statusCode == StatusCodes.UNAUTHORIZED || statusCode == StatusCodes.FORBIDDEN) {
        return ShowToast(
            { type: "error", title: "MESSAGE!", msg: statusMsg }
        )
    }
    else if (statusCode == StatusCodes.PAGE_NOT_FOUND || statusCode == StatusCodes.INTERNAL_SERVER_ERROR || statusCode == StatusCodes.METHOD_NOT_ALLOWD)
        return ShowToast(
            { type: "error", title: "SOMETHING WENT WRONG!", msg: "Please wait a few minutes before you try again." }
        )
    else if (statusCode == StatusCodes.BAD_GATEWAY)
        return ShowToast(
            { type: "error", title: "POOR NETWORK!", msg: "There is something wrong with newtwork, try again later." }
        )
    else if (statusCode == StatusCodes.OK || statusCode == StatusCodes.CREATED || statusCode == StatusCodes.ACCEPTED)
        return ShowToast(
            { type: "success", title: "SUCCESS!", msg: statusMsg }
        )
}

const ShowToast = ({ type, title, msg }) => {
    Toast.show({
        type: type,
        text1: title,
        text2: msg,
        visibilityTime: 7000
    })

}
export default ShowToast;
