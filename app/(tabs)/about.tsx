import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Platform as RNPlatform } from 'react-native';

const AboutScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to show the date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function to handle the date selection
  const handleConfirm = (date: React.SetStateAction<null>) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  const [data, setData] = useState('');
  const formData = new FormData();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const reqPayload = `${year}-${month}-${day}`;
  formData.append('date', reqPayload);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/proxy', {
          method: 'POST',
          body: formData,
        })
        const result = await response.text();
        console.log('res', result)
        setData(result);
      } catch (error) {
        console.error("error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  // Use DOM methods to extract the value attribute
  // Extract data from various elements
  const moonImageSrc = doc.querySelector('.mmoonimg img')?.getAttribute('src');
  const maasaNiyamaka = doc.querySelector('.manasa')?.innerHTML.trim().replace('<h3>Maasa Niyamaka</h3>', '');
  const dateValue = doc.querySelector('input.mydate')?.getAttribute('value');
  const samsInfo = doc.querySelector('.sams')?.innerHTML.trim().split(',').map(item => item.trim());
  const thithi = doc.querySelector('.thithi')?.innerHTML.trim();
  const dysInfo = doc.querySelector('.dys')?.innerHTML.trim().split('<br>').map(item => item.trim()); // Keeping <br> tags
  const dharmashastraTitle = doc.querySelector('.mtitle h2')?.innerHTML.trim();
  const dharmashastraDetails = doc.querySelector('.mtitle')?.innerHTML.trim().replace(dharmashastraTitle!, '').replace('<h2>', '').replace('</h2>', '').trim();
  const sunrise = doc.querySelector('.suns .txt:nth-of-type(1)')?.innerHTML.trim().replace('Sunrise', '').replace('<h4></h4>', '').trim();
  const sunset = doc.querySelector('.suns .txt:nth-of-type(2)')?.innerHTML.trim().replace('Sunset', '').replace('<h4></h4>', '').trim();
  const shraadhaThithi = doc.getElementsByClassName('txt').item(2)?.innerHTML.trim().replace('<h4>Shraadha Thithi</h4>', '');
  const rahukalam = doc.getElementsByClassName('txt').item(3)?.innerHTML.trim().replace('<h4>Rahukalam</h4>', '');
  const gulikalam = doc.getElementsByClassName('txt').item(4)?.innerHTML.trim().replace('<h4>Gulikalam</h4>', '');
  const yamagandam = doc.getElementsByClassName('txt').item(5)?.innerHTML.trim().replace('<h4>Yamagandam</h4>', '');

  // Output the extracted data
  console.log('Moon Image Source:', moonImageSrc);
  console.log('Maasa Niyamaka:', maasaNiyamaka);
  console.log('Date Value:', dateValue);
  console.log('Sams Info:', samsInfo);
  console.log('Thithi:', thithi);
  console.log('Dys Info:', dysInfo);
  console.log('Dharmashastra Title:', dharmashastraTitle);
  console.log('Dharmashastra Details:', dharmashastraDetails);
  console.log('Sunrise:', sunrise);
  console.log('Sunset:', sunset);
  console.log('Shraadha Thithi:', shraadhaThithi);
  console.log('Rahukalam:', rahukalam);
  console.log('Gulikalam:', gulikalam);
  console.log('Yamagandam:', yamagandam);
  const panchangaArray1 = ['Ayana', 'Masa', 'Masa Niyamaka', 'Vasara', 'Yoga', 'Shradha tithi', 'Gulika Kala'];
  const panchangaArray2 = ['Ruthu', 'Paksha', 'Tithi', 'Nakshatra', 'Karna', 'Rahu Kala', 'Yamaganda Kala']
  const valueArray1 = [samsInfo?.[1], samsInfo?.[3], maasaNiyamaka, dysInfo?.[0], dysInfo?.[2], shraadhaThithi, gulikalam]
  const valueArray2 = [samsInfo?.[2], samsInfo?.[4], thithi, dysInfo?.[1], dysInfo?.[3], rahukalam, yamagandam]
  return (
    <View style={styles.mainPage}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        {selectedDate ? selectedDate : 'Select a Date'}
      </Text>

      {/* Button to show the date picker */}
      <TouchableOpacity onPress={showDatePicker} style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}>
        <Text style={{ color: '#fff' }}>Pick a Date</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate || new Date()}
        onCancel={hideDatePicker}
      />
    </View>
      <View style={styles.midsection}>
        <Text style={styles.midsectionSide}>
          <Ionicons style={styles.icon} name='sunny-outline' />
          {sunrise}
        </Text>
        <Text style={styles.midsectionCenter}>
          {samsInfo?.[0]}
        </Text>
        <Text style={styles.midsectionSide}>
          <Ionicons style={styles.icon} name='partly-sunny-sharp' />
          {sunset}
        </Text>
      </View>
      <View style={styles.container}>
        {/* First column for panchangaArray1 */}
        <View style={styles.column}>
          {Array.from(panchangaArray1).map((el, _index) => (
            <View style={styles.row} key={`row1-${_index}`}>
              <View style={styles.cell}>
                <Text>{el}</Text>
                <Text>{valueArray1[_index]}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Second column for panchangaArray2 */}
        <View style={styles.column}>
          {Array.from(panchangaArray2).map((el, _index) => (
            <View style={styles.row} key={`row2-${_index}`}>
              <View style={styles.cell}>
                <Text>{el}</Text>
                <Text>{valueArray2[_index]}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.lastSection}>
        <Text>
          Today's Special
        </Text>
        <Text>
          {dharmashastraDetails}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainPage: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',  // Makes the columns side by side
    justifyContent: 'space-between',  // Spacing between columns
  },
  midsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  midsectionCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  },
  midsectionSide: {
    flex: 1,
    justifyContent:'center'
  },
  icon: {
    paddingRight: 2
  },
  column: {
    flex: 1,  // Ensures each column takes up equal space
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 50
  },
  cell: {
    flex: 1,  // Each cell takes up equal width within the row
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10
  }
});


export default AboutScreen