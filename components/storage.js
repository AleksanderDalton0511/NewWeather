import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
  });

async function LoadCurrentStorage(keyName) {
    let result = {"Data":[]};
    await storage
    .load({
      key: keyName,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      console.log(ret);
      result = ret;
    });
    return result;
}

async function SaveToStorage(oldResult, keyName) {

    await storage.save({
        key: keyName,
        data: {
            Data: {oldResult}
        },
        expires: null
    });
}

export { LoadCurrentStorage, SaveToStorage, storage }; 
