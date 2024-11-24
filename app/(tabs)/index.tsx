import { Image, StyleSheet, Platform, Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';

export default function HomeScreen() {  
    const [image, setImage] = useState<string | undefined>('https://via.placeholder.com/300');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        } else {
            //alert('No ha seleccionado ninguna imagen');
        }
    };

    const takePictureAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
          quality: 1,
          base64: true
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        } else {
          //alert('Captura de imagen cancelada');
        }
    };
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Aplicaciones Moviles UNAJ</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView>
        <Button
            title = "Cámara"
            onPress = { takePictureAsync }
        />
        
      <View style={styles.spacer} />

        <Button
            title = "Seleccionar imagen"
            onPress = { pickImageAsync }
        >            
        </Button>

          <Image
            style = {{
                alignSelf: 'stretch',
                height: 300,
                width: 300,
                marginTop: 5,
                marginBottom: 15,
                objectFit: 'contain'
            }}
            source = {{uri: image}}
        >
        </Image>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  spacer: {
      margin: 3,
      top: 0,
  }
});

