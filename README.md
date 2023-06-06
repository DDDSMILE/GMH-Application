# iMarket - Capstone Project

![design](https://github.com/fumodayo/GMH-Application/blob/master/assets/logo.png)

## App Technical Information

iMarket is developed with React Native, expo and ReactJS.

## How to use (Cách cài đặt):

### Ứng dụng gồm có 4 folder (admin, client, rider, server)

1. Cài `nodejs`, cài đặt `expo`, cài đặt `android studio` vào tạo ra 1 device ảo, cài đặt `vscode`
2. Trong mỗi folder, hãy thực thi lệnh `npm install` để cài đặt node_modules
3. Hãy chạy folder `server` trước bằng lệnh `npm run dev`
4. Để demo `user` thì vào folder `client` chạy lệnh `npm run android` (Hãy chạy sẵn `android studio` trước)
5. Để demo `shipper` thì vào folder `rider` chạy lệnh `npm run android` (Hãy chạy sẵn `android studio` trước)
6. Để demo `shipper` thì vào folder `rider` chạy lệnh `npm run android` (Hãy chạy sẵn `android studio` trước)
7. Để demo `admin` thì vào folder `admin` chạy lệnh `npm run start`

### Folder `backup` chỉ là dữ liệu `backup` từ database MongoDB

## App Demo

### SignUp

![](https://github.com/fumodayo/GMH-Application/blob/master/assets/sign-up.mov)

### User

![](https://github.com/fumodayo/GMH-Application/blob/master/assets/sign-up.mov)

### Rider

![](https://github.com/fumodayo/GMH-Application/blob/master/assets/rider.mov)

### Admin

![](https://github.com/fumodayo/GMH-Application/blob/master/assets/admin.mov)

## Config file (Để vào trong server/config/config.env)

```
PORT =

MONGO_URI = ""

OTP_EXPIRY =

TWILIO_ACCOUNT_SID = " "
TWILIO_AUTH_TOKEN = " "
TWILIO_PHONE_NUMBER = " "

JWT_COOKIE_EXPIRE =
JWT_SECRET = " "

CLOUD_NAME = " "
CLOUD_API_KEY = " "
CLOUD_API_SECRET = " "

SMTP_HOST = " "
SMTP_PORT =
SMTP_USER = " "
SMTP_PASS = " "

OPENAI_API_KEY = " "
```

### Source: https://github.com/fumodayo/GMH-Application
