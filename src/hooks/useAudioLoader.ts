import {useState} from 'react';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {IAudio} from '../types/audio';

interface IError {
  message: string;
}

const useAudioLoader = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<IError | null>(null);

  const checkAndLoadAudio = async (
    audio: IAudio,
  ): Promise<{filePath: string | undefined; error: IError | null}> => {
    const audioFileName = audio.media.url.match(/[^/]+$/)?.[0];
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${audioFileName}`;

    const isFileExists = await RNFS.exists(localFilePath);

    if (isFileExists) {
      // try {
      //   await RNFS.unlink(localFilePath);
      //   console.log('Старий файл був видалений:', localFilePath);
      // } catch (error: any) {
      //   console.error('Помилка при видаленні файла:', error);
      //   setDownloadError({message: error.message});
      //   return { filePath: undefined, error: { message: error.message }};
      // }

      console.log('File exists:', localFilePath);

      setIsDownloading(false);
      return {filePath: localFilePath, error: null};
    } else {
      console.log('HEREEEEEE');

      setIsDownloading(true);
      try {
        const response = await RNFetchBlob.config({path: localFilePath}).fetch(
          'GET',
          audio.media.url,
        );

        console.log('Файл успішно завантажено:', response.path());
        setIsDownloading(false);
        return {filePath: response.path(), error: null};
      } catch (error: any) {
        console.error('Помилка при завантаженні файла:', error);
        setDownloadError({message: error.message});
        setIsDownloading(false);
        return {filePath: undefined, error: {message: error.message}};
      }
    }
  };

  return {
    checkAndLoadAudio,
    isDownloading,
    downloadError,
  };
};

export default useAudioLoader;
