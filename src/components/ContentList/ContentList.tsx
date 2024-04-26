import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Article from '../Article';
import {IArticleModified} from '../../types/article';
import {IAudio} from '../../types/audio';
import Audio from '../Audio';

interface Props {
  data: IArticleModified[] | IAudio[];
  onPressPlay?: (id: number) => void;
  selectedItemId?: number;
}

const ContentList = ({data, onPressPlay, selectedItemId}: Props): React.JSX.Element => {
  return (
    <FlatList
      data={data}
      renderItem={({item}: {item: IArticleModified | IAudio}) => {
        if ('media' in item) {
          return <Audio audio={item} onPressPlay={onPressPlay} selectedItemId={selectedItemId}/>;
        } else {
          return <Article article={item as IArticleModified} />;
        }
      }}
      keyExtractor={item => item.id.toString()}
      style={styles.container}
    />
  );
};

export default ContentList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
