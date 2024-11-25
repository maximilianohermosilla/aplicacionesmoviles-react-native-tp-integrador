import { Image, StyleSheet, Button, View, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { ParamListBase, useRoute } from '@react-navigation/native';

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export default function HomeScreen() {
  const [key, onChangeKey] = useState('Your key here');
  const [image, setImage] = useState<string | undefined>('https://via.placeholder.com/300');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const route = useRoute();
  const refresh = route.params || undefined
  
  // Validar el email
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validación del campo email
    if (!email.trim()) {
      newErrors.email = 'El email es requerido.';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'El formato del email no es válido.';
      isValid = false;
    }

    // Validación del campo password
    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Lógica de inicio de sesión aquí
      SecureStore.setItem("email", email)
      SecureStore.setItem("password", password)
      SecureStore.setItem("image", image || "")
      console.log(email)
      console.log(password)

      setTimeout(() => {
        navigation.navigate("explore", {refresh: Date.now()})        
      }, 1000);
      //alert(`Inicio de sesión exitoso. Email: ${email}`);
      // getValueFor("email")
      // getValueFor("password")
      // getValueFor("image")
    }
  };
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
      headerBackgroundColor={{ light: '#0082c0', dark: '#0082c0' }}
      headerImage={
        <Image
          source={require('@/assets/images/unaj-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Aplicaciones Moviles UNAJ</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.container}>
        <ThemedText style={styles.title}>Registrarse</ThemedText>

        {/* Campo Email */}
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {errors.email ? <ThemedText style={styles.errorText}>{errors.email}</ThemedText> : null}

        {/* Campo Password */}
        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errors.password ? <ThemedText style={styles.errorText}>{errors.password}</ThemedText> : null}

        <ThemedView>
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

          <View style={styles.containerFluid}>
            <FontAwesome.Button name="camera" backgroundColor={"#0082c0"} onPress={takePictureAsync}>
              Cámara
            </FontAwesome.Button>
            <View style={styles.spacer} />
            <FontAwesome.Button name="image" backgroundColor={"#0082c0"} onPress={pickImageAsync}>
              Galería
            </FontAwesome.Button>
          </View>
        </ThemedView>

        <View  style={{marginBottom: 20}} />

        {/* Botón de Inicio de Sesión */}
        <Button title="Aceptar" onPress={handleLogin} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  containerFluid: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    alignSelf: 'flex-start',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  textInput: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  titleContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    marginBottom: 10,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 290,
    bottom: 10,
    left: 0,
    position: 'absolute',
    objectFit: "contain"
  },
  spacer: {
    margin: 3,
    top: 0,
  }
});

