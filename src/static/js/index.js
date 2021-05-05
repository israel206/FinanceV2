if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceWorker.js")
    console.log("Service Worker registrado com sucesso")
} else {
    console.log(err)
    console.log("Registro de service worker falhou")
}

const $ = document.querySelector.bind(document)

const html = {
    novaTransacao: $(".form-modal"),
    editModal: $(".edit-modal"),
    themeModal: $(".settings-modal"),
}

const assignClass = (elemento, classe) => {
    return elemento.classList.toggle(classe)
}

//NOVA TRANSAÇÃO MODAL
$(".new").addEventListener("click", () => assignClass(html.novaTransacao, "active"))
$("#form-button").addEventListener("click", () => assignClass(html.novaTransacao, "active"))

//Edição Transação
$(".edit").addEventListener("click", () => assignClass(html.editModal, "active"))
$("#edit-button").addEventListener("click", () => assignClass(html.editModal, "active"))

//TROCAR TEMA MODAL
$("#settings").addEventListener("click", () => assignClass(html.themeModal, "active"))
$("#settings-button").addEventListener("click", () => assignClass(html.themeModal, "active"))


//THEME SWITCHER
$(".settings-modal button").addEventListener("click", () => {
    html.themeModal.classList.toggle("active")

    if($("#theme").selectedIndex == 0) {
        setTheme("light")
    } else if ($("#theme").selectedIndex == 1) {
        setTheme("omni")
    } else {
        setTheme("launchbase")
    }
})

function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem("theme") === "omni") {
        setTheme("light")
    } else if (localStorage.getItem("theme") === "light") {
        setTheme("omni")
    } else {
        setTheme("launchbase")
    }
}

(function() {
    if (localStorage.getItem("theme") === "omni") {
        setTheme("omni")
        
    } else if (localStorage.getItem("theme") === "light") {
        setTheme("light")
    } else {
        setTheme("launchbase")
    }
})()

const deleteTransaction = id => {
    // window.location.href = `https://maratona-discovery.herokuapp.com/${id}`
    window.location.href = `http://localhost:3333/${id}`
}