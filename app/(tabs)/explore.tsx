import { StyleSheet, Image, Platform, View, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  createStaticNavigation,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return undefined;
  }
}

export default function TabTwoScreen() {
  const [email, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [image, setImage] = useState<string | undefined>('https://via.placeholder.com/300');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const route = useRoute();
  const refresh = route.params || undefined
  
  useEffect(() => {
    console.log("useEffect")
    fetchStorage();
  }, [refresh])

  async function fetchStorage() {
    let _email = await getValueFor("email")
    let _password = await getValueFor("password")
    let _image = await getValueFor("image") || 'https://via.placeholder.com/300'
    setEmail(_email)
    setPassword(_password)
    setImage(_image)
  }

  const logOut = () => {
    SecureStore.deleteItemAsync("email")
    SecureStore.deleteItemAsync("password")
    SecureStore.deleteItemAsync("image")

    fetchStorage()
    navigation.navigate("index", {refresh: Date.now()})
  }
  
  fetchStorage()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Usuario</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <Image
          style={{
            alignSelf: 'center',
            height: 200,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            objectFit: 'contain'
          }}
          source={{ uri: image }}
        >
        </Image>
        <ThemedView style={styles.container}>
          <ThemedText type="defaultSemiBold">Email:</ThemedText>
          <ThemedText style={{}}>{email}</ThemedText>
        </ThemedView>

        <View  style={{marginBottom: 10}}/>

        <ThemedView style={styles.container}>
          <ThemedText type="defaultSemiBold">Password:</ThemedText>
          <ThemedText style={{}}>{password}</ThemedText>
        </ThemedView>        
      </ThemedView>
      <View  style={{marginBottom: 20}} />

        <Button title="Cerrar Sesión" onPress={logOut} />

      {/* <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: "center",
    paddingHorizontal: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 8,
  },
});
