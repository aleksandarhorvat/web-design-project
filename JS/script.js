var navigation;
var arrow;
var alex;
var tables

function initialize() {
    navigation = document.getElementsByClassName('navigation');
    navigation = navigation[0];
    navigation.style.top = "-50px";

    createArrow();

    tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        tables[i].onmouseover = hoverTable;
        tables[i].onmouseout = unHoverTable;
    }

    alex = document.getElementById("alex");
    if (alex != null)
        alex.onmouseover = hoverAlex;

    if (document.getElementById("form") != null) {
        var city = document.getElementById("city");
        city.oninvalid = cityNotSelected;
        city.oninput = cityNotSelected;


        var yearAlex = document.getElementById("yearAlex");
        yearAlex.oninvalid = checkYearAlex;
        yearAlex.oninput = checkYearAlex;

        var albumArctic = document.getElementById("albumArctic");
        albumArctic.oninvalid = checkAlbumsArctic;
        albumArctic.oninput = checkAlbumsArctic;

        var yearArctic = document.getElementsByName("yearArctic")
        yearArctic[0].oninvalid = checkYearsArctic;
        yearArctic[0].oninput = checkYearsArctic;

        var yearShadow = document.getElementById("yearShadow");
        yearShadow.oninvalid = checkYearsShadow;
        yearShadow.oninput = checkYearsShadow;

        var albumsShadow = document.getElementById("albumsShadow");
        albumsShadow.oninvalid = checkAlbumsShadow;
        albumsShadow.oninput = checkAlbumsShadow;

        var nameLastName = document.getElementById("nameLastName");
        nameLastName.oninvalid = checkNameLastName;
        nameLastName.oninput = checkNameLastName;

        var mail = document.getElementById("mail");
        mail.oninvalid = checkMail;
        mail.oninput = checkMail;
    }
}

function validate() {
    var form = document.getElementById("form");
    form.action = "mailto:" + mail.value;
    if (checkBox(document.getElementsByName("instrument")) && checkBox(document.getElementsByName("typeMusic")) && checkBox(document.getElementsByName("lastConcert")))
        return true;
}

function createArrow() {
    arrow = document.createElement("img");
    arrow.src = "Pictures/arrow.png";
    arrow.style.display = "block";
    arrow.style.position = "absolute";
    arrow.style.marginLeft = "50%";
    arrow.style.marginRight = "50%";
    arrow.style.float = 'right';
    arrow.onclick = pressArrow;
    document.body.prepend(arrow);
}

function pressArrow() {
    var temp = null;
    var position = -50;

    clearInterval(temp);
    temp = setInterval(slika, 10);

    function slika() {
        if (position == 0)
            clearInterval(temp);
        else {
            position++;
            navigation.style.top = position + 'px';
        }
    }

    arrow.style.visibility = 'hidden';
}

function hoverAlex() {
    var div = document.getElementById("alexDiv");
    var video = document.createElement("iframe");
    video.height = alex.clientHeight;
    video.width = alex.clientWidth;
    video.src = "https://www.youtube.com/embed/ppqP39p6VmI"
    div.removeChild(alex);
    div.appendChild(video);
}

function hoverTable() {
    this.setAttribute("class", "newAttribute");
}

function unHoverTable() {
    this.classList.remove("newAttribute");
}

function cityNotSelected() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must select a city.");
    }
}

function checkYearAlex() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must enter a year.");
    } else if (this.validity.rangeUnderflow) {
        this.setCustomValidity("The year must be equal to or greater than 1960.");
    } else if (this.validity.rangeOverflow) {
        this.setCustomValidity("The year must be less than 2000.");
    }
}

function checkAlbumsArctic() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must select an album number.");
    }
}

function checkYearsArctic() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must select the year of establishment.");
    }
}

function checkYearsShadow() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must enter a year.");
    } else if (this.validity.rangeUnderflow) {
        this.setCustomValidity("The year must be equal to or greater than 1990.");
    } else if (this.validity.rangeOverflow) {
        this.setCustomValidity("The year must be less than 2010.");
    }
}

function checkAlbumsShadow() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must enter the number of the albums.");
    } else if (this.validity.rangeUnderflow) {
        this.setCustomValidity("Number of albums must be greater than or equal to 0.");
    } else if (this.validity.rangeOverflow) {
        this.setCustomValidity("Number of albums must be less than or equal to 20.");
    }
}

function checkNameLastName() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must enter your first and last name.");
        return;
    }
    var temp = this.value;
    if (temp[0] == temp[0].toLowerCase()) {
        this.setCustomValidity("The first letter of the name must be capitalized!");
        return;
    }

    if (temp.indexOf(' ') === -1 || temp[temp.indexOf(' ') + 1] == undefined) {
        this.setCustomValidity("You must also enter your last name!");
        return;
    }

    if (temp[temp.indexOf(' ') + 1] == temp[temp.indexOf(' ') + 1].toLowerCase()) {
        this.setCustomValidity("The first letter of the surname must be capitalized!");
        return;
    }
}

function checkMail() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("You must enter your email.");
        return;
    }
    var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!pattern.test(this.value)) {
        this.setCustomValidity("You must enter your email in the appropriate form xxxx@xxxx.xxx");
        return;
    }
}

function checkBox(boxes) {
    var temp = false;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            temp = true;
            break;
        }
    }
    if (!temp)
        alert("You must select at least one a checkbox.");
    return temp;
}