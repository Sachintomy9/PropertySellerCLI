import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';  // left top
import BellIcon from '../assets/svg/svgicons/Others/BellIcon';// right top
import PropertySellerWhite from '../assets/svg/svgimages/PropertySellerWhite';
import { useNavigation } from '@react-navigation/native';
import WhyDubai from '../assets/images/WhyDubai.png';
import HighReturn from '../assets/svg/svgicons/WhyDubai/HighReturn';
import NoTax from '../assets/svg/svgicons/WhyDubai/NoTax';
import Ownership from '../assets/svg/svgicons/WhyDubai/Ownership';
import Growth from '../assets/svg/svgicons/WhyDubai/Growth';
import BurjAlArab from '../assets/svg/svgicons/WhyDubai/BurjAlArab';
import UrbanICon from '../assets/svg/svgicons/WhyDubai/UrbanIcon';
import SecurityIcon from '../assets/svg/svgicons/WhyDubai/SecurityIcon';
import PassportIcon from '../assets/svg/svgicons/WhyDubai/PassportIcon';
import DiverseProperty from '../assets/svg/svgicons/WhyDubai/DiversePropert';
import Calender from '../assets/svg/svgicons/WhyDubai/Calender';
import CraneIcon from '../assets/svg/svgicons/WhyDubai/CraneIcon';
import ExploreIcon from '../assets/svg/svgicons/WhyDubai/ExploreIcon';
import { fonts } from '../../styles/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.35;

const WhyDubaiScreen = () => {
    const navigation=useNavigation();

  return (
    <SafeAreaProvider>
      <ScrollView>
        <ImageBackground source={WhyDubai} style={styles.imageBackground}>
          <View style={styles.safeArea}>
            {/* Top Row Icons */}


            <View style={styles.topRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    < BackIcon color="#fff"/>
                </TouchableOpacity>

                <PropertySellerWhite/>


                <TouchableOpacity >
                    <BellIcon color='#fff'/>
                </TouchableOpacity>
            </View>

            {/* Content Box */}
            <View style={styles.contentBox}>
              <Text style={styles.subTitle}>Why Dubai</Text>
              <Text style={styles.title}>Why Invest in Dubai Real Estate?</Text>
              <Text style={styles.paragraph}>
                Dubai has emerged as one of the world’s most attractive destinations
                for real estate investment. With its thriving economy, world-class
                infrastructure, and investor-friendly policies, the city offers
                unparalleled opportunities for both local and international
                investors. Here’s why you should consider investing in Dubai real
                estate
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#3CA8E224", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <HighReturn/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>High Return on Investment <Text style={{color: "#2596be"}}>(ROI)</Text> </Text>
            <Text style={styles.SubText}>Dubai offers some of the highest rental yields globally, ranging between 6% to 10% annually.
               Compared to other major cities like New York, London, or Hong Kong, Dubai provides better value for money with
                relatively affordable property prices and strong rental demand.</Text>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#345c4c"}}>Tax-Free </Text>Investment</Text>
            <Text style={styles.SubText}>One of the biggest advantages of investing in Dubai real estate is the absence of property taxes. 
              Investors enjoy tax-free rental income, capital gains, and no inheritance tax, making it a highly profitable investment 
              environment.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#345F4C24", height: 100, width:100, marginLeft:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <NoTax/>
            </View>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#986F2D24", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <Ownership/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>100% <Text style={{color: "#ac7834"}}>Foreign Ownership</Text> </Text>
            <Text style={styles.SubText}>With the introduction of freehold property laws, foreign investors can now own properties
               outright in designated areas, providing full ownership rights and long-term security.</Text>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>Growing<Text style={{color: "#3458fc"}}> Economy</Text> and<Text style={{color: "#3458fc"}}> Stability </Text></Text>
            <Text style={styles.SubText}>Dubai is renowned for its high quality of life, offering an unparalleled lifestyle that combines luxury and 
              comfort. With world-class amenities, top-tier healthcare, and prestigious educational institutions, residents enjoy a safe and 
              vibrant environment. The city’s cosmopolitan culture, coupled with a rich tapestry of dining, shopping, and entertainment options, 
              makes it a desirable place to live and work.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#304FFF24", height: 100, width:100, marginLeft:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <Growth/>
            </View>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#01BFA524", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <BurjAlArab/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>Booming <Text style={{color: "#08bca4"}}>Tourism Industry</Text> </Text>
            <Text style={styles.SubText}>Dubai is one of the world’s top tourist destinations, attracting millions of visitors annually. 
              This high influx of tourists creates a strong demand for short-term rental properties, making holiday homes and Airbnb 
              rentals highly profitable.</Text>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#6c24a0"}}>World-Class </Text>  Infrastructure</Text>
            <Text style={styles.SubText}>Dubai is known for its cutting-edge infrastructure, including modern skyscrapers, 
              efficient transportation systems, and state-of-the-art amenities. The city continuously develops new projects, 
              such as the Dubai Metro expansion, smart city initiatives, and sustainable developments, enhancing property value 
              over time.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#6A1B9A24", height: 100, width:100, marginLeft:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <UrbanICon/>
            </View>
          </View>
        </View>

        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#5D403624", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <SecurityIcon/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#645438"}}>Safe </Text>and <Text style={{color: "#645438"}}>Secure </Text> Environment </Text>
            <Text style={styles.SubText}>Dubai is ranked as one of the safest cities in the world, with low crime rates and strong 
              law enforcement. This makes it an attractive option for investors, expatriates, and families looking for a secure
               place to live and invest.</Text>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#049cec"}}>Residency Visa</Text>  for Investors</Text>
            <Text style={styles.SubText}>Real estate investors can qualify for long-term residency visas, including 3-year, 5-year,
               and 10-year Golden Visas, depending on the property investment value. This provides added security and residency 
               benefits for investors and their families.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#0091EA24", height: 100, width:100, marginLeft:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <PassportIcon/>
            </View>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#1A237E24", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <DiverseProperty/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>Diverse <Text style={{color: "#1c247c"}}>Property Options</Text></Text>
            <Text style={styles.SubText}>Dubai offers a wide range of properties to suit every investor’s needs, from luxury 
              villas and high-end apartments to affordable townhouses and commercial spaces. Whether you’re looking for
               a high-end investment or an entry-level property, Dubai has options for all budgets.</Text>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#d804f4"}}>Flexible</Text> Payment Plans</Text>
            <Text style={styles.SubText}>Real estate investors can qualify for long-term residency visas, including 3-year, 5-year, 
              and 10-year Golden Visas, depending on the property investment value. This provides added security and residency 
              benefits for investors and their families.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#D500F624", height: 100, width:100, marginLeft:30, borderRadius:6}}>
            <View style={styles.Icon}>
              <Calender/>
            </View>
          </View>
        </View>


        <View style={styles.Body}>
          <View style={{alignSelf: "center", backgroundColor: "#00685A24", height: 100, width:100, marginRight:30,borderRadius:6}}>
            <View style={styles.Icon}>
              <CraneIcon/>
            </View>
          </View>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}>Upcoming <Text style={{color: "#146c68"}}>Mega Projects </Text></Text>
            <Text style={styles.SubText}>Dubai continuously launches innovative mega projects like Dubai Creek Harbour, 
              Mohammed Bin Rashid City, and Dubai South. These developments promise high appreciation potential and new 
              investment opportunities.</Text>
          </View>
        </View>

        <View style={styles.Body}>
          <View style={styles.TextWrapper}>
            <Text style={styles.MainText}><Text style={{color: "#ffc42c"}}>Expo 2020 </Text> and Beyond</Text>
            <Text style={styles.SubText}>Explore the legacy of Expo 2020 and its lasting impact on Dubai's growth, 
              innovation, and global connectivity. Discover how this landmark event has shaped the future of our city
               and the opportunities that lie ahead.</Text>
          </View>
          <View style={{alignSelf: "center", backgroundColor: "#F9C12B24", height: 100, width:100, marginLeft:30, borderRadius:6}}>
            <View style={styles.Icon}>
              <ExploreIcon/>
            </View>
          </View>
        </View>
        
        </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  Body: {
    flexDirection: "row", 
    width: "80%", 
    padding:20, 
    marginTop:40
  },
  Icon:{
    alignSelf: "center", 
    top: 15
  },
  TextWrapper:{
    width: "80%"
  },
  MainText:{
    fontSize: 24, 
    paddingBottom: 20, 
    fontFamily: fonts.PoppinsMedium
  },
  SubText: {
    fontSize:16, 
    fontFamily: fonts.PoppinsRegular, 
    textAlign: "justify"
  },  

  imageBackground: {
    flex: 1,
    width: '100%',
    height: height,
    marginBottom:50,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  contentBox: {
    alignSelf: "center", // adjust based on image
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    top: 200,
    padding: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  subTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: fonts.PoppinsMedium
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: fonts.PoppinsSemiBold
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    fontFamily: fonts.PoppinsRegular,
    textAlign: "justify",
  },
});

export default WhyDubaiScreen;
