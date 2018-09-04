
const appendListItem = event => {
  console.log('poop')
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