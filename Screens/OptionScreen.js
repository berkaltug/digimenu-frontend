import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Linking,
  Alert,
  Modal
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import{PastOrdersModal} from "../Components/PastOrdersModal";
export default class OptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false
    };
  }
  setModal = visible => {
    this.setState({ modalVisible: visible });
  };
  setModal2 = visible => {
    this.setState({ modalVisible2: visible });
  };

  _signOutAsync = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("AuthLoading");
  };

  soon = () => {
    Alert.alert("Çok Yakında !");
  };

  goToWebPage = () => {
    Linking.openURL("http://www.digimenuqr.com/").catch(err =>
      console.error("An error occurred", err)
    );
  };

  render() {
    return (
      <LinearGradient
        colors={["rgb(226, 54, 45)", "rgb(245, 193, 153)"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView>
            {/*2 farklı fonksiyon çağırımı onPress içerisinde*/}
            <TouchableOpacity style={styles.optionbutton} onPress={()=>{this.setModal2(true)}}>
              <Text>Geçmişim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionbutton}
              onPress={this.soon}
            >
              <Text>Dil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionbutton}
              onPress={this.goToWebPage}
            >
              <Text>Yardım Merkezi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionbutton}
              onPress={this.goToWebPage}
            >
              <Text>Sorun Bildir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionbutton}
              onPress={() => {
                this.setModal(true);
              }}
            >
              <Text>Gizlilik İlkesi ve Kullanım Koşulları</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionbutton}
              onPress={this._signOutAsync}
            >
              <Text>Çıkış Yap</Text>
            </TouchableOpacity>
          </ScrollView>
          <PastOrdersModal
            modalVisible={this.state.modalVisible2}
            parentCallback={this.setModal2}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <ScrollView>
              <TouchableOpacity
                style={styles.customAwesomeButton}
                onPress={() => {
                  this.setModal(false);
                }}
              >
                <Text>Kapat</Text>
              </TouchableOpacity>
              <Text>
                <Text style={{ fontWeight: "bold" }}>
                  Madde 1 - Sözleşme Tarafları
                </Text>
                ~{"\n"}
                Kullanıcılar, kayıt aşamasında kullanıcıdan istenen kişisel
                bilgilerini girerek mobil uygulamadan Digimenu sistemine üye
                olabilirler. Digimenu’ye kayıt olan tüm kullanıcılar,
                (“Digimenu”) ile imzalamış olduğu işbu Kullanıcı Sözleşmesi
                ("Sözleşme")’ne uyacağını kabul ve taahhüt eder. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 2 – Digimenu Tarafından Verilen Hizmet
                </Text>
                ~{"\n"}
                Digimenu uygulaması, üye kullanıcılarına, internet bağlantısı
                aracılığı ile uyumlu mobil cihazlarından, sisteme kayıtlı
                işletmelerin menülerini görüntüleme, sipariş verme ve bununla
                ilişkili benzer hizmetler sunar. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 3 - Digimenu Üyelik Sistemi
                </Text>
                ~{"\n"}
                Digimenu uygulaması kullanıcıları, kendine ait oluşturulan
                kullanıcı adı, cep telefonu numarası ve şifresi ile sisteme
                kayıt olma hakkına sahiptirler. Her bir telefon numarası ile,
                yalnızca bir adet üyelik oluşturulabilir. Digimenu
                kullanıcılarının, Digimenu’yü kullanabilmek için kullanıcı adı
                ve şifreleri ile sisteme giriş yapmaları gerekmektedir. ("Üye
                Girişi") "Üye Girişi" şifresi, yalnızca ilgili kullanıcının
                bilgisi dahilindedir. “Üye Girişi” şifresi, ilgili kullanıcı
                tarafından unutulduğunda, Digimenu uygulaması üzerinden "Şifremi
                Unuttum" butonu ile yeni şifre talep edilebilir. Yeni şifre
                tanımlanıp üyenin ilgili iletişim adresine gönderilecektir.
                Digimenu, şifre kayıplarından doğacak problemlerden veya bu
                sebeple oluşabilecek zararlardan kesinlikle sorumlu değildir.
                Digimenu, kullanıcılarını Digimenu sistemine üye olan
                işletmelerin oluşturduğu promosyonlardan ve Digimenu sisteminde
                yapılan yenileme, değişim ve promosyonlardan haberdar etmek
                maksadı ile izin verildiği takdirde Digimenu uygulaması uyarı
                sistemi ile bilgilendirebilecektir. Digimenu Uygulaması,
                uygulama kullanılırken oluşacak olan tüm verilerin tüm fikri
                haklarına sahiptir. Digimenu kullanım verilerini,
                kullanıcılarının üyelik bilgilerini gizli tutarak istatistiki
                bilgiler içeren raporlar düzenleyebilir, bu raporları kendisi
                kullanabilir veya iş ortakları ve üçüncü kişiler ile
                paylaşabilir. Raporlama işlemi, Digimenu Gizlilik Politikası
                maddelerine aykırı değildir. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 4 - Digimenu Kullanıcı Sorumluluk ve Yükümlülükleri
                </Text>
                ~{"\n"}
                Digimenu kullanıcıları, Digimenu'nün kullanımı sırasında;
                Digimenu uygulamasına verdiği tüm bilgilerin doğru olduğunu,
                bilgilerin hatalı veya eksik olmasından doğacak olan tüm
                zararlardan kendisinin sorumlu olduğunu, bu gibi durumlarda
                Digimenu’nün üyeliğini sona erdirebileceğini; Digimenu Üye
                Girişi bilgileri ile yapılan tüm işlemlerden kendisinin sorumlu
                olduğunu; Digimenu uygulaması altında verilen tüm hizmetlerin
                Digimenu'ye ait olduğunu ve bu bilgi, yazılım ve hizmetleri
                çoğaltıp hiçbir yerde dağıtamayacağını; Digimenu Uygulaması ile
                verilen hizmetlere, Digimenu'nün belirlediği haller dışında
                ve/veya yetkisiz olarak erişmemeyi, Digimenu yazılımını hiçbir
                şekilde değiştirmemeyi, değiştirildiği belli olan bir Digimenu
                yazılımını kullanmamayı ve değiştirilmesi, kullanılması gibi
                durumlarda kurallara uyulmadığında Digimenu'nün uğrayabileceği
                tüm maddi ve manevi zararları karşılamayı; Kullanıcının yorum ve
                paylaşımlarının üçüncü kişiler tarafından izinsiz ve yetkisiz
                şekilde paylaşılmasından dolayı doğabilecek zararlardan
                Digimenu'nün sorumlu tutulamayacağını; Tehdit edici, ahlak dışı,
                ırkçı, Türkiye Cumhuriyeti kanunlarına, uluslararası anlaşmalara
                aykırı, politik mesajlar içeren, 3. kişilerin fikri veya sınai
                mülkiyet haklarını ihlal eder nitelikte bilgi kullanmamayı;
                Diğer Digimenu kullanıcılarını tehdit ve taciz etmemeyi;
                Digimenu üzerindeki diğer kullanıcıların bilgilerini
                kullanmayacağını, kötüye kullanım durumunda doğabilecek
                zararlardan kendisinin sorumlu olacağını, Kişi veya kurumların
                isimlerini lekeleyici, ahlaka aykırı, yakışıksız veya kanuna
                aykırı materyal ve bilgiler yayınlamayacağını, Kullanıcı
                yorumlarında reklam ya da herhangi bir ürün tanıtımı yapmamayı,
                Digimenu hizmetlerini kullanarak elde edilen her türlü kaydın
                kullanıcı rızasında olduğunu, akıllı cihazında yaratacağı zarar,
                arıza, bilgi kaybı veya diğer kayıpların sorumluluğunun
                kendisinde olduğunu, Digimenu kullanımından doğabilecek
                zararlardan dolayı Digimenu'yü sorumlu tutamayacağını;
                Digimenu'nün dilediği zaman ve sürekli olarak tüm sistemi
                izleyebileceğini; Kullanıcının kuralları yok saydığı durumlarda,
                Digimenu'nün üyeliği sonlandırma ve/veya üyeliğe müdahale etme
                hakkının olduğunu; Digimenu'nün kendi sistemini ticari amaçlı
                kullanabileceğini; Kullanıcılar tarafından kullanıldığı anlarda
                Digimenu’nün akıllı cihazlardaki çerez dosyalarına erişimi
                olabileceğini, bu çerezlerin kullanıcının ihtiyaçlarına uygun
                içeriklerin hazırlanmasında kullanılabileceğini beyan, taahhüt
                ve kabul eder. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 5 - Digimenu Yetki ve Hakları
                </Text>
                ~{"\n"}
                Digimenu, herhangi bir zamanda sistemin çalışmasını geçici bir
                süre askıya alabilir ya da tamamen durdurabilir. Digimenu,
                şüpheli işlem şüphesi bulunan kullanıcıların Kredi Kartı ile
                Ödeme Yöntemi kullanımını kısıtlayabilir yada tamamen
                durdurabilir. Digimenu, verdiği hizmetlerin zamanında, güvenilir
                ve hatasız olması için gerekli her türlü özeni gösterecektir
                fakat bunların taahhütünü vermemektedir. Digimenu, kullanıcılara
                ait tüm içerikleri belirli periyotlarda yedekleme, düzenleme ve
                silme hakkını saklı tutar. Yedekleme ve silme işlemlerinden
                dolayı Digimenu sorumlu tutulamaz. Digimenu, ürettiği ve/veya
                dışardan satın aldığı bilgi, belge, yazılım, tasarım, grafik vb.
                eserlerin mülkiyet ve mülkiyetten doğan telif haklarına
                sahiptir. Digimenu Uygulaması üzerindeki ürünlerin teşhir
                edilmesi, bu ürünlerin stokta bulunduğu anlamına gelmez. Stokta
                bulunmayan ürünler için işletme ya da Digimenu sorumlu
                tutulamaz. Digimenu sistemine kayıtlı olan ürünlerin fiyat
                görsel ve içeriğinin doğruluğu konusunda Digimenu gerekli özeni
                gösterecektir. Fakat bu ürün bilgilerinin hatalı girilmesinden
                meydana gelen zararlardan Digimenu sorumlu tutulamaz. Digimenu,
                ileride doğacak teknik zaruretler ve mevzuata uyum amacıyla
                kullanıcıların aleyhine olmamak kaydıyla işbu Sözleşme'nin
                uygulamasında değişiklikler yapabilir, mevcut maddelerini
                değiştirebilir veya yeni maddeler ilave edebilir. Digimenu, üye
                işletmelerin sağladığı içeriklerden sorumlu tutulamaz. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 6 - Ödeme Yöntemleri
                </Text>
                ~{"\n"}
                Digimenu sisteminde yer alan ödeme yöntemleri; ~{"\n"}
                Nakit Ödeme : Kullanıcılar, Digimenu uygulaması üzerinden
                verdikleri siparişleri, nakit para yada işletmenin sunacağı
                diğer ödeme yöntemleri ile işletme yetkilisine ödeyebilirler.
                Kredi Kartı ile Ödeme : Kullanıcılar, Digimenu uygulaması
                üzerinden verdikleri siparişleri, yine Digimenu üzerinde bulunan
                Kredi Kartı ile Öde seçeneğini seçerek, anında online ödeme
                gerçekleştirebilirler. Online Ödeme Yöntemi seçeneği
                kullanılarak yapılan ödemelerde, kartın hamili haricinde bir
                başkası tarafından hukuka aykırı şekilde kullanılması halinde
                23.02.2006 tarihli 5464 sayılı Banka Kartları ve Kredi Kartları
                Kanunu ve 10.03.2007 tarihli ve 26458 sayılı Resmi Gazete’de
                yayımlanan Banka Kartları ve Kredi Kartları Hakkında Yönetmelik
                hükümlerine göre işlem yapılır. Online Ödeme Yöntemi ile ödemesi
                yapılmış siparişlerde, sipariş karşılığı fiş/fatura Digimenu
                tarafından değil, siparişi alan işletme tarafından düzenlenir.
                Kredi Kartı ile Ödeme yöntemi ile yapılan ödemelerde kişisel
                bilgiler, kredi kartı bilgileri vb. bilgiler Digimenu
                sunucularında kayıt edilmemektedir. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Madde 7- Kanuni Hükümler
                </Text>
                ~{"\n"}
                İşbu sözleşme dışında gerçekleşen tüm kanuni değişikliklerden
                kaynaklanan işlemler, Digimenu sorumluluğu dışındadır ve aynen
                “Sözleşme”'ye yansıtılır. İşbu sözleşme Türkiye Cumhuriyeti
                kanunlarına tabidir. Sözleşme'nin ifasından doğabilecek her
                türlü uyuşmazlığın çözümünde Çanakkale Mahkeme ve İcra
                Müdürlükleri yetkilidir. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>Madde 8 – Yürürlük</Text>~
                {"\n"}
                İşbu sözleşme, taraflar arasında kullanıcının, kayıt formunu
                doldurmasından itibaren yürürlüğe girer. ~{"\n"}
                <Text style={{ fontWeight: "bold" }}>Madde 9 – Fesih</Text>~
                {"\n"}
                Taraflar, işbu “Sözleşme”'yi diledikleri zaman
                feshedebileceklerdir. Sözleşme feshi anında tarafların
                birbirlerinden olan alacak hakları etkilenmez.
              </Text>
            </ScrollView>
          </Modal>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  optionbutton: {
    textAlign: "left",
    padding: 13,
    marginLeft: 17,
    marginRight: 17,
    marginTop: 7,
    backgroundColor: "rgb(236, 236, 236)",
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "black"
  },
  customAwesomeButton: {
    margin: 4,
    padding: 4,
    backgroundColor: "rgb(237, 75, 66)",
    borderRadius: 15,
    width: 100,
    height: 30
  }
});
