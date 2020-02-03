import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

class GpsStore {
  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        return position;
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
        forceRequestLocation: true
      }
    );
  };
}
const gpsStore = new GpsStore();
export default gpsStore;
