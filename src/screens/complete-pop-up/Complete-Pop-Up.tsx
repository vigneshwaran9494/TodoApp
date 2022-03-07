import React, {FC} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../../resources/colors/Colors';

interface Props {
  showAlert: boolean;
  onConfirmPressed: () => void;
  onCancelPressed: () => void;
}

const CompletePopUp: FC<Props> = ({
  showAlert,
  onConfirmPressed,
  onCancelPressed,
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title="ToDo App"
      message="Mark item as completed?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No, cancel"
      confirmText="Yes, do it"
      confirmButtonColor={Colors.primaryAccent}
      onCancelPressed={() => {
        onCancelPressed();
      }}
      onConfirmPressed={() => {
        onConfirmPressed();
      }}
    />
  );
};

export default CompletePopUp;