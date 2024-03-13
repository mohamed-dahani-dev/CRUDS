let title = document.getElementById("title");
let price = document.getElementById("price");
let tva = document.getElementById("tva");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let randoom;

// get total

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +tva.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#008000";
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = "#e41313";
    }
};

// creat product

let dataProduct;
if (localStorage.localData != null) {
    dataProduct = JSON.parse(localStorage.localData);
} else {
    dataProduct = [];
}
submit.onclick = function () {
    let newDataProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        tva:tva.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value == "") {
        title.style.border = "solid 2px red";
        title.placeholder="Please Entre The Title";
    } else {
        title.style.border = "none";
    }
    if (price.value == "") {
        price.style.border = "solid 2px red";
        price.placeholder="Please Entre The Price";
    } else {
        price.style.border = "none";
    }
    if (category.value == "") {
        category.style.border = "solid 2px red";
        category.placeholder="Please Entre The Category";
    } else {
        category.style.border = "none";
    }
    if (title.value != "" && price.value != "" && category.value != "") {
        if (mode === "create") {
            if (newDataProduct.count > 1) {
            for (let i = 0; i < newDataProduct.count; i++) {
                dataProduct.push(newDataProduct);
            }
        } else {
            dataProduct.push(newDataProduct);
        }
        } else {
            dataProduct[randoom] = newDataProduct;
            mode = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }


    // save data in localstorage


    localStorage.localData = JSON.stringify(dataProduct);
    showData();
}

// clear inputs

function clearData() {
    title.value = "";
    price.value = "";
    tva.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read

function showData() {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tva}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
        document.getElementById("tbody").innerHTML = table;
        let btnDelelteAll = document.getElementById("deleteAll");
        if (dataProduct.length > 0) {
            btnDelelteAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
            `;
        } else {
            btnDelelteAll.innerHTML = "";
        };
    };
    getTotal();
}
showData();

// delete

function deleteData(i) {
    dataProduct.splice(i,1);
    localStorage.localData = JSON.stringify(dataProduct);
    showData();
    if (dataProduct.length <= 0) {
        location.reload();
    };
};
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
    location.reload();
}


// update

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    tva.value = dataProduct[i].tva;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mode = "update";
    randoom = [i];
    getTotal();
    scroll({
        top:0,
        behavior:"smooth",
    })
}


// search


let searchMode = "title";
function getSearchMode(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMode = "title";
        search.placeholder="Search By Title"
    } else {
        searchMode = "category";
        search.placeholder="Search By Category"
    } 
    search.focus();
    search.value = "";
    showData()
}
function searchData(value) {
    let table = "";
    if (searchMode == "title") {
        
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tva}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
            }
        }
    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tva}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}






let btnscroll = document.getElementById("btnscroll");
onscroll = function () {
    if (scrollY >= 400) {
        btnscroll.style.display = "block"
    } else {
        btnscroll.style.display = "none"
    }
};
btnscroll.onclick = function () {
    scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
};
if (scrollY >= 0) {
    btnscroll.style.display = "none"
} else {
    btnscroll.style.display = "block"
};