import { showMessage, hideMessage } from "react-native-flash-message";

const showTransactionLoader = async (transaction, options = {}) => {
  showMessage({
    message: "",
    hideMessage: true,
    autoHide: false,
    hideOnPress: false,
    withLoader: true,
  })
  try {
    await transaction();
  } catch (e) {
    console.log(e);
    showMessage({ message: options.error || "Unexpected error" });
    return ;
  }

  if (options.confirmation) {
    showMessage({
      message: options.confirmation
    })
  } else {
    hideMessage();
  }
}

export default showTransactionLoader;
