import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const Sound = () => {
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://firebasestorage.googleapis.com/v0/b/slack-clone-bc037.appspot.com/o/open.mp3?alt=media&token=de9eb667-cd89-4f2a-991d-3d020467ae02' }
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Фоновый звук в Expo</Text>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sound;
