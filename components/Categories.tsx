import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { categories } from '@/assets/data/home'
import { ScrollView } from 'react-native-gesture-handler'

const Categories = () => {
  return (

    <ScrollView horizontal>
      {categories.map(( category, index) => {
        return (
          <View style={styles.categoryCard} key={index}>
            <Image source={category.img} />
            
          </View>
        )
      }



      )

      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  categoryCard: {
    width: 100,
    height: 100,

  },

})

export default Categories