import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { categories } from '@/assets/data/home'
import { ScrollView } from 'react-native-gesture-handler'

const Categories = () => {
  return (

    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
      padding:15,
    }}>
      {categories.map((category, index) => {
        return (
          <View style={styles.categoryCard} key={index}>
            <Image style={styles.catImage} source={category.img} />
            <Text style= {styles.catText}>{`${category.text}`}</Text>

          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: "#ffffff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height:4,
    },
    shadowOpacity: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
   


  },
  catImage: {
    flex:1,
    borderTopEndRadius:4,
    borderTopLeftRadius:4,
  },
  catText:{
    padding: 5,
    fontWeight: 'bold',
    fontSize:12,
  },


})

export default Categories