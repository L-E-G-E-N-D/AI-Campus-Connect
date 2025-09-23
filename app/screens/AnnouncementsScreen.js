import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import AnnouncementCard from '../components/AnnouncementCard';

// Placeholder data that we will use for the list
const DUMMY_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Mid-Term Exams Schedule',
    content: 'The schedule for the upcoming mid-term examinations has been posted on the main notice board and circulated via email.',
    author: 'Admin Office',
  },
  {
    id: '2',
    title: 'Annual Sports Day Registrations',
    content: 'Registrations for the Annual Sports Day are now open. All students are encouraged to participate. Sign up at the sports complex before Friday.',
    author: 'Sports Committee',
  },
  {
    id: '3',
    title: 'Library Closure Notice',
    content: 'The central library will remain closed this Saturday for annual maintenance. Please plan your visits accordingly.',
    author: 'Library Dept.',
  },
];

const AnnouncementsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DUMMY_ANNOUNCEMENTS}
        renderItem={({ item }) => (
          <AnnouncementCard
            title={item.title}
            content={item.content}
            author={item.author}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // A light grey background for contrast
  },
});

export default AnnouncementsScreen;