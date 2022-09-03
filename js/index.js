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
    const li = document.createElement("li");
    li.classList.add("nav-item", "nav-list-items");
    li.innerHTML = `
       <a  onclick="loadSingleCategory(${category.category_id})" class="nav-link active text-muted" >${category.category_name}</a>
    `;
    categoryAllList.appendChild(li);
  });
};

// single Category News
const loadSingleCategory = async (id) => {
  // strat spinner loader
  toggleSpinner(true);
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
  const numberOfCategory = document.getElementById("items-found");
  numberOfCategory.textContent = "";
  const sortViewCategory = document.getElementById("sort-view-category");
  const spanCategoryNumber = document.createElement("span");
  spanCategoryNumber.classList.add("fs-6", "fw-semibold");

  // number of News for category found or not.
  if (singleCategorys.length === 0) {
    numberOfCategory.classList.remove("d-none");
    sortViewCategory.classList.add("d-none");
    spanCategoryNumber.innerText = `News not found for category 
    `;

    numberOfCategory.appendChild(spanCategoryNumber);
  } else {
    numberOfCategory.classList.remove("d-none");
    sortViewCategory.classList.remove("d-none");
    spanCategoryNumber.innerText = `${singleCategorys.length} News found for category 
    `;
    numberOfCategory.appendChild(spanCategoryNumber);
  }
  const singleCategoryInfo = document.getElementById("single-category-info");
  singleCategoryInfo.textContent = "";

  //most view and sort
  singleCategorys.sort((a, b) => b.total_view - a.total_view);

  // display single category
  singleCategorys.forEach((singleCategory) => {
    const { thumbnail_url, title, details, author, total_view, _id } =
      singleCategory;

    const divSingleCategory = document.createElement("div");
    divSingleCategory.innerHTML = `
    <div class="card mb-3 p-3">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid rounded-start img-singleCategory" alt="..." />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title fw-bold mb-3">${title}</h5>
                <p class="card-text text-muted lh-lg mb-3">${
                  details.length > 300 ? details.slice(0, 300) + "..." : details
                }</p>
                <div class="d-flex align-items-center justify-content-between flex-lg-row flex-sm-column flex-column">
                <div class="d-flex gap-3 mt-3 flex-lg-row flex-md-row flex-sm-column flex-column text-lg-start text-md-start text-sm-center text-center">
                  <div>
                    <img class="rounded-circle author-img" src="${
                      author.img
                    }" alt="" />
                  </div>
                  <div>
                    <h3 class="fw-bold fs-6 mb-1">${
                      author.name ? author.name : "No data found."
                    }</h3>
                    <p class="text-muted">${
                      author.published_date
                        ? author.published_date
                        : "No data found."
                    }</p>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-3 mt-4">
                  <p class="fs-4 fw-bold"><i class="bi bi-eye"></i></p>
                  <p class="fs-4 fw-bold">${
                    total_view ? total_view + "M" : "No data found."
                  }</p>
                </div>
                <div class="fs-4 fw-bold">
                  <i class="bi bi-star-half"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </div>
                <div class="fs-3 mt-3 mt-lg-0 mt-md-0 mt-sm-3 fw-bold">
                  <i onclick="loadSingleCategoryDetails('${_id}')" class="bi bi-arrow-right-short btn-icon rounded" data-bs-toggle="modal"
                  data-bs-target="#categoryDetailsModal"></i>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

    `;
    singleCategoryInfo.appendChild(divSingleCategory);
  });

  // stop spinner or loader
  toggleSpinner(false);
};

//spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// single category news details
const loadSingleCategoryDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displaySingleCategoryDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displaySingleCategoryDetails = (singleDetails) => {
  const { title, details, image_url, others_info, rating, total_view, author } =
    singleDetails;

  const newsTitle = document.getElementById("categoryDetailsModalLabel");
  newsTitle.innerText = title;

  const detailsCategoryInfo = document.getElementById("category-details-info");
  detailsCategoryInfo.textContent = "";
  detailsCategoryInfo.innerHTML = `
    <img class="img-fluid" src="${image_url}" alt="">
      <div>
      <p class="card-text text-muted lh-lg my-3">${details}</p>
      <div class="d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-lg-between justify-content-md-between justify-content-sm-center justify-content-center align-items-center">
      <div>
        <p><span class="fw-bold fs-6">Rating:</span> ${
          rating.number ? rating.number : "No data found."
        }, ${rating.badge ? rating.badge : "No data found."}.</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <p class="fs-4 fw-bold"><i class="bi bi-eye"></i></p>
        <p class="fw-bold">
          ${total_view ? total_view + "M" : "No data found."}
          </p>
        </p>
      </div>
    </div>
    <div class="d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-lg-between justify-content-md-between justify-content-sm-center justify-content-center align-items-center">
        <p><span class="fw-bold fs-6">Todays Pick: </span>${
          others_info.is_todays_pick === true ? "Yes" : "No"
        }</p>        
        <p><span class="fw-bold fs-6">Trending: </span>${
          others_info.is_trending === true ? "Yes" : "No"
        }</p>        
    </div>
    <div class="d-flex gap-3 justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-lg-row flex-md-row flex-sm-column flex-column text-lg-start text-md-start text-sm-center text-center">
      <div>
        <img class="rounded-circle author-img" src="${author.img}" alt="" />
      </div>
      <div>
        <h3 class="fw-bold fs-6 mb-1">${
          author.name ? author.name : "No data found."
        }</h3>
        <p class="text-muted">${
          author.published_date ? author.published_date : "No data found."
        }</p>
      </div>
      </div>
     </div>

  `;
};

loadAllCategory();
