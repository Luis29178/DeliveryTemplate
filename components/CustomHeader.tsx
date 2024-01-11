import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import BottomSheet from './BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'


const SearchBar = () => (

    <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons style={styles.searchIcon} name='ios-search' size={20} color={Colors.medium} />
                <TextInput style={styles.inputField} placeholderTextColor={Colors.medium} placeholder='Restaurants, Food, & More'
                />
            </View>
            <Link href={'/(modal)/filter'} asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name="options-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </Link>
        </View>
    </View>
)


const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
        bottomSheetRef.current?.present();

    }
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <BottomSheet ref={bottomSheetRef} />
            <View style={styles.container}>
                <TouchableOpacity onPress={openModal}>
                    <Image style={styles.icon} source={require('@/assets/images/bike.png')} />

                </TouchableOpacity>

                <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
                    <Text style={styles.title}>Delivery &middot; Now </Text>
                    <View style={styles.location}>
                        <Text style={styles.subTitle}> Houston, TX</Text>
                        <Ionicons name="chevron-down-outline" size={20} color={Colors.primary} />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton} onPress={() => { }} >
                    <Ionicons name='person-outline' size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {

        height: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 20,

    },
    icon: {
        width: 30,
        height: 30,


    },
    titleContainer: {
        flex: 1,

    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 9001,


    },
    title: {
        fontSize: 14,
        color: Colors.medium,

    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
    location:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        height: 60,
        backgroundColor: '#ffffff',



    },
    searchField: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        alignItems: 'center',

    },
    optionButton: {
        padding: 10,
        borderRadius: 9001,

    },
    searchSection: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',



    },
    inputField: {
        padding: 10,
        color: Colors.mediumDark

    },
    searchIcon: {
        paddingLeft: 10,
    },



})



export default CustomHeader

