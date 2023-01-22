import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'react-native';
import {api} from '../../services/api';
import {DIGIHEALTH_BASE_URL, DIGIHEALTH_TOKEN, endpoints} from './urls';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
let headers = {token: DIGIHEALTH_TOKEN};

const DigihealthOCR = () => {
  const [fileUpload, setFileUpload] = useState(undefined);
  const [uploadPath, setUploadPath] = useState('');
  const [fileResponse, setFileResponse] = useState([]);
  //   const [blobFile, setBlobFile] = useState(undefined);
  const [id, setId] = useState('');
  const getUploadUrl = async () => {
    try {
      let file_name = 'NWInvoice.pdf';
      let url =
        DIGIHEALTH_BASE_URL +
        endpoints?.getUploadUrl +
        '?file_name=' +
        file_name;
      console.log({url});
      const response = await api.get(url, {headers});
      if (response?.data?.status === 'success' && response?.data?.result) {
        setUploadPath(response?.data?.result?.upload_path);
        setFileUpload(response?.data?.result);
        ToastAndroid.show('Upload path found successfully', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(`${response?.data?.result}`, ToastAndroid.LONG);
      }
      console.log({response: response?.data});
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      console.log({getUploadUrlError: error});
    }
  };

  const selectFile = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      let file = response?.[0]?.uri;
      let result = await fetch(response?.[0]?.uri);
      let blob = await result.blob();
      setFileResponse(file);
      console.log({blob});
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const uploadFile = async () => {
    try {
      console.log({uploadFileFileResponse: fileResponse});
      if (!uploadPath || !fileResponse) {
        ToastAndroid.show('upload_path not found', ToastAndroid.LONG);
      }
      //   let formData = new FormData();
      //   formData.append('pdf', fileResponse);
      //   const response = await api.put(uploadPath, fileResponse);
      //   ToastAndroid.show(`${response?.status}`, ToastAndroid.LONG);
      //   console.log({uploadFileResponse: response?.status});

      RNFetchBlob.fetch(
        'PUT',
        uploadPath,
        {
          // dropbox upload headers
          //   Authorization: 'Bearer access-token...',
          //   'Dropbox-API-Arg': JSON.stringify({
          //     path: '/img-from-react-native.png',
          //     mode: 'add',
          //     autorename: true,
          //     mute: false,
          //   }),
          'Content-Type': 'application/octet-stream',
          // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
          // Or simply wrap the file path with RNFetchBlob.wrap().
        },
        RNFetchBlob.wrap(fileResponse),
      )
        .then(res => {
          res.blob().then(r => console.log({res: r}));
        })
        .catch(err => {
          console.log({err});
          // error handling ..
        });
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      console.log({uploadFileError: error});
    }
  };
  const addFile = async () => {
    try {
      let data = {
        src: 'MARG',
        s3_key: fileUpload?.base,
        bucket_name: fileUpload?.bucket_name,
        output_format: 'marg',
      };
      const response = await api.post(
        DIGIHEALTH_BASE_URL + endpoints?.add,
        data,
        {headers},
      );
      console.log({
        // addFileResponse: response,
        addFileResponseData: response?.data,
        addFileOutput: response?.data?.result?.output,
      });
      ToastAndroid.show(`${response?.data?.status}`, ToastAndroid.LONG);
      setId(response?.data?.result?._id);
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      console.log({addFileError: error});
    }
  };
  const findOne = async () => {
    try {
      let url = DIGIHEALTH_BASE_URL + endpoints?.findOne + '?_id=' + id;
      const response = await api.get(url, {
        headers,
      });
      ToastAndroid.show(`${response?.data?.status}`, ToastAndroid.LONG);
      console.log({
        // findOneResponse: response,
        // findOneData: response?.data,
        // findOneStatus: response?.data?.status,
        findOneOutput: response?.data?.result?.output,
        findOneOutputdata: response?.data?.result?.output?.data,
        findOneOutputdata_in_json: response?.data?.result?.output?.data_in_json,
      });
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      console.log({findOneError: error});
    }
  };

  const convertToBlob = async () => {
    console.log({selectFile: fileResponse});
    let result = await fetch(fileResponse?.[0]?.uri);
    // console.log({result});
    let blob = await result.blob();
    // setBlobFile(blob);
    // console.log({blob: blob});
    // return blob;
  };
  useEffect(() => {
    console.log({fileResponse});
  }, [fileResponse]);

  return (
    <View style={styles?.main}>
      <View style={styles?.titleContainer}>
        <Text>DigihealthOCR</Text>
      </View>
      <View style={styles?.stepContainer}>
        <View style={styles?.buttonWrapper}>
          <Button title="Step 1" onPress={getUploadUrl} />
        </View>
        <View style={styles?.buttonWrapper}>
          <Button
            title="Select File"
            onPress={selectFile}
            disabled={!fileUpload}
          />
        </View>
        <View style={styles?.buttonWrapper}>
          <Button
            title="Step 2 : Upload File"
            onPress={uploadFile}
            disabled={!fileResponse}
          />
        </View>
        <View style={styles?.buttonWrapper}>
          <Button
            title="Step 3 : Add"
            onPress={addFile}
            disabled={!fileResponse}
          />
        </View>
        <View style={styles?.buttonWrapper}>
          <Button title="Step 4 : Find One" onPress={findOne} disabled={!id} />
        </View>
      </View>
    </View>
  );
};

export default DigihealthOCR;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#ffffff'},
  titleContainer: {paddingHorizontal: 8, paddingVertical: 8},
  stepContainer: {paddingHorizontal: 8},
  buttonWrapper: {paddingVertical: 5},
});
