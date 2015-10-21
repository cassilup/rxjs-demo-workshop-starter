const renderSuggestionItem = (domEl, user) => {
  let img = domEl.querySelector('img');
  let span = domEl.querySelector('span');
  img.src = `${user.avatar_url}`;
  span.textContent = `${user.login}`;
};


export default renderSuggestionItem;
