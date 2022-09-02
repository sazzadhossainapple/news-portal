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

const displayAllCategory = (categorys) => {
  console.log(categorys);

  const categoryAllList = document.getElementById("category-list");
  categorys.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `
    <a class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
    `;
    categoryAllList.appendChild(li);
  });
};

loadAllCategory();
