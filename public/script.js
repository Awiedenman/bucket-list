const listItemRequest = async() => {
  try {
    const url = '/api/v1/bucketList'
    const response = await fetch(url)
    const listItems = await response.json();
      return listItems;
  } catch(error) {
      throw Error(`Sorry, we could not retrieve yout list item from the database: ${error.status}`)
  }
}

const listItemPost = async(event) => {
  event.preventDefault()
  let title = $('.input--title').val();
  console.log('title', title);
  let description = $('.input--description').val();
  console.log('description', description);
  try {
    const url = '/api/v1/bucketList';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({title, description}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log('bod', response)
    const postInfo = await response.json()
    console.log('postInfo', postInfo);
    
      appendListItem(event, postInfo[0]);
  } catch(error) {
      throw Error(`Sorry, we could not post your list item to the database: ${error.status}`)
  }
}

const listItemDelete = async(event) => {
  const id = $(event.target).parent().attr('id');
  try {
    const url = '/api/v1/bucketList';
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        "Content-Type": "application/json"
      }      
    })
    $(event.target).parent().remove();
  } catch(error) {
      throw Error(`Sorry, we could not delete your list item to the database: ${error.status}`)
  }
}

const displayItemsOnLoad = listItems => {
  listItems.forEach(item => {
    $('.list').append(`
      <div id= ${item.id}>
        <h2>title: ${item.title} </h2>
        <p>description: ${item.description} </p>
        <button class="card--delete"> Delete </button>
      </div>
    `)
  })
}

const appendListItem = (event, postInfo) => {
  // event.preventDefault();
  // let titleData = $('.input--title');
  // let descriptionData = $('.input--description');
  $('.list').append(`
  <div id= ${item.id}>
    <h2>title: ${postInfo.title} </h2>
    <p>description: ${postInfo.description} </p>
    <button class="card--delete"> Delete </button>
  </div>
  `)
  $('.input--title').val('');
  $('.input--description').val('');
}

$('.form--button').on('click', listItemPost);
$('.list').on('click','.card--delete', listItemDelete);


const init = async() => {
  const initialListItems = await listItemRequest();
  displayItemsOnLoad(initialListItems);
}

init();