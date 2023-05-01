import { View, Text } from "react-native";
import { BackButton, HeaderPage } from "../../components/Form";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SuggestionAnswers from "../../assets/data/suggestions";

const ChatScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [messages, setMessages] = useState([]);

  const { question, answer } = SuggestionAnswers.find(
    (item) => item.name === type
  );

  useEffect(() => {
    let default_text = [];
    if (question && answer) {
      default_text = [
        {
          _id: 1,
          text: answer,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "GMH",
            avatar:
              "https://res.cloudinary.com/du93troxt/image/upload/v1682910574/chatbot_ndm7dj.png",
          },
        },
        {
          _id: 3,
          text: question,
          createdAt: new Date(),
          user: {
            _id: 4,
            name: "GMH",
            avatar:
              "https://res.cloudinary.com/du93troxt/image/upload/v1682910574/chatbot_ndm7dj.png",
          },
        },
      ];
    } else {
      default_text = [
        {
          _id: 1,
          text: "Hãy cho chúng tôi biết, hôm nay bạn muốn ăn gì?",
          createdAt: new Date(),
          quickReplies: {
            type: "radio",
            keepIt: true,
            values: [
              {
                title: "😋Vịt om bầu",
                value: "Vịt om bầu",
              },
              {
                title: "Cá bơn nướng",
                value: "Cá bơn nướng",
              },
              {
                title: "Đá bào",
                value: "Đá bào",
              },
              {
                title: "Cơm chiên chân châu",
                value: "Cơm chiên chân châu",
              },
            ],
          },
          user: {
            _id: 2,
            name: "GMH",
            avatar:
              "https://res.cloudinary.com/du93troxt/image/upload/v1682910574/chatbot_ndm7dj.png",
          },
        },
      ];
    }

    setMessages(default_text);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            {type}
          </Text>
        </View>
      </HeaderPage>
      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: "#f8f1eb",
        }}
        placeholder="Hôm nay bạn muốn ăn món gì?"
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default ChatScreen;
