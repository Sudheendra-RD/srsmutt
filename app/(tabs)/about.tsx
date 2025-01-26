import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';

interface APIResponse {
  ayana: string
  gulika_kala: string
  karna: string
  masa: string
  masaniyamaka: string
  nakshatra: string
  paksha: string
  rahukala: string
  ruthu: string
  samvatsara: string
  shraddha_tithi: string
  sunrise: string
  sunset: string
  tithi: string
  today_special: string
  vasara: string
  yamaganda_kala: string
  yoga: string
}

const AboutScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const fetchData = async (date: any) => {
    const formData = new FormData();
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const reqPayload = `${year}-${month}-${day}`;
    formData.append('date', reqPayload);
    console.log('form', formData)
    try {
      const response = await fetch('http://13.233.159.139:8080/proxy', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json();
      calenderData = result
      setData(result);
      SetLoading(false);
    } catch (error) {
      console.error("error fetching data: ", error);
      SetLoading(false);
    }
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    const newDate = new Date(currentDate);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(newDate.getDate()).padStart(2, '0');
    const reqPayload = `${year}-${month}-${day}`;
    fetchData(reqPayload)
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  const [resdata, setData] = useState<APIResponse | null>(null);
  const [loading, SetLoading] = useState(true);
  const formData = new FormData();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const reqPayload = `${year}-${month}-${day}`;
  formData.append('date', reqPayload);
  let calenderData: {
    ayana: string
    gulika_kala: string
    karna: string
    masa: string
    masaniyamaka: string
    nakshatra: string
    paksha: string
    rahukala: string
    ruthu: string
    samvatsara: string
    shraddha_tithi: string
    sunrise: string
    sunset: string
    tithi: string
    today_special: string
    vasara: string
    yamaganda_kala: string
    yoga: string
  };
  useEffect(() => {
    fetchData(new Date());
  }, []);
  // Convert the HTML string to HTML content
  const panchangaArray1 = ['Ayana', 'Masa', 'Masa Niyamaka', 'Vasara', 'Yoga', 'Shradha tithi', 'Gulika Kala'];
  const panchangaArray2 = ['Ruthu', 'Paksha', 'Tithi', 'Nakshatra', 'Karna', 'Rahu Kala', 'Yamaganda Kala'];
  const valueArray1 = [resdata?.ayana, resdata?.masa, resdata?.masaniyamaka, resdata?.vasara, resdata?.yoga, resdata?.shraddha_tithi, resdata?.gulika_kala];
  const valueArray2 = [resdata?.ruthu, resdata?.paksha, resdata?.tithi, resdata?.nakshatra, resdata?.karna, resdata?.rahukala, resdata?.yamaganda_kala]
  if (loading) {
    return <View>
      <Text>
        Loading...
      </Text>
    </View>

  }
  return (
    <View style={styles.mainPage}>
      <SafeAreaView>
        <Button onPress={showDatepicker} title="Change Date" />
        <Text>{reqPayload}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
      <View style={styles.midsection}>
        <Text style={styles.midsectionSide}>
          <Ionicons style={styles.icon} name="sunny-outline" />
          {resdata?.sunrise}
        </Text>
        <Text style={styles.midsectionCenter}>{resdata?.samvatsara}</Text>
        <Text style={styles.midsectionSide}>
          <Ionicons style={styles.icon} name="partly-sunny-sharp" />
          {resdata?.sunset}
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
        <Text>Today's Special</Text>
        <Text>{resdata?.today_special}</Text>
      </View>
    </View>
  );
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
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10
  }
});


export default AboutScreen