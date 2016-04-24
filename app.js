var model = {
  current: undefined,
  cats: [
    {
      name: 'Happy',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcwlRKAlSIaCI4W5PRYVbuBQQXifF-56bFqAjh9DMe-_3Lh8_YKw',
    },
    {
      name: 'Sexy',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYh1R8qA-akJf2XqmdUOgSblc1yzR91M5D4DVu3412a-DvekYyqg',
    },
    {
      name: 'Kawai',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA5g941YFkITIM3gxl4_hfxn7K0gyTI-Irsh3dwSDO9-F--d6Q',
    },
    {
      name: 'Cute',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwPfghA9N5zPWULsPFQ-kqCWSuqgRoBczAgNLHgNcPYF-U7vFowg',
    },
    {
      name: 'Sleepy',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRw7YdrkdRXBy9Fl_tnQ3m-TjQOGgsvOaFjfDk2n_HWwqmvbPHLw',
    },
    {
      name: 'Perfect',
      num: 0,
      active: false,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6uyvAhJrzo9eUwhzUhJZyW72mWIGzASrz5t6AD4z4wWcRJbT7AQ',
    },
  ],
};

const cardView = {
  card: {
    name: document.getElementById('card-name'),
    img: document.getElementById('card-img'),
    num: document.getElementById('card-num'),
    edit: document.getElementById('card-edit'),
    form: document.getElementById('form'),
    formName: document.getElementById('form-name'),
    formUrl: document.getElementById('form-url'),
    formClick: document.getElementById('form-click'),
    submit: document.getElementById('submit'),
  },

  init() {
    const { img, edit, form, submit, formName, formUrl, formClick } = cardView.card;
    const current = controller.getCurrent();

    img.addEventListener('click', e => {
      e.preventDefault();

      controller.addClickCount();
    });

    edit.addEventListener('click', e => {
      form.style.display = form.style.display === 'block' ? 'none' : 'block';
    });

    submit.addEventListener('click', e => {
      const newValue = {
        name: formName.value,
        imgUrl: formUrl.value,
        num: formClick.value,
      }
      controller.update(newValue);
    });

    cardView.render(current);
  },

  render(target) {
    const { name, img, num, formName, formUrl, formClick } = cardView.card;

    formName.value = name.innerText = target.name;
    formUrl.value = img.src = target.imgUrl;
    formClick.value = num.innerText = target.num;
  },
};

const listView = {
  render() {
    const list = document.getElementById('list-item');
    const listFragment = document.createDocumentFragment();
    const allcats = controller.getAll();

    allcats
    .forEach(cat => {
      const item = createList(cat.name);

      item.addEventListener('click', e => {
        e.preventDefault();
        controller.setActive(cat);
      });

      listFragment.appendChild(item);
    });

    list.innerHTML = '';
    list.appendChild(listFragment);
  },

};

const controller = {
  init() {
    model.current = model.cats[0];
  },

  getCurrent() {
    return model.current;
  },

  getAll() {
    return model.cats;
  },

  addClickCount() {
    const current = controller.getCurrent();
    current.num++;

    cardView.render(current);
  },

  update(newValue) {
    let current = controller.getCurrent();
    let targetIndex = model.cats.findIndex(cat => cat.name === current.name);

    model.cats = [
      ...model.cats.slice(0, targetIndex),
      newValue,
      ...model.cats.slice(targetIndex + 1),
    ];
    model.current = newValue;
    current = controller.getCurrent();

    cardView.render(current);
    listView.render();
  },

  setActive(cat) {
    const current = controller.getCurrent();

    current.active = false;
    cat.active = true;
    model.current = cat;

    cardView.render(cat);
  },

};

const createList = function createList(catName) {
  const catNameCard = document.createElement('div');
  const template = `<a href="#${catName}" onClick="controller.setActive('${catName}')">
                      ${catName}
                    </a>`;

  catNameCard.innerHTML = template;
  return catNameCard;
};

window.addEventListener('load', function (e) {
  controller.init();
  cardView.init();
  listView.render();
});
