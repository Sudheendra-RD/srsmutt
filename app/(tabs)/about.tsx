import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const DayConverter = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const dayToDate = (day: any) => {
  return DayConverter[day];
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
    try {
      const response = await fetch('https://13.233.159.139:8080/proxy', {
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
    SetLoading(true);
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

  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const changeDate = (days: any) => {
    SetLoading(true);
    setDate((prevDate: any) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days); // Add or subtract days
      fetchData(newDate)
      return newDate;
    });
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

  let touchStartX = 0;
  let touchStartY = 0;

  const onTouchStart = (e: any) => {
    touchStartX = e.nativeEvent.pageX; // Initial horizontal position
    touchStartY = e.nativeEvent.pageY; // Initial vertical position
  };

  const onTouchEnd = (e: any) => {
    const touchEndX = e.nativeEvent.pageX; // Final horizontal position
    const touchEndY = e.nativeEvent.pageY; // Final vertical position

    const deltaX = touchStartX - touchEndX; // Horizontal distance
    const deltaY = touchStartY - touchEndY; // Vertical distance

    // Check if the gesture is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 20) {
        changeDate(1); // Swipe left
      } else if (deltaX < -20) {
        changeDate(-1); // Swipe right
      }
    }
  };
  // Convert the HTML string to HTML content
  const panchangaArray1 = ['Ayana', 'Masa', 'Masa Niyamaka', 'Vasara', 'Yoga', 'Shradha tithi', 'Gulika Kala'];
  const panchangaArray2 = ['Ruthu', 'Paksha', 'Tithi', 'Nakshatra', 'Karna', 'Rahu Kala', 'Yamaganda Kala'];
  const valueArray1 = [resdata?.ayana, resdata?.masa, resdata?.masaniyamaka, resdata?.vasara, resdata?.yoga, resdata?.shraddha_tithi, resdata?.gulika_kala];
  const valueArray2 = [resdata?.ruthu, resdata?.paksha, resdata?.tithi, resdata?.nakshatra, resdata?.karna, resdata?.rahukala, resdata?.yamaganda_kala]
  if (loading) {
    return <View style={styles.overlay}>
      <Text style={styles.loadingText}>
        Loading...
      </Text>
    </View>

  }
  let touchX = 0;
  return (
    <View
      style={styles.mainPage}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <SafeAreaView style={styles.dateSection}>
        {/* <TouchableOpacity onPress={showDatepicker}>
          <Text>Change Date</Text>
        </TouchableOpacity> */}
        {/* Left Arrow */}
        <View style={styles.dateNavigator}>
          {/* Left Arrow */}
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => changeDate(-1)}
          >
            <Ionicons name="chevron-back-outline" size={20} />
          </TouchableOpacity>
          {/* Current Date */}
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.date}>
              {formatDate(date)} - {dayToDate(date.getDay())}
            </Text>
          </TouchableOpacity>

          {/* Right Arrow */}
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => changeDate(1)}
          >
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.iconText}>{resdata?.sunrise}</Text>
        </Text>
        <Text style={styles.midsectionCenter}>{resdata?.samvatsara}</Text>
        <Text style={styles.midsectionSide}>
          <Ionicons style={styles.icon} name="partly-sunny-sharp" />
          <Text style={styles.iconText}>{resdata?.sunset}</Text>
        </Text>
      </View>
      <View style={styles.container}>
        {/* First column for panchangaArray1 */}
        <View style={styles.column}>
          {Array.from(panchangaArray1).map((el, _index) => (
            <View style={styles.row} key={`row1-${_index}`}>
              <View style={styles.cell}>
                <Text style={styles.sectionHeading}>{el}</Text>
                <Text style={styles.sectionText}>{valueArray1[_index]}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Second column for panchangaArray2 */}
        <View style={styles.column}>
          {Array.from(panchangaArray2).map((el, _index) => (
            <View style={styles.row} key={`row2-${_index}`}>
              <View style={styles.cell}>
                <Text style={styles.sectionHeading}>{el}</Text>
                <Text style={styles.sectionText}>{valueArray2[_index]}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.lastSection}>
        <Text style={styles.sectionHeading}>Today's Special</Text>
        <Text style={styles.sectionText}>{resdata?.today_special}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateSection: {
    backgroundColor: "#CFC5BC",
    paddingBottom: 5
  },
  mainPage: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row", // Makes the columns side by side
    justifyContent: "space-between", // Spacing between columns
  },
  midsection: {
    flexDirection: "row", // Horizontal layout
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center", // Align vertically in the middle
    justifyContent: "space-around", // Distribute space evenly between items
  },
  midsectionCenter: {
    flex: 2, // Takes more space in the middle
    textAlign: "center", // Centers text horizontally
    fontWeight: "800",
    fontSize: 18,
  },
  midsectionSide: {
    flex: 1, // Takes equal space on the sides
    textAlign: "center", // Centers text horizontally
    alignItems: "center", // Aligns content vertically
    fontSize: 16,
  },
  icon: {
    marginRight: 5, // Adjust spacing between the icon and text
  },
  iconText: {
    paddingLeft: 5,
  },
  column: {
    flex: 1, // Ensures each column takes up equal space
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    height: 60,
  },
  cell: {
    flex: 1, // Each cell takes up equal width within the row
    padding: 2,
    borderWidth: 3,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  lastSection: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingTop: 10,
  },
  date: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    paddingTop: 5,
    backgroundColor: "#CFC5BC",
    borderRadius: 5,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
  },
  dateNavigator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 7,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  arrowButton: {
    padding: 10,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensures it appears above other components
  },
  containerX: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f8",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
  },
  sectionText: {
    fontSize: 16,
  },
});


export default AboutScreen