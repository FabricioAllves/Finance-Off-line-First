import { View, FlatList } from "react-native";
import { Fab, Text } from "@components";
import LottieView from 'lottie-react-native';

import {styles} from './styles'
import { useListPayments } from "@domain";

export function HomeScreen() {
  const { paymentList, renderItem, contentKey, navigate } = useListPayments();

  const contentMap = {
    empty: (
      <View style={styles.emptyContainer}>
        <LottieView
          source={require('../../../assets/icons/StateEmpty.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text color="gray_100" size="s15">Nenhum pagamento encontrado.</Text>
      </View>
    ),
    list: (
      <FlatList
        data={paymentList}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 1 }}
        showsVerticalScrollIndicator={false}
      />
    ),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text fontWeight="bold" color="yellow_100" size="s24">Financeiro</Text>
      </View>
      {contentMap[contentKey]}
      <Fab onPress={() => navigate("NewPayment")} />
    </View>
  );
}

