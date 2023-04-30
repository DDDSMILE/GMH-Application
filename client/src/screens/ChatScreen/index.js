import { View, Text } from "react-native";
import { BackButton, HeaderPage } from "../../components/Form";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SuggestionAnswers from "../../assets/data/suggestions";

const ChatScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [messages, setMessages] = useState([]);

  const { questions, answer } = SuggestionAnswers.find(
    (item) => item.name === type
  );

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "GMH",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 3,
        text: questions,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: "GMH",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
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
