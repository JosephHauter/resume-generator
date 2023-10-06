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
const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{resumeData.name}</Text>
        <Text>{resumeData.phone}</Text>
        <Text>{resumeData.email}</Text>
        <Text>{resumeData.linkedin}</Text>
        <Text>{resumeData.github}</Text>
        <Text>{resumeData.college}</Text>
        <Text>{resumeData.city}</Text>
        <Text>{resumeData.degree}</Text>
        <Text>{resumeData.dates}</Text>
        {/* Add experience and projects as nested components */}
        {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.map((exp, index) => (
  <View key={index}>
    <Text>{exp.name ? exp.name : ''}</Text>
    <Text>{exp.date ? exp.date : ''}</Text>
    {/* Render bullet points */}
    {exp.description && typeof exp.description === 'string' && exp.description.split('\n').map((bulletPoint, i) => (
  <Text key={i}>• {bulletPoint}</Text>
))}

  </View>
))}

        {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.map((proj, index) => (
          <View key={index}>
            <Text>{proj.name}</Text>
            <Text>{proj.date}</Text> {/* Render the date */}
            {/* Render bullet points */}
            {proj.description && typeof proj.description === 'string' && proj.description.split('\n').map((bulletPoint, i) => (
  <Text key={i}>• {bulletPoint}</Text>
))}


          </View>
        )
        )
        }
      </View>
    </Page>
  </Document>
);

export default ResumePDF;