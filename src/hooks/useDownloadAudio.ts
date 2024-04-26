import {useState} from 'react';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

interface IError {
  message: string;
}

const useDownloadAudio = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<IError | null>(null);

  const loadAudio = async (
    audioUrl: string
  ): Promise<{filePath: string | undefined; error: IError | null}> => {
    const audioFileName = audioUrl.match(/[^/]+$/)?.[0];
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${audioFileName}`;

    setIsDownloading(true);
    try {
      const response = await RNFetchBlob.config({path: localFilePath}).fetch(
        'GET',
        audioUrl,
      );

      setIsDownloading(false);
      return {filePath: response.path(), error: null};
    } catch (error: any) {
      setDownloadError({message: error.message});
      setIsDownloading(false);
      return {filePath: undefined, error: {message: error.message}};
    }
  };

  return {
    loadAudio,
    isDownloading,
    downloadError,
  };
};

export default useDownloadAudio;
