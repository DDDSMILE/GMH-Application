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

https://github.com/fumodayo/GMH-Application/assets/85737371/320fc827-b9d9-4e01-b7cd-3dfe591f27ea

### User

https://github.com/fumodayo/GMH-Application/assets/85737371/4db1743e-1c39-4e6f-83f5-df3d0be869fd

### Rider

https://github.com/fumodayo/GMH-Application/assets/85737371/1cb970c8-ff79-4af4-a8f6-85642bbf6d7f

### Admin

https://github.com/fumodayo/GMH-Application/assets/85737371/dbedf7bd-0eec-4322-a2a2-b369616739f8

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
