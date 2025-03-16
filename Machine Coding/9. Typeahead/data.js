const food = [
  {
    name: "Apple",
    photo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
    price: 35,
  },
  {
    name: "Banana",
    photo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg",
    price: 12,
  },
  {
    name: "Grapes",
    photo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg",
    weight: 0.1,
    price: 45,
  },
  {
    name: "Pineapple",
    photo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg",
    price: 200,
  },
  {
    name: "Cabbage",
    photo_url: "https://www.freepngimg.com/thumb/categories/2970.png",
    quantity: "One Unit",
    id: 2,
    price: 30,
  },
  {
    name: "Capsicum",
    photo_url:
      "https://www.nicepng.com/png/detail/52-525615_green-bell-pepper-png-green-capsicum-png.png",
    quantity: "One Unit",
    id: 7,
    price: 5,
  },
  {
    name: "Garlic",
    photo_url:
      "https://www.freepngimg.com/thumb/garlic/2-2-garlic-transparent-thumb.png",
    quantity: "One Unit",
    id: 10,
    price: 20,
  },
  {
    name: "Beetroot",
    photo_url: "https://pngimg.com/uploads/beet/beet_PNG28.png",
    quantity: "One Unit",
    id: 11,
    price: 20,
  },
  {
    name: "Tomatoes",
    photo_url: "https://www.freepngimg.com/thumb/categories/2985.png",
    quantity: "One Unit",
    id: 13,
    price: 5,
  },
  {
    name: "Celeriac",
    photo_url:
      "https://w7.pngwing.com/pngs/252/146/png-transparent-celeriac-leaf-vegetable-food-celery-herbes-leaf-vegetable-food-plant-stem-thumbnail.png",
    quantity: "One Bunch",
    id: 16,
    price: 5,
  },
  {
    name: "Carrots",
    photo_url: "https://www.freepngimg.com/thumb/categories/2971.png",
    quantity: "One Kg",
    id: 18,
    price: 60,
  },
  {
    name: "Onions",
    photo_url:
      "https://www.freepngimg.com/thumb/onion/10-red-onion-png-image-thumb.png",
    quantity: "One Kg",
    id: 19,
    price: 120,
  },
  {
    name: "Potatoes",
    photo_url:
      "https://www.freepngimg.com/thumb/potato/7-potato-png-images-pictures-download-thumb.png",
    quantity: "One container",
    id: 20,
    price: 80,
  },
];

export const fetchFood = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(food), 300);
  });
};
