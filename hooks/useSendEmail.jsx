import Mailer from "react-native-mail";
import { useCallback } from "react";

const useSendEmail = ({ subject }) => {
  const sendEmail = useCallback(
    ({ body = "", isHTML = false, attachments } = {}) => {
      return new Promise((resolve, reject) => {
        Mailer.mail(
          {
            subject,
            recipients: ["luisdavidbustosnunez@gmail.com"], // replace with your email
            body: `${body}\n\n Account Id: #123123`,
            isHTML,
            attachments,
          },
          (error, event) => {
            if (error) {
              console.log(error)
              return reject(error);
            }

            resolve(event);
          }
        );
      });
    },
    [subject]
  );

  return {
    sendEmail,
  };
};

export default useSendEmail;