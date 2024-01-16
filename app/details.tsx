import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant'
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


function details() {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => {
                return (
                    <TouchableOpacity style={styles.goBackBtn} onPress={navigation.goBack}>
                        <Ionicons name='ios-arrow-back' size={24} color={Colors.primary} />
                    </TouchableOpacity>)
            },
            headerRight: () => {
                return (
                    <View style={styles.bar} >

                        <TouchableOpacity style={styles.goBackBtn} onPress={() => console.log("To be Implemented")}>
                            <Ionicons name='share-outline' size={24} color={Colors.primary} />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.goBackBtn} onPress={() => console.log("To be Implemented")}>
                            <Ionicons name='search-outline' size={24} color={Colors.primary} />
                        </TouchableOpacity>

                    </View>

                )
            }
        })


    }, []);
    return (
        <>
            <ParallaxScrollView
                contentBackgroundColor={Colors.lightGrey}
                backgroundColor={'white'}
                parallaxHeaderHeight={250}
                style={styles.parallax}
                renderBackground={() => <Image style={styles.parallaxImg} source={restaurant.img}></Image>}
                stickyHeaderHeight={120}
                renderStickyHeader={() => <View key='sticky-header' style={styles.stickyHeader}
                >
                    <Text style={styles.stickyContent}>{`${restaurant.name}`}</Text>
                </View>}
            >
                <View style={styles.container}>


                    <Text>Details</Text>
                </View>
            </ParallaxScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    parallax: {
        flex: 1,
    },
    container: {
        backgroundColor: Colors.lightGrey,

    },
    parallaxImg: {


    },
    
    goBackBtn: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 9001,
        justifyContent: 'center',
        alignItems: 'center',


    },
    bar: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,


    },
    stickyHeader: {
        height: 100,
        backgroundColor: Colors.grey,
        marginLeft: 70,
    },
    stickyContent: {
        fontSize: 20,
        margin: 10,


    }


});

export default details;



