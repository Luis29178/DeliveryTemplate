import { View, Text, Button, StyleSheet } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export type Ref = BottomSheetModal;
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], [])
  const rederBackdrop = useCallback(
    (props: any) =>
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []);

  const { dismiss } = useBottomSheetModal();
  const [activeDelivery, setactiveDelivery] = useState(true)
  const [activePickup, setactivePickup] = useState(false)

  const handleToggleDelivery = () => {
    setactiveDelivery(true);
    setactivePickup(false);

  }
  const handleTogglepickup = () => {
    setactiveDelivery(false);
    setactivePickup(true);

  }


  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={rederBackdrop}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: 'none' }}

    >
      <View style={styles.contentContainer}>


        <View style={styles.toggle}>
          <TouchableOpacity style={activeDelivery ? styles.toggleActive : styles.toggleInactive } onPress={handleToggleDelivery}>
            <Text style={activeDelivery ? styles.textActive : styles.textInactive}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activePickup ? styles.toggleActive : styles.toggleInactive} onPress={handleTogglepickup}>
            <Text style={activePickup ? styles.textActive : styles.textInactive}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheadder}>Your Location</Text>
        <Link href={'/'} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name='location-outline' size={20} color={Colors.medium} />
              <Text style={styles.itemText}>Current Location</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </View>

          </TouchableOpacity>
        </Link>

        <Text style={styles.subheadder}>Arrival Time</Text>
        <Link href={'/'} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
              <Text style={styles.itemText}>Now</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </View>

          </TouchableOpacity>
        </Link>




        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,


  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 32,



  },
  toggleActive: {

    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 24,
    borderRadius: 32,


  },
  toggleInactive: {

    padding: 8,
    paddingHorizontal: 24,
    borderRadius: 32,


  },
  textActive: {
    color: '#ffffff',
    fontWeight: 'bold',


  },
  textInactive: {
    color: Colors.primary,
    fontWeight: 'bold',


  },


  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 6,
    margin: 16,
    alignItems: 'center',



  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',

  },
  subheadder:{
    fontSize: 16,
    fontWeight:"500",
    margin: 16,

  },
  item: { 
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,

  },
  itemText: {
    flex:1,
  }







});

export default BottomSheet