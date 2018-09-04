
const appendListItem = event => {
  console.log('poop')
  event.preventDefault();
  const titleData = $('.input--title').val();
  const descriptionData = $('.input--description').val();
  $('.list').append(`
  <h2>title: ${titleData} </h2>
  <p>description: ${descriptionData} </p>
  <button class="card--delete"> Delete </button>
  `)
}

$('.form--button').on('click', appendListItem);