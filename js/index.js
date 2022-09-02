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

  //most view and sort
  singleCategorys.sort((a, b) => b.total_view - a.total_view);

  // display single category
  singleCategorys.forEach((singleCategory) => {
    const { thumbnail_url, title, details, author, total_view } =
      singleCategory;
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
                <p class="card-text text-muted lh-lg mb-3">${
                  details.length > 400 ? details.slice(0, 400) + "..." : details
                }</p>
                <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-3">
                  <div>
                    <img class="rounded-circle author-img" src="${
                      author.img
                    }" alt="" />
                  </div>
                  <div>
                    <h3 class="fw-bold fs-6 mb-1">${
                      author.name ? author.name : " Name Not Found"
                    }</h3>
                    <p class="text-muted">${author.published_date}</p>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <p class="fs-4 fw-bold"><i class="bi bi-eye"></i></p>
                  <p class="fs-4 fw-bold">${
                    total_view ? total_view : "View Not Found"
                  }<span>M</span></p>
                </div>
                <div class="fs-4 fw-bold d-flex align-items-center">
                  <i class="bi bi-star-half"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </div>
                <div class="fs-1 fw-bold d-flex align-items-center">
                  <i class="bi bi-arrow-right-short"></i>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

    `;
    singleCategoryInfo.appendChild(divSingleCategory);
  });
};

loadAllCategory();
