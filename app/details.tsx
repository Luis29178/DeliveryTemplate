import { StyleSheet, Text, View, Image, SectionList, ListRenderItem } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant'
import { Link, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';





function details() {
    const sectionData = restaurant.food.map((item, index) => {
        return {
            title: item.category,
            data: item.meals,
            index: index,
        }
    })
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

    const renderSectionItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={"./"} asChild>
            <TouchableOpacity style={styles.sectionItem}>
                <View  style={styles.sectionItemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemInfo}>{item.info}</Text>
                <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
                
                </View>
                <Image source={item.img} style={styles.sectionItemImage}></Image>

            </TouchableOpacity>
        </Link>
    )





    return (
        <>
            <ParallaxScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                contentBackgroundColor={Colors.lightGrey}
                backgroundColor={'white'}
                parallaxHeaderHeight={250}
                style={styles.parallax}
                renderBackground={() => <Image style={styles.parallaxImg} source={restaurant.img}></Image>}
                stickyHeaderHeight={100}
                renderStickyHeader={() => <View key='sticky-header' style={styles.stickyHeader}
                >
                    <Text style={styles.stickyContent}>{`${restaurant.name}`}</Text>
                </View>}
            >
                <View style={styles.container}>


                    <Text style={styles.resName}>{`${restaurant.name}`}</Text>
                    <Text style={styles.resDescription}>{`${restaurant.delivery} · `} {restaurant.tags.map((tag, index) => {
                        return (`${tag}${index < restaurant.tags.length - 1 ? ' · ' : ''}`)
                    })}</Text>

                    <Text style={styles.resAbout}> {`${restaurant.about}`}</Text>


                    <SectionList
                        scrollEnabled={false}
                        sections={sectionData}
                        ItemSeparatorComponent={() => <View style={{ height: 1, marginHorizontal: 16, backgroundColor: Colors.grey }} />}
                        SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}

                        keyExtractor={(item, index) => `${item}${index}`}
                        renderItem={renderSectionItem}
                        renderSectionHeader={({ section: { title, index } }) => <Text style={styles.sectionTitle}>{title}</Text>}

                    ></SectionList>



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
        width: '100%',
        height: 300,


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
        backgroundColor: 'transparent',
        marginLeft: 70,
        justifyContent: 'flex-end',
    },
    stickyContent: {
        fontSize: 20,
        margin: 10,


    },
    resName: {
        fontSize: 30,
        margin: 16,


    },
    resDescription: {
        fontSize: 16,
        margin: 16,
        color: Colors.medium,



    },
    resAbout: {
        fontSize: 16,
        margin: 16,

    },
    sectionItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,

    },
    sectionTitle: {
        fontSize: 22,
        marginTop: 40,
        margin: 16,
    },
    sectionItemInfo: {
        flex: 1,
        
    },
    sectionItemImage:{
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',


    },
    itemInfo: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,


    },
    itemPrice: {
        marginTop: 4,
        fontSize: 16,

    },


});

export default details;



