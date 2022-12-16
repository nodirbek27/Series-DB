'use strict'

const elAdv  = document.querySelectorAll('.promo__adv img');
const elGenre = document.querySelector('.promo__genre');
const elBg = document.querySelector('.promo__bg');
const elSeriesList = document.querySelector('.promo__interactive-list');
const elAddForm = document.querySelector('form.add');
const elInput = elAddForm.querySelector('.adding__input');
const elCheckbox = elAddForm.querySelector("[type='checkbox']");
const elRemove = document.querySelectorAll('.delete');
const elSeriesItem = elSeriesList.querySelector('.promo__interactive-item');


const seriesDB = {
  series: [
    'Omar',
    'The Final Legacy',
    'Ertugrul',
    'Magnificent Century',
    'The Great Seljuks: Guardians ...',
  ],
};

elAddForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newSeries = elInput.value;
  const favourite = elCheckbox.checked;

  if (newSeries) {
    if(newSeries.length > 18){
      newSeries = `${newSeries.substring(0, 18)} ...`
    }
    if(favourite) {
      console.log("Sevimli serialingiz qo'shildi");
    }

    seriesDB.series.push(newSeries);
    sortArr(seriesDB.series);

    createSeriesList(seriesDB.series, elSeriesList);
  }

  event.target.reset()
});

const deleteAdv = (arr) => {
  elAdv.forEach((item) => {
    item.remove();
  });
};

const makeChanges = () => {
  elGenre.textContent = 'Comedy';

  elBg.style.backgroundImage = 'url(img/1.jpg)';
};


const sortArr = (arr) => {
  arr.sort();
};

function createSeriesList(series, parent) {
  parent.innerHTML = '';
  sortArr(series)

  series.forEach((item, idx) => {
    parent.innerHTML += `
    <li class="promo__interactive-item">
    ${idx+1} ${item}
    <div class="delete"></div>
    </li>
    `;
  });

  document.querySelectorAll('.delete').forEach((trash, idx) =>{
    trash.addEventListener('click', () =>{
      trash.parentElement.remove()
      seriesDB.series.splice(idx, 1)

      createSeriesList(series, parent);
    })
  })
}

sortArr(seriesDB.series);
deleteAdv(elAdv);
makeChanges();
createSeriesList(seriesDB.series, elSeriesList);
