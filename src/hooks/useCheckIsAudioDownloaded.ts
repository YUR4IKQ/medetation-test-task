import RNFS from 'react-native-fs';

const useCheckIsAudioDownloaded = async (audioUrl: string) => {
  const audioFileName = audioUrl.match(/[^/]+$/)?.[0];
  const localFilePath = `${RNFS.DocumentDirectoryPath}/${audioFileName}`;

  const isFileExists = await RNFS.exists(localFilePath);

  if (isFileExists) {
    return {
      isLocalUrl: true,
      url: localFilePath,
    }
  }

  return {isLocalUrl: false, url: audioUrl};
};

export default useCheckIsAudioDownloaded;
