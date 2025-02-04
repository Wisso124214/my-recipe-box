import * as MailComposer from 'expo-mail-composer';
import { Alert, Clipboard } from 'react-native';

const Mailer = () => {
  MailComposer.composeAsync({
    recipients: ["luisdavidbustosnunez@gmail.com"],
    subject: "Unleaded Feedback",
    body: 'feedbackTemplate',
  }).catch(() =>
    Alert.alert("Unable To Send Feedback", undefined, [
      {
        text: "Copy feedback email",
        onPress: () => Clipboard.setString("luisdavidbustosnunez@gmail.com")
      },
      {
        text: "OK"
      }
    ])
  );
};

export default Mailer;