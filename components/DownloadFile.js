import RNFetchBlob from 'rn-fetch-blob';
import {Platform, ToastAndroid, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

const downloadFile = async (url, fileName) => {
  const {config, fs} = RNFetchBlob;
  const downloadsPath = fs.dirs.DownloadDir;
  const fileDir = `${downloadsPath}/${fileName}`;

  try {
    if (Platform.OS === 'android') {
      // Request storage permission for Android
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }

    // Check if the file already exists
    const exists = await fs.exists(fileDir);

    if (exists) {
      // File already exists, do not download it again
      console.log('File already exists:', fileDir);
      ToastAndroid.show('File already exists!', ToastAndroid.SHORT);
      return;
    }

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        mime: 'application/octet-stream', // Adjust the mime type according to your file type
        title: fileName,
        path: fileDir,
        description: 'File downloaded by download manager.',
      },
    })
      .fetch('GET', url)
      .then(resp => {
        console.log('File downloaded to:', resp.path());
        ToastAndroid.show('Downloaded Successfully', ToastAndroid.SHORT);
        // Additional logic after successful download, e.g., open the file or show a notification
      })
      .catch(error => {
        console.log('Error downloading file:', error);
        ToastAndroid.show('Error downloading!', ToastAndroid.SHORT);
      });
  } catch (error) {
    console.log('Error requesting storage permission:', error);
    ToastAndroid.show('Error requesting permission!', ToastAndroid.SHORT);
  }
};

export default downloadFile;
