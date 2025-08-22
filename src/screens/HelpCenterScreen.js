import React ,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchIcon from '../assets/svg/svgicons/Others/SearchIcon';
import ProfileIcon from '../assets/svg/svgicons/MoreScreen/ProfileIcon';
import { fonts } from '../../styles/fonts';
import TopHeader2 from '../components/Headers/TopHeader2';

const helpTopics = [
  'New Registration & Login',
  'How to Change Password',
  'How to Change Email',
  'How to view Saved Properties',
  'How to View Purchase History',
];

const HelpCenterScreen = () => {
    const [faqExpanded, setFaqExpanded] = useState(true);
  return (
    <View style={{flex:1}}>
        <TopHeader2 title={"Help Center"} />
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Help Center</Text>
      <Text style={styles.subText}>
        <Text style={styles.highlight}>Welcome to the Help Center!</Text> Here, you can find answers to common questions, access helpful resources, and get assistance with any issues you may encounter. Whether you need guidance on using our platform or have specific inquiries, we’re here to help you every step of the way!
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          placeholder="Search.."
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Help Topics */}
      <Text style={styles.topicHeader}>Explore Help Topics</Text>

      {/* User Profiles Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ProfileIcon  />
          <Text style={styles.cardTitle}>User Profiles</Text>
        </View>

        {helpTopics.map((topic, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.topicLink}>{topic}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity>
          <Text style={styles.viewMore}>View More ▼</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.faqCard}>
        <TouchableOpacity
            style={styles.faqHeader}
            onPress={() => setFaqExpanded(!faqExpanded)}
        >
            <Text style={styles.faqTitle}>
            What types of properties can I find on PropertySeller?
            </Text>
            <Text style={styles.arrow}>{faqExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {faqExpanded && (
            <Text style={styles.faqDescription}>
            On PropertySeller, we offer an extensive and diverse range of properties to meet the varying needs and 
            preferences of our clients. Our listings include:
            {"\n\n"}
            <Text style={styles.faqListItem}>
                <Text style={styles.faqBold}>1. Residential Apartments:</Text> Whether you are looking for a cozy 
                studio or a spacious multi-bedroom apartment, we have options in various styles, sizes, and price ranges. 
                From modern high-rises in bustling urban areas to tranquil communities with stunning views, our residential 
                apartments cater to all lifestyles.
                {"\n\n"}
                <Text style={styles.faqBold}>2. Villas:</Text> For those seeking more space and privacy, PropertySeller
                 features an impressive selection of villas. These range from luxurious, fully-furnished properties with
                  private pools and gardens to more modest family homes. Many of our villas are located in sought-after 
                  neighborhoods, providing access to top amenities, schools, and leisure facilities.
                {"\n\n"}
                <Text style={styles.faqBold}>3. Townhouses:</Text> Townhouses offer a perfect blend of community living and 
                individual space. Our listings include beautifully designed townhouses that are ideal for families, featuring
                 multiple floors, private outdoor areas, and access to community facilities such as parks and pools. These 
                 properties are often situated in family-friendly neighborhoods with a strong sense of community.
                 {"\n\n"}
                <Text style={styles.faqBold}>4. Commercial Spaces:</Text> For investors and entrepreneurs, PropertySeller provides an array 
                of commercial properties, including office spaces, retail units, warehouses, and mixed-use developments.
                 Whether you are looking to start a new business, expand an existing one, or invest in commercial real 
                 estate, our listings feature properties in prime locations that attract high foot traffic and ensure visibility.
                 {"\n\n"}
                 <Text style={styles.faqBold}>5. Off-Plan Developments: </Text> We also specialize in off-plan properties, 
                 which allow buyers to invest in new developments before they are completed. This option often provides 
                 significant advantages, such as lower prices and the opportunity to customize certain aspects of the property. 
                 Our off-plan listings include exciting new projects from reputable developers, giving buyers a chance to secure
                  a property in some of the UAE's most promising areas.
                  {"\n\n"}
                  <Text style={styles.faqBold}>6. Luxury Properties:</Text> For those seeking the pinnacle of opulence, 
                  PropertySeller showcases an exclusive selection of luxury properties, including high-end villas and 
                  penthouses in prestigious communities. These properties often come with premium features, such as 
                  private pools, state-of-the-art amenities, and breathtaking views, catering to clients who desire a lavish lifestyle.
                  {"\n\n"}
                  <Text style={styles.faqBold}>7. Vacation Homes: </Text> If you’re looking for a holiday retreat, 
                  we feature a range of vacation homes in popular tourist destinations across the UAE. 
                  These properties are ideal for those seeking a second home or investment opportunities in the short-term rental
                   market, allowing you to enjoy the beauty of the UAE while generating income.
                   {"\n\n"}
            </Text>
            At PropertySeller, we pride ourselves on providing detailed property descriptions, high-quality images, 
            and virtual tours to help you make informed decisions. Our user-friendly platform allows you to filter properties 
            based on your specific preferences, such as price, location, and property type, ensuring you can easily find 
            the perfect space to meet your needs. Whether you're a first-time buyer, an experienced investor, or someone
             looking to rent, PropertySeller is your one-stop destination for all your property needs in the UAE.
            
            </Text>
        )}
        </View>
    </ScrollView>
    </View>
  );
};

export default HelpCenterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontFamily: fonts.PoppinsSemiBold,
    textAlign: 'center',
    marginBottom: 20,
  },
  subText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: fonts.PoppinsRegular
  },
  highlight: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsMedium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#eee",
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  topicHeader: {
    color: '#000',
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#000',
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    marginLeft: 10,
  },
  topicLink: {
    fontSize: 14,
    color: '#000',
    marginVertical: 4,
    fontFamily: fonts.PoppinsRegular,
    textDecorationLine: 'underline',
  },
  viewMore: {
    fontSize: 14,
    color: '#ff1645',
    marginTop: 10,
    fontFamily: fonts.PoppinsMedium,
  },
  faqCard: {
  backgroundColor: '#fff',
  borderRadius: 4,
  padding: 16,
  marginTop: 20,
  borderWidth: 1,
  borderColor: '#eee',
  marginBottom:40,
},
faqHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
faqTitle: {
  color: '#333',
  fontSize: 16,
  fontFamily: fonts.PoppinsMedium,
  flex: 1,
},
arrow: {
  fontSize: 18,
  color: '#ff1645',
  marginLeft: 8,
},
faqDescription: {
  marginTop: 12,
  fontSize: 14,
  color: '#444',
  lineHeight: 20,
  fontFamily: fonts.PoppinsRegular,
},
faqListItem: {
  fontSize: 14,
  color: '#444',
},
faqBold: {
  fontWeight: '600',
},
});
