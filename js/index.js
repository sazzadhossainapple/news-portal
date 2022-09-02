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

  const singleCategoryInfo = document.getElementById("single-category-info");
  singleCategoryInfo.textContent = "";
  singleCategorys.forEach((singleCategory) => {
    const { thumbnail_url, title, details } = singleCategory;
    const divSingleCategory = document.createElement("div");
    divSingleCategory.innerHTML = `
    <div class="card mb-3 p-3">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title fw-bold mb-3">${title}</h5>
                <p class="card-text text-muted lh-lg">${
                  details.length > 300 ? details.slice(0, 300) + "..." : details
                }</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
     
    `;
    singleCategoryInfo.appendChild(divSingleCategory);
  });
};

loadAllCategory();
