import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Image, Platform, View, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  const [image, setImage] = useState<any>(require('@/assets/images/user-placeholder.png'));


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const route = useRoute();
  const refresh = route.params || undefined

  useEffect(() => {
    console.log("useEffect")
    fetchStorage();
  }, [refresh])

  async function fetchStorage() {
    let _email = await getValueFor("email");
    let _password = await getValueFor("password");
    let _image = await getValueFor("image");

    setEmail(_email || '');
    setPassword(_password || '');
    setImage(_image ? JSON.parse(_image) : require('@/assets/images/user-placeholder.png'));
  }

  const logOut = () => {
    SecureStore.deleteItemAsync("email")
    SecureStore.deleteItemAsync("password")
    SecureStore.deleteItemAsync("image")

    fetchStorage()
    navigation.navigate("index", { refresh: Date.now() })
  }

  fetchStorage()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0082c0', dark: '#0082c0' }}

      headerImage={<IconSymbol
        size={310}
        color="#FFFFFF"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.headerImage}
      />}
    >

      {email ?
        <View style={styles.containerColumn}>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <ThemedText type="title">Usuario</ThemedText>
              <View style={styles.fieldContainer}>
                <ThemedText type="defaultSemiBold">Email:</ThemedText>
                <ThemedText>{email}</ThemedText>
              </View>
              <View style={styles.fieldContainer}>
                <ThemedText type="defaultSemiBold">Password:</ThemedText>
                <ThemedText>{password}</ThemedText>
              </View>
            </View>

            <Image
              style={styles.profileImage}
              source={typeof image === 'string' ? { uri: image } : image}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cerrar Sesión" onPress={logOut} />
          </View>
        </View>
        : <View style={styles.buttonContainer}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>No se encontró ningún usuario registrado</ThemedText>
          <View style={styles.buttonContainer}>
            <Button title="Volver" onPress={logOut} />
          </View>
        </View>}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerColumn: {
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'space-between',
  },
  headerImage: {
    color: '#FFF',
    bottom: -70,
    left: -35,
    position: 'absolute',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  fieldContainer: {
    marginVertical: 8,
  },
  profileImage: {
    height: 120,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginLeft: 16,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 8,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: "center",
//     gap: 8,
//   },
// });
