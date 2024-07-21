import { svg, btn, name, pass, abs, abjs } from "./export.js";

svg.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.className.includes("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("load", () => {
  let dark_Sun = localStorage.getItem("theme");

  if (dark_Sun === "dark") {
    document.documentElement.classList.add("dark");
  }
});

////////////////
let db = null;
window.addEventListener("load", () => {
  let index_DB = indexedDB.open("Login Tail", 14);

  index_DB.addEventListener("success", (event) => {
    db = event.target.result;
  });

  index_DB.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("user")) {
      db.createObjectStore("user", { keyPath: "id" });
    }

    if (db.objectStoreNames.contains("ushher")) {
      db.deleteObjectStore("ushjh9er");
    }
  });
});

btn.addEventListener("submit", (e) => {
  let nameVal = name.value.trim();
  let passVal = pass.value.trim();
  e.preventDefault();
  if (name.value && pass.value) {
    getAlluser(name.value).then((ex) => {
      if (ex) {
        abjs.style.transform = "translateY(0px)";
        abs.style.transform = "translateY(0px)";
        alert("user Already exite");
      } else {
        alert("Welcome")
        addUser({
          id: Math.floor(Math.random() * 100),
          name: nameVal,
          pass: passVal,
        });
      }
    });
    name.value = "";
    pass.value = "";
  } else {
    alert("Pleas Fill the INput");
  }
});

function addUser(userObj) {
  let tx = db.transaction("user", "readwrite");
  let store = tx.objectStore("user");

  let req = store.add(userObj);
}

function getAlluser(userName) {
  return new Promise((resolve, reject) => {
    let tx = db.transaction("user", "readonly");
    let store = tx.objectStore("user");
    let requst = store.getAll();

    requst.addEventListener("success", (e) => {
      let data = e.target.result;
      let flag = data.some((item) => item.name === userName);
      resolve(flag);
    });
  });
}

// let tx = db.transaction("user", "readwrite");

// let store = tx.objectStore("user");
// let req = store.add(user);

name.addEventListener("focus", () => {
  abs.style.transform = "translateY(-20px)";
});

name.addEventListener("blur", () => {
  if (name.value) {
    abs.style.transform = "translateY(-20px)";
  } else {
    abs.style.transform = "translateY(0px)";
  }
});
pass.addEventListener("focus", () => {
  abjs.style.transform = "translateY(-20px)";
});

pass.addEventListener("blur", () => {
  if (pass.value) {
    abjs.style.transform = "translateY(-20px)";
  } else {
    abjs.style.transform = "translateY(0px)";
  }
});
