import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const FilterBottomSheet = ({ sheetRef }) => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Filter Options</Text>
        <TouchableOpacity style={styles.filterOption}>
          <Text>Ward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <Text>UHID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <Text>IP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <Text>OP</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default function PatientQuery() {
  const sheetRef = useRef(null);

  const handleOpenSheet = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenSheet} style={styles.button}>
        <Text style={styles.buttonText}>Open Filter</Text>
      </TouchableOpacity>
      <FilterBottomSheet sheetRef={sheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { backgroundColor: "green", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16 },
  contentContainer: { flex: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  filterOption: { padding: 10, width: "100%", alignItems: "center", borderBottomWidth: 1, borderColor: "#ccc" },
});
