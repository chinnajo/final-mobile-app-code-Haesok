import RNFetchBlob from 'rn-fetch-blob';

import {ToastAndroid} from 'react-native';
const downloadFile = (url, fileName) => {
  const {config, fs} = RNFetchBlob;
  const downloadsPath = fs.dirs.DownloadDir;
  const fileDir = `${downloadsPath}/${fileName}`;

  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'pdf', // specify the file extension
    path: fileDir,
  })
    .fetch('GET', url)
    .then(res => {
      // console.log('File downloaded to:', res.path());
      // Alert.alert('File downloaded successfully');
      ToastAndroid.show('Downloaded Successfully', ToastAndroid.SHORT);
      // Additional logic after successful download, e.g., open the file or show a notification
    })
    .catch(error => {
      // console.log('Error downloading file:', error);
      // Handle the error appropriately
      ToastAndroid.show('Error downloading!', ToastAndroid.SHORT);
      // Alert.alert('Error downloading');
    });
};

export default downloadFile;
