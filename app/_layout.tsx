import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};


export default function RootLayoutNav() {
  const Navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <Stack>


        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }} />


        <Stack.Screen
          name='(modal)/filter'
          options={{
            presentation: 'modal',
            headerTitle: 'Filter',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => { Navigation.goBack() }}>
                  <Ionicons name='close-outline' size={26} color={Colors.primary}></Ionicons>
                </TouchableOpacity>
              );
            }
          }} />

        <Stack.Screen
          name='(modal)/locationSearch'
          options={{
            presentation: 'fullScreenModal',
            headerTitle: 'Select Loation',
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => { Navigation.goBack() }}>
                  <Ionicons name='close-outline' size={26} color={Colors.primary}></Ionicons>
                </TouchableOpacity>
              );
            }
          }} />





      </Stack>
    </BottomSheetModalProvider>
  );
}
