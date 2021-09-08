
// Search Book Function
const search = () => {
  const inputText = document.getElementById("inputText");
  const booKItemDesplay = document.getElementById("booKItemDesplay");
  const foundItemList = document.getElementById("foundList");
  const blankInput = document.getElementById("blankInput");
  const errorMsg = document.getElementById("errorMsg");

  const inputValue = inputText.value;
  booKItemDesplay.textContent = "";
  foundItemList.innerText = "";
  if (inputValue === "") {
    sppiner("hidden");
    blankInput.style.display = "block";
    errorMsg.style.display = "none";
    foundItemList.innerText = "";
    booKItemDesplay.textContent = "";
  } else {
    sppiner("visible");
    blankInput.style.display = "none";
    // Book Api Link
    const url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayBook(data);
      });
  }
  inputText.value = "";
};

// Display Book Function
displayBook = (data) => {
  const foundItemList = document.getElementById("foundList");
  foundItemList.innerText = `About ${data.numFound} results found.`;

  // Error Message Handling 
  const errorMsg = document.getElementById("errorMsg");
  if (data.numFound === 0) {
    foundItemList.innerText = "";
    errorMsg.style.display = "block";
    sppiner("hidden");
  } else {
    errorMsg.style.display = "none";
    const booKItemDesplay = document.getElementById("booKItemDesplay");
    data?.docs.forEach((item) => {
      const div = document.createElement("div");
      console.log(item);
      // Cover Image Api Link
      item?.cover_i
        ? (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`)
        : (imgUrl = "images/not_found.jpg");

      // Author Info
      item?.author_name ? (auth = item?.author_name.join()): (auth = "not available");

      // Publisher Info
      item?.publisher[0] ? (publisher = item?.publisher[0]): (publisher = "not available");

      // Publish Date Info
      item?.publish_date[0] ? (publishDate = item?.publish_date[0]): (publishDate = "not available");

      console.log(item?.title);

      // Book Card Dynamic Section
      div.innerHTML = `
       <div class="col">
           <div class="card cardHeight">
                <img src=${imgUrl} class="card-img-top imgHieght" alt="${item?.title}">
               <div class="card-body">
                   <h5 id="authorName" class="card-title my-2"> <i class="fas fa-book"></i> Book Name: ${item?.title}</h5>
                   <p class="card-text"><i class="fas fa-user"></i> Author: <span class="text-secondary">${auth}</span></p>
                   <p class="card-text"><i class="fas fa-file-powerpoint"></i> Publisher: <span class="text-secondary">${publisher}</span></p>
                   <p class="card-text"><i class="fas fa-calendar-day"></i> Published: <span class="text-secondary">${publishDate}</span></p>
               </div>
           </div>
       </div>
       `;
      booKItemDesplay.appendChild(div);
      sppiner("hidden");
    });
  }
};

// Sppiner Lodding function 
sppiner = (lodding) => {
  const sppiner = document.getElementById("sppiner");
  sppiner.style.visibility = lodding;
};
