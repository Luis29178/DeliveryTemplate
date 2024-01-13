import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import Colors from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons'



//google API key
// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const locationSearch = () => {

    const navigation = useNavigation();
    const [location, setlocation] = useState({
        latitude: 29.897285,
        longitude: -95.694968,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,

    })
    return (
        <View style={{ flex: 1 }}>

            <GooglePlacesAutocomplete
                placeholder="Find a location"
                textInputProps={{
                    placeholderTextColor: Colors.medium,
                }}
                fetchDetails={true}
                onPress={(data, details) => {
                    const point = details?.geometry?.location

                    if (point === undefined) return;

                    setlocation({
                        ...location,
                        latitude: point.lat,
                        longitude: point.lng,
                    })

                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    language: 'en',
                }}

                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        backgroundColor: Colors.grey,
                        paddingLeft: 35,
                        borderRadius: 10,

                        placeholderTextColor: "#000000"
                    },
                    textInputContainer: {
                        backgroundColor: "#ffffff",
                        padding: 8,

                    }
                }}

                renderLeftButton={() => <View style={styles.seachIcon}>
                    <Ionicons name='search-outline' size={24} color={Colors.medium}/>
                </View>}

            />

            <MapView showsUserLocation={true} style={styles.map} region={location} ></MapView>

            <View style={styles.confirmContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.goBack();
                }}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    map: {
        flex: 1,

    },
    confirmContainer: {
        position: 'absolute',
        bottom: 20,
        width: "100%",



    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        borderRadius: 8,


    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,


    },
    seachIcon: {
        zIndex: 10,
        position: 'absolute',
        left:15,
        top: 16,

    }


})

export default locationSearch