import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Logo from "@/assets/svgs/logo";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View
} from "react-native";
import PagerView from 'react-native-pager-view';

export default function Dashboard() {
  const router = useRouter();

  const width = useMemo(() => Dimensions.get("window").width, []);
  const height = useMemo(() => Dimensions.get("window").height, []);

  const images = [
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x400/png',
  ];

  const data = [
    { id: '1', title: 'Pulsa & Data' },
    { id: '2', title: 'PLN' },
    { id: '3', title: 'Games' },
    { id: '4', title: 'Air' },
    { id: '5', title: 'Insurance' },
    { id: '6', title: 'Internet' },
    { id: '7', title: 'E-Money' },
    { id: '8', title: 'E-Commerce' },
    { id: '9', title: 'Streaming' },
    { id: '10', title: 'Tiket' },
    { id: '11', title: 'Edukasi' },
    { id: '12', title: 'Invest' },
  ];

  const styles = StyleSheet.create({
    box: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: 130,
      height: 30,
      backgroundColor: colors.grayscale[100],
      borderRadius: 50
    },
    card: {
      position: 'absolute',
      top: 0.3 * width,
      left: 25,
      right: 25,
      height: 150,
      backgroundColor: colors.white,
      zIndex: 10,
      borderRadius: 15,

       // Shadow untuk iOS
      shadowColor: '#000', // Warna shadow
      shadowOffset: { width: 0, height: 4 }, // Posisi shadow
      shadowOpacity: 0.1, // Kekuatan shadow
      shadowRadius: 8, // Jarak shadow

      // Shadow untuk Android
      elevation: 5, // Ukuran shadow di Android

      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 16, // Padding kiri-kanan
      paddingVertical: 25,
    },
    amountSide: {
      flex: 1,
      paddingRight: 16,
    },
    pager: {
      height: 140,
      marginTop: 0.2 * width,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 0.4 * height,
      height: 120,
      resizeMode: 'cover',
      borderRadius: 12,
    },
    itemContainer: {
      flex: 1,
      alignItems: 'center',
    },
    item: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      marginVertical: 5,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65, // Sesuaikan tinggi item sesuai kebutuhan
      width: 65,
      borderRadius: 50,
    },
    itemText: {
      fontSize: 16,
      color: '#333',
    },
    belowText: {
      fontFamily: 'fonts.Roboto_400Regular',
      textAlign: 'center',
      marginBottom: 25
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          height: 200,
          backgroundColor: colors.primary[600],
          justifyContent: "flex-start",
          paddingVertical: 60,
          paddingHorizontal: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Logo width={0.3 * width} />

          <View style={styles.box}>
              <Text 
                font="Nunito_800ExtraBold"
                size='regular'
                style={{
                  color: colors.primary[600]
                }}
                >
                Non Member
              </Text>
            <Entypo name="chevron-right" size={20} color={colors.primary[600]} />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary[600]}/>
            <Text 
              font="Nunito_600SemiBold"
              size='medium'
              >
              Wallet
            </Text>
          </View>

          <View 
            style={{ 
              width: 120, 
              height: 30, 
              backgroundColor: colors.grayscale[100], 
              borderRadius: 50, 
              alignItems: 'center', 
              justifyContent: 'center' 
              }}
          >
            <Text 
              font="Nunito_600SemiBold"
              size='medium'
              style={{ color: colors.primary[600] }}
              >
              1000 Poin
            </Text>
          </View>
        </View>
        
        <View style={styles.amountSide}>
          <Text size="extraLarge" font="Nunito_800ExtraBold" style={{ color: 'black' }}>Rp24,321,900</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View
            style={{
              width: 120, 
              height: 35,
              flexDirection: 'row',
              backgroundColor: colors.primary[600], 
              borderRadius: 50, 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 5,
              }}
          >
            <MaterialCommunityIcons name="wallet-plus" size={20} color={colors.white} />
            <Text 
              font="Nunito_600SemiBold"
              size='medium'
              style={{ color: colors.white }}
              >
              Deposit
            </Text>
          </View>

          <View
            style={{
              width: 120, 
              height: 35,
              flexDirection: 'row',
              backgroundColor: colors.primary[600], 
              borderRadius: 50, 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 5,
              }}
          >
            <MaterialCommunityIcons name="notebook-check-outline" size={20} color={colors.white} />
            <Text 
              font="Nunito_600SemiBold"
              size='medium'
              style={{ color: colors.white }}
              >
              Riwayat
            </Text>
          </View>
        </View>
      </View>

      <PagerView style={styles.pager} initialPage={0}>
        {images.map((uri, index) => (
          <View style={styles.page} key={index.toString()}>
            <Image source={{ uri }} style={styles.image} />
          </View>
        ))}
      </PagerView>

      <View style={{ flexDirection: 'column', width: width, height: height, paddingHorizontal: 16 }}>
        <Text 
          font="Roboto_800ExtraBold"
          size='extraLarge'
          style={{ marginBottom: 20 }}
          >
          Payment List
        </Text>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.item}></View>
              <Text style={styles.belowText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={4} // Menampilkan 4 kolom per baris
        />
      </View>
    </View>
  );
}