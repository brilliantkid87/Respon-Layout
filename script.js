const form = document.getElementById("contact-form");
const emailAddress = "brilliantkid87@gmail.com";

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name.value === "") {
        alert("Silakan masukkan nama Anda!");
        return false;
    }

    const mailtoLink = "mailto:" + emailAddress + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\n\n" + message);
    window.location.href = mailtoLink;
});

let blogs = [];

const form1 = document.querySelector('form');
const cardList = document.querySelector('#card-list');

form1.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const startDate = document.querySelector('#start-date').value;
  const endDate = document.querySelector('#end-date').value;
  const description = document.querySelector('#description').value;
  const image = document.querySelector('#image').files[0];

  const technologies = [];
  const checkboxGroup = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  checkboxGroup.forEach(function(checkbox) {
    technologies.push(checkbox.value);
  });

  const Blog = {
    name,
    startDate,
    endDate,
    post: getDistanceTime(startDate, endDate),
    description,
    technologies,
    image
  };

  blogs.push(Blog);
  console.log(blogs);

  // render the blog cards
  renderBlogs(blogs);
});

function renderBlogs(blogs) {
  // generate HTML cards for the blogs
  document.getElementById("card-list").innerHTML = "";
  for (let i = 0; i < blogs.length; i++) {
    const Blog = blogs[i];
    const descriptionWords = Blog.description.split(" ");
    const showViewMore = descriptionWords.length > 20;

    let shortDescription = Blog.description;
    let longDescription = "";

    if (showViewMore) {
      shortDescription = descriptionWords.slice(0, 20).join(" ");
      longDescription = descriptionWords.slice(20).join(" ");
    }

    document.getElementById("card-list").innerHTML += `
      <div class="card">
        <div class="image-wrapper">
          <img src="${
            Blog.image ? URL.createObjectURL(Blog.image) : "https://via.placeholder.com/150"
          }" alt="${Blog.name}">
        </div>
        <div class="info-wrapper">
          <h2>${Blog.name}</h2>
          <h5>duration : ${Blog.post}</h5>
          <p>
            ${shortDescription}
            ${showViewMore ? `
              
              <a class="btn-view-more" href="blog-detail.html" target="_blank">View More</a>
            ` : ""}
          </p>
          <div class="tech-wrapper">
            ${Blog.technologies
              .map(function (tech) {
                if (tech === "Node.js") {
                  return '<i class="fab fa-node-js"></i>';
                } else if (tech === "React.js") {
                  return '<i class="fab fa-react"></i>';
                } else if (tech === "Angular") {
                  return '<i class="fab fa-angular"></i>';
                } else if (tech === "Vultr") {
                  return '<i class="fas fa-server"></i>';
                }
              })
              .join("")}
          </div>
        </div>
      </div>
    `;

    if (showViewMore) {
      const card = document.querySelectorAll(".card")[i];
      const btnViewMore = card.querySelector(".btn-view-more");
      const viewMore = card.querySelector(".view-more");
      btnViewMore.addEventListener("click", function () {
        viewMore.style.display = "inline";
        btnViewMore.style.display = "none";
      });
    }
  }
}

function redirectToBlogDetail(id) {
  window.location.href = `blog-detail.html?id=${id}`;
}



function getDistanceTime() {
  let startDate = Date.parse(document.querySelector('#start-date').value)
  let endDate = Date.parse(document.querySelector('#end-date').value)

  let distance = endDate - startDate

  let miliSecond = 1000
  let secondinHours = 3600
  let hoursinDay = 24
  let dayInMonth = 31
  let monthInYear = 12

  let distanceYear = Math.floor(distance / (miliSecond * secondinHours * hoursinDay * dayInMonth * monthInYear))
  
  let distanceMonth = Math.floor(distance / (miliSecond * secondinHours * hoursinDay * dayInMonth))

  let distanceDay = Math.floor(distance / (miliSecond * secondinHours * hoursinDay))

  if (distanceYear > 0) {
    return `${distanceYear} year`
  } else if (distanceMonth > 0) {
    return `${distanceMonth} month`
  } else if (distanceDay > 0) {
    return `${distanceDay} day`
  }
}

