import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {useGetAudioQuery} from '../../services/content';
import ContentList from '../../components/ContentList';
import BottomSheet from '@gorhom/bottom-sheet';
import {IAudio} from '../../types/audio';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import useDownloadAudio from '../../hooks/useDownloadAudio';
import useCheckIsAudioDownloaded from '../../hooks/useCheckIsAudioDownloaded';
import IAudioFromLocalFiles from '../../types/audioFromLocalFiles';

const TabScreenAudio = () => {
  const {data, error, isLoading} = useGetAudioQuery();
  const {loadAudio, isDownloading, downloadError} = useDownloadAudio();
  const [isAudioDownloaded, setIsAudioDownloaded] =
    useState<IAudioFromLocalFiles | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '15%', '50%'], []);
  const [selectedAudio, setSelectedAudio] = useState<IAudio | undefined>(
    undefined,
  );
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean | null>(null);

  const handlePressItem = async (id: number) => {
    bottomSheetRef.current?.expand();

    if (data) {
      const audio = data.find(audio => audio.id === id);

      playerReset();
      setSelectedAudio(audio);

      if (audio && selectedAudio !== audio) {
        const audioFromLocalFiles = await useCheckIsAudioDownloaded(
          audio.media.url,
        );

        if (audioFromLocalFiles) {
          setIsAudioDownloaded(audioFromLocalFiles);
        } else {
          setIsAudioDownloaded(null);
        }
      }
    }
  };

  const handleDownloadAudio = async () => {
    if (selectedAudio) {
      const locaPath = await loadAudio(selectedAudio.media.url);

      if (!locaPath.filePath && locaPath.error) {
        Alert.alert(locaPath.error.message);
        return false;
      }

      if (locaPath.filePath) {
        setIsAudioDownloaded({
          isLocalUrl: !!locaPath.filePath,
          url: locaPath.filePath,
        });
        return;
      }
    }

    return false;
  };

  const handlePressPlayStop = () => {
    if (isAudioPlaying === null && selectedAudio) {
      loadAndPlayTrack(selectedAudio);
    }
    if (isAudioPlaying === true) {
      playerPause();
      setIsAudioPlaying(false);
    } else if (selectedAudio && !isAudioPlaying) {
      playerPlay();
      setIsAudioPlaying(true);
    }
  };

  const loadAndPlayTrack = async (track: IAudio) => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: String(track.id),
      url: track.media.url,
      title: track.name,
    });
    playerPlay();
  };

  const playerPause = async () => {
    await TrackPlayer.pause();
  };

  const playerPlay = async () => {
    await TrackPlayer.play();
  };

  const playerReset = async () => {
    setIsAudioPlaying(null);

    await TrackPlayer.reset();
  };

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      playerReset();
      setSelectedAudio(undefined);
      bottomSheetRef.current?.close();
    }
  };

  if (isLoading) {
    return <Text>Loading data ...</Text>;
  }

  if (error) {
    if ('status' in error) {
      return <Text>Error status: {error.status}</Text>;
    } else {
      return <Text>Error message: {error.message}</Text>;
    }
  }

  if (!data) {
    return <Text>No audio available</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <ContentList
          data={data}
          onPressPlay={handlePressItem}
          selectedItemId={selectedAudio?.id}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={index => handleSheetChanges(index)}
        handleIndicatorStyle={{backgroundColor: '#fff', width: 40}}
        enablePanDownToClose={false}
        backgroundStyle={{backgroundColor: '#888'}}
        index={1}
        style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetInnerContainer}>
          {selectedAudio ? (
            <>
              <View style={styles.bottomSheetPlayContainer}>
                <Text style={styles.selectedAudioName}>
                  {selectedAudio.name}
                </Text>

                {!isAudioDownloaded ||
                  (isDownloading && (
                    <ActivityIndicator
                      size={'large'}
                      color="#fff"
                      style={
                        isDownloading ? {marginRight: 0} : {marginRight: 20}
                      }
                    />
                  ))}

                {!isAudioDownloaded?.isLocalUrl && (
                  <TouchableOpacity
                    disabled={isDownloading}
                    style={{marginRight: 20}}
                    onPress={handleDownloadAudio}>
                    <FontAwesome
                      name="cloud-download"
                      size={46}
                      color={isDownloading ? '#333' : '#fff'}
                    />
                  </TouchableOpacity>
                )}

                {isAudioDownloaded?.isLocalUrl && (
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={handlePressPlayStop}>
                    {isAudioPlaying ? (
                      <MaterialIcons name="pause" color="#fff" size={46} />
                    ) : (
                      <FontAwesome name="play" color="#fff" size={46} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.selectedAudioDescription}>
                {selectedAudio.title}
              </Text>
            </>
          ) : (
            <Text style={styles.bottomSheetDefaultTitle}>
              Please pick up the audio from the list above
            </Text>
          )}
        </View>
      </BottomSheet>
    </>
  );
};

export default TabScreenAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetContainer: {
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  bottomSheetInnerContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  bottomSheetPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedAudioName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
  selectedAudioDescription: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
  bottomSheetDefaultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
