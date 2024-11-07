import { Payment } from "@domain";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreen, NewPayment } from "@screens";

export type RootStackParamList = {
  HomeScreen: undefined,
  NewPayment: { isEdit?: boolean, data?: Payment } | undefined,
}

export type AppStackNavigatorRoutesProps = NativeStackNavigationProp<RootStackParamList>
const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }} initialRouteName="HomeScreen">
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="NewPayment" component={NewPayment} />
    </Navigator>
  )
}