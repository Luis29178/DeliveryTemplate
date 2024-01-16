import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Categories from '@/components/Categories'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import Restaurants from '@/components/Restaurants'

const PageLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Categories />
        <Text style={styles.headder}>
          Top Pickes in your neibourhood
        </Text>
        <Restaurants />
        <Text style={styles.headder}>
          Offers Near You
        </Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    top: 30,
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  headder: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    

  }
});

export default PageLayout