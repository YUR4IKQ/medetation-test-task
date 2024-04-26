

import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../types/rootStackParamList';
import {Image} from 'react-native';
import RenderHtml from 'react-native-render-html';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetails'>;

const ArticleDetails = ({route}: Props): React.JSX.Element => {
  const {article} = route.params;
  console.log(article);

  const htmlContent = useMemo(() => {
    let transformedHtml = article.description.replace(/\n/g, '<br>').replace(/(#####\s*)(.*?)(<br>|<\/br>|$)/g, '<h3>$2</h3>').replace(/!\[\]\((.*?)\)/g, '<img src="$1" alt="Image" />');
    let transformedHtml2 = transformedHtml.replace(/!\[romb\]\((.*?)\)/g, '<img src="$1" alt="Icon" style="width:24px;height:24px;margin-right:8px;margin-bottom:4px;vertical-align:middle;float: left;"/>');

    return transformedHtml2;
  }, [article]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: article.imgUrl}} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <RenderHtml
          source={{html: htmlContent}}
          contentWidth={Dimensions.get('screen').width - 40}
        />
      </View>
    </ScrollView>
  );
};

export default ArticleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 10,
  },
});



