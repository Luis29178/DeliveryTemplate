import { StyleSheet, Text, View, Image, SectionList, ListRenderItem, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant'
import { Link, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';





function details() {
    const sectionData = restaurant.food.map((item, index) => {
        return {
            title: item.category,
            data: item.meals,
            index: index,
        }
    })
    const navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(0);

    const stickySegmentOpacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: stickySegmentOpacity.value

    }))
    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;


        y > 150
            ? stickySegmentOpacity.value = withTiming(1)
            : stickySegmentOpacity.value = 0

    };
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

    const selectCategory = (index: number) => {
        setActiveIndex(index);
    }

    const renderSectionItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={"./"} asChild>
            <TouchableOpacity style={styles.sectionItem}>
                <View style={styles.sectionItemInfo}>
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
                onScroll={onScroll}
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

            <Animated.View style={[styles.stickySegment, animatedStyles]}>
                <View style={styles.segmentsShadow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 16 }} >
                        {restaurant.food.map((food, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setActiveIndex(index) }} key={index} style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}>
                                    <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{`${food.category}`}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    stickySegment: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        top: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        overflow: 'hidden',

    },
    segmentsShadow: {
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            height: 4,
            width: 0,

        },
        shadowOpacity: 0.125,
        elevation: 5,
        shadowRadius: 4,


    },
    segmentButton: {
        top: -5,
        height: 30,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 90001,
        justifyContent: 'center',
        marginRight: 16,

    },
    segmentButtonActive: {
        top: -5,
        height: 30,
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 90001,
        justifyContent: 'center',
        marginRight: 16,

    },
    segmentText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,


    },
    segmentTextActive: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,


    },



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
    sectionItemImage: {
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



