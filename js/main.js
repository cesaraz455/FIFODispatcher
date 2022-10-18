import Dispatcher from "./dispatcher.js";

$(document).ready( function () {
    let table = $("#processesTable");
    let addButton = $("#addRandomProcess");
    let dispatcher = new Dispatcher(table, addButton);
    dispatcher.init();
} );