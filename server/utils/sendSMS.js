import twilio from "twilio";

export const sendSMS = async (phone_number, subject, otp) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);
  await client.messages
    .create({
      body: `${subject} is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+84${phone_number}`,
    })
    .then((messages) => {
      console.log(`OTP send to ${phone_number}.SID: ${messages.sid}`);
    })
    .catch((error) => {
      console.error(`Failed to send OTP: ${error.message}`);
    });
};
