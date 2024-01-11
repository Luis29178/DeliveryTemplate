import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'
import categories from '@/assets/data/filter.json'
import { Ionicons } from '@expo/vector-icons'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface Category {
    name: string;
    count: number;
    checked: boolean;
}

const ItemBox = () => {
    return (
        <>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name='arrow-down-outline' size={20} color={Colors.medium} />
                    <Text style={{ flex: 1 }}>Sort</Text>
                    <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
                </TouchableOpacity>


                <TouchableOpacity style={styles.item}>
                    <Ionicons name='fast-food-outline' size={20} color={Colors.medium} />
                    <Text style={{ flex: 1 }}>Hygiene rating</Text>
                    <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
                </TouchableOpacity>


                <TouchableOpacity style={styles.item}>
                    <Ionicons name='pricetag-outline' size={20} color={Colors.medium} />
                    <Text style={{ flex: 1 }}>Offers</Text>
                    <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Ionicons name='nutrition-outline' size={20} color={Colors.medium} />
                    <Text style={{ flex: 1 }}>Dietary</Text>
                    <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
                </TouchableOpacity>


            </View>
            <Text style={styles.header}>Categories</Text>
        </>
    )
}

const Filter = () => {
    const navigation = useNavigation();
    const [items, setitems] = useState<Category[]>(categories);
    const [selected, setselected] = useState<Category[]>([]);
    const flexWidth = useSharedValue(0);
    const scale = useSharedValue(0);


    useEffect(() => {
        const hasSelected = selected.length > 0;
        const selectedItems = items.filter(item => item.checked);
        const newSelectedItems = selectedItems.length > 0;

        if (hasSelected !== newSelectedItems) {
            flexWidth.value = withTiming(newSelectedItems ? 150 : 0)
            scale.value = withTiming(newSelectedItems ? 1 : 0);
        }

        setselected(selectedItems);
    }, [items])


    const handelClearAll = () => {
        const updateItems = items.map((item) => {

            item.checked = false;

            return item;
        })


        setitems(updateItems);


    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: flexWidth.value,
            opacity: flexWidth.value > 0 ? 1 : 0
        }

    })
    const animatedText = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }

    })


    const renderItems: ListRenderItem<Category> = ({ item, index }) => {

        return (
            <View style={styles.category}>
                <Text style={styles.itemText}> {`${item.name}   (${item.count})`} </Text>
                <BouncyCheckbox

                    disableBuiltInState
                    isChecked={items[index].checked}
                    fillColor={Colors.primary}
                    unfillColor='#ffffff'
                    iconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2, }}
                    innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2, }}
                    onPress={() => {
                        const isChecked = items[index].checked;

                        const updatedItems = items.map((item) => {
                            if (item.name === items[index].name) {
                                item.checked = !isChecked;
                            }

                            return item;
                        });
                        setitems(updatedItems);
                    }}
                ></BouncyCheckbox>
            </View>

        )
    }


    return (
        <View style={styles.container}>

            <FlatList
                data={items}
                renderItem={renderItems}
                ListHeaderComponent={<ItemBox />}
            />
            <View style={{ height: 100 }} />

            <View style={styles.footer}>

                <View style={styles.btnContainer}>
                    <Animated.View style={[animatedStyles, styles.outlinedButton]}>
                        <TouchableOpacity onPress={() => { handelClearAll() }}>
                            <Animated.Text style={[styles.outlinedButtonText, animatedText]}>Clear All</Animated.Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.fullButton}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={styles.footerText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        padding: 24,
        backgroundColor: Colors.lightGrey,
    },
    footer: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: Colors.lightGrey,
        padding: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,

    },

    footerText: {
        color: '#ffffff',
        fontWeight: "bold",
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,

    },

    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        borderColor: Colors.grey,
        borderBottomWidth: 1,

    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    itemText: {
        color: Colors.mediumDark,
        flex: 1,
    },





    btnContainer: {
        felx: 1,
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
    },
    outlinedButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,

    },
    outlinedButton: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
        height: 50,

    },
    fullButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
        height: 50,
    },







})

export default Filter