import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// Static dashboard data (customize as needed)
const dashboardData = {
    data1: [
        { field: 'Male', count: 10 },
        { field: 'Female', count: 8 },
    ],
    data2: [{ count: 18 }],
    data3: [
        { field: 'With Invoice Due', count: 100 },
        { field: 'Without Invoice Due', count: 200 },
        { field: 'Total Due', count: 300 },
        { field: 'Deposit Balance', count: 400 },
    ],
    data4: [
        { testName: 'Test A', testCount: 50 },
        { testName: 'Test B', testCount: 75 },
        { testName: 'Test C', testCount: 90 },
    ],
    data5: [{ field: 'Partially Completed', count: 5 }],
    data6: [{ field: 'Fully Completed', count: 10 }],
    data7: [{ field: 'As On Date Pending', count: 15 }],
    data8: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // placeholder for chart data
};

// Map financial cards (indices mimic original ordering)
const financialCards = [
    {
        title: dashboardData.data3[2].field,
        amount: dashboardData.data3[2].count,
        icon: <MaterialCommunityIcons name="book-outline" size={24} color="#4299e1" />,
        cardBg: '#ebf8ff',
        iconBg: '#bee3f8',
    },
    {
        title: dashboardData.data3[1].field,
        amount: dashboardData.data3[1].count,
        icon: <MaterialCommunityIcons name="file-document-outline" size={24} color="#9f7aea" />,
        cardBg: '#faf5ff',
        iconBg: '#e9d8fd',
    },
    {
        title: dashboardData.data3[0].field,
        amount: dashboardData.data3[0].count,
        icon: <MaterialCommunityIcons name="currency-usd" size={24} color="#48bb78" />,
        cardBg: '#f0fff4',
        iconBg: '#c6f6d5',
    },
    {
        title: dashboardData.data3[3].field,
        amount: dashboardData.data3[3].count,
        icon: <MaterialCommunityIcons name="bank" size={24} color="#d69e2e" />,
        cardBg: '#fffaf0',
        iconBg: '#fefcbf',
    },
];

const statCards = [
    {
        title: dashboardData.data5[0].field,
        value: dashboardData.data5[0].count,
        icon: <FontAwesome name="exclamation-circle" size={20} color="#f6ad55" />,
    },
    {
        title: dashboardData.data6[0].field,
        value: dashboardData.data6[0].count,
        icon: <FontAwesome name="check-square" size={20} color="#34d399" />,
    },
    {
        title: dashboardData.data7[0].field,
        value: dashboardData.data7[0].count,
        icon: <FontAwesome name="clock-o" size={20} color="#f6ad55" />,
    },
];

// Helper functions for patient icons and background colors using FontAwesome icons
const getIcon = (name) => {
    if (name.includes('Male')) {
        return <FontAwesome name="male" size={25} color="#6182f1" />;
    }
    if (name.includes('Female')) {
        return <FontAwesome name="female" size={25} color="#ea77ae" />;
    }
    return <FontAwesome name="user" size={14} color="#6b7280" />;
};

const getBackgroundColor = (name) => {
    if (name.includes('Male')) return '#e0e7ff';
    if (name.includes('Female')) return '#f9e6ef';
    return '#e3e3e3';
};

const DashboardScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <View style={styles.todayStatusCard}>
                    <Text style={styles.todayStatusText}>Today Status</Text>
                </View>
            </View>

            {/* Financial Cards */}
            <View style={styles.financialCardsContainer}>
                {financialCards.map((card, index) => (
                    <View
                        key={index}
                        style={[styles.financialCard, { backgroundColor: card.cardBg }]}
                    >
                        <View style={styles.financialCardContent}>
                            <View>
                                <Text style={styles.financialCardTitle}>{card.title}</Text>
                                <Text style={styles.financialCardAmount}>{card.amount}</Text>
                            </View>
                            <View
                                style={[
                                    styles.financialIconContainer,
                                    { backgroundColor: card.iconBg },
                                ]}
                            >
                                {card.icon}
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Patient Registration & Stat Cards */}
            <View style={styles.section}>
                <View style={styles.patientCard}>
                    <View style={styles.patientCardHeader}>
                        <Text style={styles.patientCardTitle}>Patient Registered</Text>
                        <Text style={styles.patientCardCount}>
                            {dashboardData.data2[0].count}
                        </Text>
                    </View>
                    <View style={styles.patientDetailsRow}>
                        {dashboardData.data1.map((item, index) => (
                            <View key={index} style={styles.patientDetailItem}>
                                <View
                                    style={[
                                        styles.patientIconWrapper,
                                        { backgroundColor: getBackgroundColor(item.field) },
                                    ]}
                                >
                                    {getIcon(item.field)}
                                </View>
                                <Text style={styles.patientCount}>{item.count}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {statCards.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <Text style={styles.statCardTitle}>{stat.title}</Text>
                        <View style={styles.statCardContent}>
                            <Text style={styles.statCardValue}>{stat.value}</Text>
                            <View style={styles.statIconContainer}>
                                {stat.icon}
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Transaction Chart (Placeholder) */}
            <View style={styles.section}>
                <View style={styles.transactionCard}>
                    <View style={styles.transactionHeader}>
                        <Text style={styles.transactionTitle}>Transaction</Text>
                        <Text style={styles.transactionSubtitle}>last 10 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text>Line Chart Placeholder</Text>
                    </View>
                </View>
            </View>

            {/* Frequent Tests */}
            <View style={styles.section}>
                <View style={styles.testsCard}>
                    <Text style={styles.testsTitle}>
                        Frequent Tests{' '}
                        <Text style={styles.testsSubtitle}>(Last One Month)</Text>
                    </Text>
                    {dashboardData.data4.map((item, index) => (
                        <View key={index} style={styles.testItem}>
                            <View style={styles.testItemLeft}>
                                <View style={styles.testIconWrapper}>
                                    <MaterialCommunityIcons name="flask-outline" size={14} color="#6366f1" />
                                </View>
                                <Text style={styles.testName}>{item.testName}</Text>
                            </View>
                            <Text style={styles.testCount}>{item.testCount}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    todayStatusCard: {
        backgroundColor: 'aliceblue',
        padding: 10,
        borderRadius: 8,
    },
    todayStatusText: {
        fontWeight: 'bold',
        color: '#111827',
    },
    financialCardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    financialCard: {
        width: '48%',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    financialCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    financialCardTitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    financialCardAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    financialIconContainer: {
        padding: 8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 15,
    },
    patientCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    patientCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    patientCardTitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    patientCardCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
  
    patientDetailsRow: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'space-around', 
    },
    patientDetailItem: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap:"10px"        
    },
    patientIconWrapper: {
        padding: 8,
        borderRadius: 50,
        marginRight: 15, 
    },
    patientCount: {
        fontSize: 14,
        color: '#111827',
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    statCardTitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 5,
    },
    statCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statCardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    statIconContainer: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 50,
    },
    transactionCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    transactionSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    chartPlaceholder: {
        height: 150,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    testsCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    testsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 5,
    },
    testsSubtitle: {
        fontSize: 12,
        color: '#919191',
    },
    testItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: 5,
        borderRadius: 8,
        marginBottom: 5,
    },
    testItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    testIconWrapper: {
        backgroundColor: '#e0e7ff',
        padding: 8,
        borderRadius: 50,
        marginRight: 8,
    },
    testName: {
        fontSize: 14,
        color: '#374151',
    },
    testCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
});
