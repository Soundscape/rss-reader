import {app} from '../../app.module';
import {Chance} from 'chance';

app.factory('FeedService', [function() {
  var chance = Chance();
  var generateFeed = function(id) {
    return {
      id: id,
      title: chance.sentence({ words: 3 }),
      description: chance.paragraph(),
      articles: generateArticles()
    }
  };

  var generateArticles = function() {
    var articles = [];

    for (var i = 0; i <= 5; i++)
      articles.push({
        id: i,
        title: chance.sentence({ words: 3 }),
        description: chance.paragraph()
      });

    return articles;
  };

  var feeds = [];
  for(var i = 1; i <= 10; i++)
    feeds.push(generateFeed(i));

  return {
    list: function() { return feeds; },
    get: function(id) { return feeds.filter(function(feed) { return feed.id == id; })[0]; }
  };
}]);
