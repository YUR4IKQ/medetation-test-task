import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useGetArticlesQuery} from '../../services/content';
import ContentList from '../../components/ContentList';
import { IArticleModified } from '../../types/article';

const TabScreenArticles = () => {
  const {data, error, isLoading} = useGetArticlesQuery();

  if (isLoading) {
    return <Text>Loading data ...</Text>;
  }

  if (error) {
    if ('status' in error) {
      return <Text>Error status: {error.status}</Text>;
    } else {
      return <Text>Error message: {error.message}</Text>;
    }
  }

  if (!data) {
    return <Text>No articles available</Text>;
  }

  const modifiedData: IArticleModified[] = [
    {
      ...data[0],
      imgUrl:
        'https://bejandaruwalla.com/cdn/shop/articles/Sun_and_Jupiter_in_different_houses@2x.jpg?v=1660635739',
    },
    {
      ...data[1],
      imgUrl: 'https://zn.ua/img/article/5337/40_main-v1678100272.jpg',
    },
    {
      ...data[2],
      imgUrl:
        'https://www.indastro.com/img/upload/1656996721Rahu-Mars-Conjunction.jpg?ver=4.14',
    },
  ];

  return (
    <View style={styles.container}>
      <ContentList data={modifiedData} />
    </View>
  );
};

export default TabScreenArticles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
