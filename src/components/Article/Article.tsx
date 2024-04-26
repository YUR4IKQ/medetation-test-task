import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import {IArticleModified} from '../../types/article';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../../types/rootStackParamList';

interface Props {
  article: IArticleModified;
}

const Article = ({article}: Props): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleArticlePress = () => {
    navigation.navigate('ArticleDetails', {article});
  };

  const source = {
    html:
      article.description.length > 100
        ? `${article.description.replace(/\n/g, '<br>').slice(0, 100)} ...`
        : article.description.replace(/\n/g, '<br>'),
  };

  return (
    <TouchableOpacity
      style={styles.outerContainer}
      onPress={handleArticlePress}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: article.imgUrl}}
            style={styles.img}
          />
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <RenderHtml
          source={source}
          contentWidth={Dimensions.get('screen').width - 40}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Article;

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  imgContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
