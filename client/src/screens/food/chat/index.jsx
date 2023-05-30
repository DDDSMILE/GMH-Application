import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { BackButton, HeaderPage } from "../../../components/form";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SuggestionAnswers from "../../../assets/data/suggestions";
import { chatgpt } from "../../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../store/order.slice";
import { OrderResumeCTA } from "../../../components/food";

const ChatScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { total, items } = useSelector((state) => state.order);

  const { dish_suggest } = SuggestionAnswers.find((item) => item.name === type);
  const valueSuggestions = dish_suggest.map((dish) => ({
    title: dish,
    value: dish,
  }));

  useEffect(() => {
    let default_text = [];
    if (dish_suggest) {
      default_text = [
        {
          _id: 1,
          text: "Hãy cho chúng tôi biết, hôm nay bạn muốn ăn gì?",
          createdAt: new Date(),
          quickReplies: {
            type: "radio",
            keepIt: true,
            values: valueSuggestions,
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
    const question = messages[0].text;
    fetchApi({ question });
  }, []);

  const fetchApi = async ({ question }) => {
    const { answer, products } = await chatgpt({ question });
    for (let product of products) {
      dispatch(addItem(product));
    }
    addNewMessage(answer);
  };

  const addNewMessage = (data) => {
    setIsLoading(false);
    const value = {
      _id: Math.random(999999999999),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "GMH",
        avatar:
          "https://res.cloudinary.com/du93troxt/image/upload/v1682910574/chatbot_ndm7dj.png",
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, value)
    );
  };

  const onQuickReply = (quickReply) => {
    const question = quickReply[0].value;
    addNewMessage(question);
    fetchApi({ question });
  };

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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <GiftedChat
          messagesContainerStyle={{
            backgroundColor: "#f8f1eb",
          }}
          placeholder="Hôm nay bạn muốn ăn món gì?"
          messages={messages}
          onSend={(messages) => onSend(messages)}
          onQuickReply={(quickReplies) => onQuickReply(quickReplies)}
          user={{
            _id: 1,
          }}
        />
        {items.length > 0 && (
          <View style={{ paddingTop: 100 }}>
            <OrderResumeCTA
              text="Sản phẩm đã thêm"
              total={total}
              navigateTo="order"
              itemsLength={items.length}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;
