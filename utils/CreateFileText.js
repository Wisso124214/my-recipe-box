import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const CreateFileText = async (path, text) => {

  let fileUri = '/storage/emulated/0/Download/my-recipe-box/' + path;
  await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
  const asset = await MediaLibrary.createAssetAsync(fileUri)
  await MediaLibrary.createAlbumAsync("Download", asset, false)
    

  /*
  const main_path = '/storage/emulated/0/MyRecipeBox/'
  
  FileSystem.writeAsStringAsync(`${main_path}${path}`, text, { encoding: FileSystem.EncodingType.UTF8 }).then((res) => {
    console.log(`File created on ${main_path}${path}`)
    console.log(`Writed: ${text}`)
  }).catch((err) => {
    console.log('Error creating file: ', err)
  })*/
}

export default CreateFileText;