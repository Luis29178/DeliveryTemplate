import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getDishById } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';

const dish = () => {


    
    const { id } = useLocalSearchParams();
    const item = getDishById(+id);
    

    const addToCart = () => {

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['bottom']}>
            <View style={styles.container}>
                <Animated.Image
                entering={FadeIn.duration(750)}
                source={item?.img} 
                style={styles.dishImg} />
                <View style={styles.content}>
                    <Animated.Text entering={FadeInUp.duration(750).delay(200)} style={styles.dishTitle}>{item?.name}</Animated.Text>
                    <Animated.Text entering={FadeInDown.duration(750).delay(750)} style={styles.dishDescription}>{item?.info}</Animated.Text>


                </View>
                <View style={styles.footer}>

                    <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
                        <Text style={styles.btnText}>Add for {`$${item?.price}`}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default dish

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dishImg: {
        height: 300,
        width: '100%',

    },
    content: {
        padding: 20,
    },
    dishTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dishDescription: {
        fontSize: 16,
        color: Colors.mediumDark,
    },

    footer: {
        backgroundColor: Colors.lightGrey,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 60,
        left: 0,
        right: 0,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            height: -5,
            width: 0,
        },
        paddingTop: 20

    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,

    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',

    },
})