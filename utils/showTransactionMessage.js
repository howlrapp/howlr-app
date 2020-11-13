import { showMessage, hideMessage } from "react-native-flash-message";

const showTransactionMessage = async (
  {
    message,
    error = "Unexpected error",
    confirmation,
  },
  transaction
) => {
  showMessage({
    message,
    autoHide: false,
    hideOnPress: false,
    withLoader: true,
  })
  try {
    await transaction();
  } catch (e) {
    showMessage({ message: error });
    return ;
  }

  if (confirmation) {
    showMessage({
      message: confirmation
    })
  } else {
    hideMessage();
  }
}

export default showTransactionMessage;
