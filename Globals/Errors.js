import { Alert } from "react-native";

export const showGpsError = error => {
  if (error.code === 1) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Henüz konum erişimine izin vermediniz.Lütfen ayarlar > uygulamalar > izinler kısmından konum erişimine izin verin. ",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else if (error.code === 2) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Konum servisine erişilemiyor.Lütfen konum servisini açın.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else if (error.code === 3) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Konum isteği zaman aşımına uğradı.Lütfen tekrar deneyiniz.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else if (error.code === 4) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Google Play Servisleri yüklü değil ya da eski bir versiyona sahip.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else if (error.code === 5) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Konum servisi modu bu istek için uygun değil.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else if (error.code === -1) {
    Alert.alert(
      "Hata Kodu: " + error.code,
      " Android sistem hatası gerçekleşti.Lütfen tekrar deneyiniz.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  } else {
    Alert.alert(
      "Uyarı",
      " Bilinmeyen bir hata gerçekleşti",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  }
};
