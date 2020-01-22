class GpsStore{
  konum={};

   findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {this.konum=postition;return this.konum;},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 }
		);
	};
}

const gpsStore = new GpsStore();
export default gpsStore;
