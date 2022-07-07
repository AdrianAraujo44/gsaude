import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#00B954' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12.5,
        // marginLeft:-20
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      style={{ borderLeftColor: 'red' }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  warning: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        fontWeight: 'normal'
      }}
      style={{ borderLeftColor: 'orange' }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
};