const loadAllCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

// all categorys
const displayAllCategory = (categorys) => {
  //   console.log(categorys);

  const categoryAllList = document.getElementById("category-list");
  categorys.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <li 
    onclick="loadSingleCategory(${category.category_id})" class="nav-item nav-list-items ">
    <a class="nav-link active" aria-current="page">${category.category_name}</a>
    </li>
    `;
    categoryAllList.appendChild(div);
  });
};

// single Category items
const loadSingleCategory = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${0}${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displaySingleCategory(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displaySingleCategory = (singleCategorys) => {
  console.log(singleCategorys);
};

loadAllCategory();
