import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { restaurants } from '@/assets/data/home'
import { ScrollView } from 'react-native-gesture-handler'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'

const Restaurants = () => {
  return (

    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
      padding: 15,
    }}>
      {restaurants.map((restaurant, index) => {
        return (

          <Link href={"./details"} key={index} asChild>
            <TouchableOpacity  >
              <View style={styles.restaurantCard} >
                <Image style={styles.resImage} source={restaurant.img}/>
                <View style={styles.subInfo}>
                  <Text style={styles.resTitle}>{`${restaurant.name}`}</Text>
                  <Text style={styles.resRateing}>{`${restaurant.rating}`}</Text>
                  <Text style={styles.resRateings}>{`${restaurant.ratings}`}</Text>

                  <Text style={styles.resDistance}>{`${restaurant.distance}`}</Text>
                </View>






              </View>
            </TouchableOpacity>
          </Link>

        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  restaurantCard: {
    width: 300,
    height: 250,
    backgroundColor: "#ffffff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,

    
    borderRadius: 4,
  


  },
  resImage: {
    flex: 7,
    width: undefined,
    borderTopEndRadius:4,
    borderTopLeftRadius:4,
  },  
  
  subInfo: {
    flex: 3,
    paddin: 10,
    paddingHorizontal: 5,
  },
  resTitle: {
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },

  resRateing: {
    color: Colors.green,
    paddingVertical: 3,
    fontSize: 12,

  },
  resRateings: {
    paddingVertical: 3,
    fontSize: 12,


  },
  resDistance: {
    color: Colors.medium,
    paddingVertical: 3,
    fontSize: 10,


  },



})


export default Restaurants