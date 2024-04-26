import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {IAudio} from '../../types/audio';

interface Props {
  audio: IAudio;
  onPressPlay?: (id: number) => void;
  selectedItemId: number | undefined;
}

const Audio = ({audio, onPressPlay, selectedItemId}: Props): React.JSX.Element => {

  const handleOnPress = (id: number) => {
    if (onPressPlay) {
      onPressPlay(id);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.outerContainer}
        onPress={() => {
          handleOnPress(audio.id)
        }}>
        <View
          style={[
            styles.container,
            selectedItemId === audio.id ? styles.selectedAudioStyles : null,
          ]}>
          <View style={styles.imgContainer}>
            <Image source={{uri: audio.icon}} style={styles.img} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{audio.name}</Text>
            <Text style={styles.title}>{audio.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Audio;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
  },
  imgContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAudioStyles: {
    shadowColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
