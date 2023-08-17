import RNFetchBlob from 'react-native-blob-util';
import {Platform, ToastAndroid, PermissionsAndroid} from 'react-native';

const downloadFile = async (url, fileName) => {
  const {dirs} = RNFetchBlob.fs;
  const downloadsPath = dirs.DownloadDir; // Use DocumentDir for scoped storage
  const fileDir = `${downloadsPath}/${fileName}`;

  try {
    if (Platform.OS === 'android') {
      // Request storage permission for Android
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }

    const response = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'pdf', // specify the file extension
      path: fileDir,
    }).fetch('GET', url);

    console.log('File downloaded to:', response.path());

    // Alert the user that the download was successful
    ToastAndroid.show('Downloaded Successfully', ToastAndroid.SHORT);

    // Additional logic after successful download, e.g., open the file or show a notification
  } catch (error) {
    console.log('Error downloading file:', error);
    // Handle the error appropriately
    ToastAndroid.show('Error downloading!', ToastAndroid.SHORT);
  }
};

export default downloadFile;
