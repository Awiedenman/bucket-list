const listItemRequest = async() => {
  const url = '/api/v1/bucketList'
  const response = await fetch(url)
  const listItems = await response.json();
  return listItems;
}

const displayItemsOnLoad = listItems => {
  listItems.forEach(item => {
    $('.list').append(`
      <h2>title: ${item.title} </h2>
      <p>description: ${item.description} </p>
      <button class="card--delete"> Delete </button>
  `)
  })
}

const appendListItem = event => {
  event.preventDefault();
  let titleData = $('.input--title');
  let descriptionData = $('.input--description');
  $('.list').append(`
  <h2>title: ${titleData.val()} </h2>
  <p>description: ${descriptionData.val()} </p>
  <button class="card--delete"> Delete </button>
  `)
  titleData.val('');
  descriptionData.val('');
}

$('.form--button').on('click', appendListItem);

const init = async() => {
  const initialListItems = await listItemRequest();
  displayItemsOnLoad(initialListItems);
}

init();