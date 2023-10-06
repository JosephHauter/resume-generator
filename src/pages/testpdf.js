import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const TestPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Name</Text>
        <Text>Phone</Text>
        <Text>Email</Text>
        <Text>LinkedIn</Text>
        <Text>GitHub</Text>
        <Text>College</Text>
        <Text>City</Text>
        <Text>Degree</Text>
        <Text>Dates</Text>

        {/* Add experience and projects as nested components */}
        {[{ name: 'Experience 1', date: 'Date 1', description: 'Description 1' }].map((exp, index) => (
          <View key={index}>
            <Text>{exp.name}</Text>
            <Text>{exp.date}</Text>
            {/* Render bullet points */}
            {exp.description.split('\n').map((bulletPoint, i) => (
              <Text key={i}>• {bulletPoint}</Text>
            ))}
          </View>
        ))}

        {[{ name: 'Project 1', date: 'Date 1', description: 'Description 1' }].map((proj, index) => (
          <View key={index}>
            <Text>{proj.name}</Text>
            <Text>{proj.date}</Text> {/* Render the date */}
            {/* Render bullet points */}
            {proj.description.split('\n').map((bulletPoint, i) => (
              <Text key={i}>• {bulletPoint}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TestPDF;
