import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from React Native Paper

const YourComponent = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checked, setChecked] = useState(false); // State to track if the radio button is checked

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  const handleDayPress = (day) => {
    setSelectedDate(new Date(day.timestamp));
    setShowCalendar(false);
  };

  const isCurrentWeek = (date) => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() + 6));
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  };

  const getDisabledDates = () => {
    const disabledDates = {};
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      if (!isCurrentWeek(date)) {
        disabledDates[formatDate(date)] = { disabled: true, disableTouchEvent: true };
      }
    }
    return disabledDates;
  };

  return (
    <View style={styles.container}>
     <Text style={styles.collectiontext}>Next Collection Date</Text>
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <View style={styles.dateContainer}>
        <Icon name="calendar" size={14} color="#000" /> 
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendar}
        onRequestClose={() => setShowCalendar(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setShowCalendar(false)} />
          <View style={styles.modalContent}>
            <Calendar
              current={new Date()} // Show the current month by default
              minDate={new Date()} // Set minimum date to the current date
              hideExtraDays={true} // Only show days of the current month
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate ? formatDate(selectedDate) : '']: { selected: true, selectedColor: '#000' }, // Highlight selected date
                ...getDisabledDates(), // Disable dates outside the current week
              }}
              disableAllTouchEventsForDisabledDays={true} // Disable touch events for disabled dates
            />
          </View>
        </View>
      </Modal>
      <RadioButton.Android
          value="checked"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)} // Toggle checked state when pressed
          color="#000" // Change color as needed
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: 'center',
    padding:4,
    backgroundColor:"#fff",
    marginTop:-10
  },
  collectiontext: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
    textAlign:"center",
    paddingLeft:14
  },
  
  collectiontext1: {
    fontSize: 16,
    color: "#000",
    padding: 5,
    fontWeight: '700',
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 2,
    borderRadius: 5,
    margin:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  skipbutton: {
    backgroundColor: '#004223',
    color: '#fff',
    padding: 5,
    marginTop:10,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 10,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default YourComponent;
