import Rx from 'rx';
import request from 'superagent';
import renderSuggestionItem from './renderSuggestionItem';


(() => {

  const GITHUB_URL = 'https://api.github.com/users';

  // Promise for getting github users
  let githubFetchUsers = (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, res) => {
          if (err) {
            reject(err);
          }

          resolve(res.body);
        })
    });
  };

  // Remove item streams
  let removeOne = document.querySelector('#removeOne');
  let removeTwo = document.querySelector('#removeTwo');
  let removeThree = document.querySelector('#removeThree');

  let removeOneStream = Rx.Observable.fromEvent(removeOne, 'click');
  let removeTwoStream = Rx.Observable.fromEvent(removeTwo, 'click');
  let removeThreeStream = Rx.Observable.fromEvent(removeThree, 'click');

  // Refresh stream
  let refreshBtn = document.querySelector('#refresh');
  let refreshStream = Rx.Observable.fromEvent(refreshBtn, 'click')
                        .map(e => GITHUB_URL);

  // Startup stream
  let startupRequestStream = Rx.Observable.just(GITHUB_URL);

  // Github stream of user data
  let githubUsersStream = startupRequestStream.merge(refreshStream)
                            .flatMap(url => {
                              return Rx.Observable.fromPromise(
                                githubFetchUsers(url)
                              );
                            })
                            .shareReplay(1);

  // Helper function to return a random user from a users list
  let getRandomUser = (usersList) => {
    return usersList[Math.floor(Math.random() * usersList.length)];
  };

  // Helper function to create a suggestion stream
  let createSuggestionStream = (responseStream, removeItemStream) => {
    return responseStream
      .map(getRandomUser)
      .merge(removeItemStream.withLatestFrom(responseStream, (x, usersList) => {
        return getRandomUser(usersList);
      }));
  };

  // Suggestion streams
  let suggestionOneStream = createSuggestionStream(githubUsersStream, removeOneStream);
  let suggestionTwoStream = createSuggestionStream(githubUsersStream, removeTwoStream);
  let suggestionThreeStream = createSuggestionStream(githubUsersStream, removeThreeStream);

  suggestionOneStream
    .subscribe(user => {
      let domEl = document.querySelector('#suggestionOne');
      renderSuggestionItem(domEl, user, 'closeOne');
    });

  suggestionTwoStream
    .subscribe(user => {
      let domEl = document.querySelector('#suggestionTwo');
      renderSuggestionItem(domEl, user, 'closeTwo');
    });

  suggestionThreeStream
    .subscribe(user => {
      let domEl = document.querySelector('#suggestionThree');
      renderSuggestionItem(domEl, user, 'closeThree');
    });

})();
