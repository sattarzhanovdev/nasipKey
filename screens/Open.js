import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { API } from '../api';

function Open() {
  const [active, setActive] = React.useState(null);
  const [sound, setSound] = React.useState();
  const [sound2, setSound2] = React.useState();

  React.useEffect(() => {
    const loadSounds = async () => {
      const { sound: soundObject1 } = await Audio.Sound.createAsync(
        require('../assets/sounds/open.mp3')
      );
      setSound(soundObject1);

      const { sound: soundObject2 } = await Audio.Sound.createAsync(
        require('../assets/sounds/close.mp3')
      );
      setSound2(soundObject2);
    };

    loadSounds();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (sound2) {
        sound2.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const closeSound = async () => {
    if (sound2) {
      await sound2.playAsync();
    }
  };

  const handleOpen = () => {
    API.openClose(true)
    .then(() => {
        playSound()
        setActive(true)
        setTimeout(() => {
          API.openClose(false) 
            .then(() => {
              closeSound()
              setActive(false)
            })
        }, 15*1000)
      })
  }

  return (
    <View style={styles.View}>
      <Pressable
        style={styles.Button}
        onPress={() => {
          handleOpen()
        }}
      >
        <Text style={styles.Text}>Открыть</Text>
      </Pressable>
      <Text style={styles.OpenText}>{active ? 'Открывается' : 'Закрыто' }</Text>
    </View>
  );
}

export default Open;

const styles = StyleSheet.create({
  View: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 80,
    borderRadius: 500,
    elevation: 3,
    backgroundColor: 'green',
  },
  Text: {
    color: 'white',
    fontSize: 20
  },
  OpenText: {
    marginTop: 20,
    fontSize: 20
  },
});
