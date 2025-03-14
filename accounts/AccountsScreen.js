import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, ActivityIndicator, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Transaction from './Transaction';
import Collection from './Collection';
// import { authData } from '../../utils/Common';

const API_URL = 'https://example.com/api/commondata'; // Replace with your actual API endpoint

// A helper function that mimics your CommonDataApi call using fetch
const fetchCommonData = async (headerMC, params) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headerMC, params }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Accounts = () => {
  // const loginData = JSON.parse(authData());
  const refCode = "123456"; // loginData.userId;
  const refType = "C"; // loginData.refType;

  const [activeKey, setActiveKey] = useState("");
  const [fromDate, setFromDate] = useState(dayjs().startOf('day'));
  const [toDate, setToDate] = useState(dayjs());
  const [isDisabled, setIsDisabled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [advanceAmount, setAdvanceAmount] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFromPickerModal, setShowFromPickerModal] = useState(false);
  const [showToPickerModal, setShowToPickerModal] = useState(false);

  const handleInputChange = (field, selectedDate) => {
    if (field === 'fromDate') {
      setFromDate(dayjs(selectedDate));
    } else if (field === 'toDate') {
      setToDate(dayjs(selectedDate));
    }
  };

  const handleClear = () => {
    setFromDate(dayjs().startOf('day'));
    setToDate(dayjs());
    setActiveKey("");
    setIsDisabled(false);
    setTransactions([]);
    setCollections([]);
    setAdvanceAmount(null);
  };

  const getTransactionDetails = async () => {
    setIsLoading(true);
    const paramsT = {
      fromDate: fromDate ? fromDate.format("YYYY-MM-DD HH:mm:ss") : null,
      toDate: toDate ? toDate.format("YYYY-MM-DD HH:mm:ss") : null,
      refType,
      refCode,
    };

    const transactionMC = {
      Mode: "V",
      Command: "OL243ENRJ9",
    };

    try {
      const res = await fetchCommonData(transactionMC, paramsT);
      const fetchData = res.payload?.tableData;
      const validData = Array.isArray(fetchData?.rowData) ? fetchData.rowData : [];
      setTransactions(validData);
      const validAdvanceAmount = Array.isArray(fetchData?.data2) ? fetchData.data2 : [];
      setAdvanceAmount(validAdvanceAmount[0]);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    } finally {
      setIsLoading(false);
    }
    setIsDisabled(true);
  };

  const getCollectionDetails = async () => {
    setIsLoading(true);
    const paramsC = {
      fromDate: fromDate ? fromDate.format("YYYY-MM-DD HH:mm:ss") : null,
      toDate: toDate ? toDate.format("YYYY-MM-DD HH:mm:ss") : null,
      refType,
      refCode,
    };

    const collectionMC = {
      Mode: "V",
      Command: "OLJTVGQFYR",
    };

    try {
      const res = await fetchCommonData(collectionMC, paramsC);
      const fetchData = res.payload?.tableData;
      const validData = Array.isArray(fetchData?.rowData) ? fetchData.rowData : [];
      setCollections(validData);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    } finally {
      setIsLoading(false);
    }
    setIsDisabled(true);
  };

  const handleToggleChange = (key) => {
    setActiveKey(key);
    if (key === '1') {
      getTransactionDetails();
    } else if (key === '2') {
      getCollectionDetails();
    }
  };

  const AddTitle =
    activeKey === "1" && transactions.length > 0
      ? "- Transaction"
      : activeKey === "2" && collections.length > 0
      ? "- Collection"
      : "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Accounts Details {AddTitle}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              disabled={isDisabled}
              onPress={() => setShowFromPickerModal(true)}
            >
              <Text style={styles.dateText}>{fromDate.format("DD-MM-YYYY")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              disabled={isDisabled}
              onPress={() => setShowToPickerModal(true)}
            >
              <Text style={styles.dateText}>{toDate.format("DD-MM-YYYY")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonGroupContainer}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeKey === "1" && styles.activeButton,
                isDisabled && styles.disabledButton,
              ]}
              disabled={isDisabled}
              onPress={() => handleToggleChange("1")}
            >
              <Text style={styles.buttonText}>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeKey === "2" && styles.activeButton,
                isDisabled && styles.disabledButton,
              ]}
              disabled={isDisabled}
              onPress={() => handleToggleChange("2")}
            >
              <Text style={styles.buttonText}>Collection</Text>
            </TouchableOpacity>
          </View>
          <Button title="Clear" onPress={handleClear} />
        </View>
        {activeKey === "1" && (
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>
              Deposit Balance : {advanceAmount ? advanceAmount.advanceAmount : ''}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {activeKey === "1" && transactions.length > 0 && (
              <Transaction data={transactions} />
            )}
            {activeKey === "2" && collections.length > 0 && (
              <Collection data={collections} />
            )}
          </>
        )}
      </View>
      {/* Modal for From Date Picker */}
      <Modal
        visible={showFromPickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFromPickerModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select From Date</Text>
            <DateTimePicker
              value={fromDate.toDate()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  handleInputChange('fromDate', selectedDate);
                }
              }}
              style={styles.datePicker}
            />
            <Button title="Done" onPress={() => setShowFromPickerModal(false)} />
          </View>
        </View>
      </Modal>
      {/* Modal for To Date Picker */}
      <Modal
        visible={showToPickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowToPickerModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select To Date</Text>
            <DateTimePicker
              value={toDate.toDate()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  handleInputChange('toDate', selectedDate);
                }
              }}
              style={styles.datePicker}
            />
            <Button title="Done" onPress={() => setShowToPickerModal(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: '#ebe9e9',
    borderRadius: 6,
    padding: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dateText: {
    fontSize: 14,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#c6c5c5',
    borderRadius: 4,
    marginRight: 5,
  },
  activeButton: {
    backgroundColor: '#e0e0e0',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
  },
  balanceContainer: {
    marginTop: 10,
  },
  balanceText: {
    fontSize: 16,
    color: 'red',
  },
  contentContainer: {
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default Accounts;
