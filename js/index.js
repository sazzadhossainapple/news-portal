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
  console.log(singleCategorys);
  const numberOfCategory = document.getElementById("items-found");
  if (singleCategorys.length === null) {
    numberOfCategory.classList.add("d-none");
  } else {
    numberOfCategory.classList.remove("d-none");
  }
  const singleCategoryInfo = document.getElementById("single-category-info");
  singleCategoryInfo.textContent = "";

  //most view and sort
  singleCategorys.sort((a, b) => b.total_view - a.total_view);

  // display single category
  singleCategorys.forEach((singleCategory) => {
    const { thumbnail_url, title, details, author, total_view, _id } =
      singleCategory;
    // console.log(typeof _id);

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
                  details.length > 300 ? details.slice(0, 300) + "..." : details
                }</p>
                <div class="d-flex justify-content-between align-items-center flex-lg-row flex-sm-column flex-column">
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
                    <p class="text-muted">${
                      author.published_date
                        ? author.published_date
                        : "Date Not Found"
                    }</p>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <p class="fs-4 fw-bold"><i class="bi bi-eye"></i></p>
                  <p class="fs-4 fw-bold">${
                    total_view ? total_view + "M" : "View Not Found"
                  }</p>
                </div>
                <div class="fs-4 fw-bold d-flex align-items-center">
                  <i class="bi bi-star-half"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </div>
                <div class="fs-1 fw-bold d-flex align-items-center">
                  <i onclick="loadSingleCategoryDetails('${_id}')" class="bi bi-arrow-right-short btn-icon" data-bs-toggle="modal"
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
  console.log(singleDetails);

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
      <div class="d-flex justify-content-between align-items-center">
      <div>
        <p><span class="fw-bold fs-6">Rating:</span> ${rating.number}, ${
    rating.badge
  }.</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <p class="fs-4 fw-bold"><i class="bi bi-eye"></i></p>
        <p class="fw-bold">
          ${total_view ? total_view : "View Not Found"}<span>M</span>
        </p>
      </div>
    </div>
    <div class="d-flex gap-3 justify-content-center">
      <div>
        <img class="rounded-circle author-img" src="${author.img}" alt="" />
      </div>
      <div>
        <h3 class="fw-bold fs-6 mb-1">${
          author.name ? author.name : " Name Not Found"
        }</h3>
        <p class="text-muted">${
          author.published_date ? author.published_date : "Date Not Found"
        }</p>
      </div>
      </div>
     </div>

  `;
};

loadAllCategory();
