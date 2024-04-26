import {IArticleModified} from './article';

type RootStackParamList = {
  MainTabNavigation: undefined;
  ArticleDetails: {
    article: IArticleModified;
  };
};

export default RootStackParamList;
