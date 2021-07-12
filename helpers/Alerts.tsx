import { Alert } from 'react-native';

export default function showAlert() : void {
  Alert.alert('请填充所有选择', '', [{ text: '知道了' }])
}