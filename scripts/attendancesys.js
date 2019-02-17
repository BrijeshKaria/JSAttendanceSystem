
// EXTRACT AND SUBMIT TABLE DATA.
function submit() {
    var myTab = document.getElementById('mytable');
    var values = new Array();
    var month = document.getElementById('monthval').innerText;

    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 7; row < myTab.rows.length - 1; row++) {
        for (c = 0; c < myTab.rows[row].cells.length; c++) {   // EACH CELL IN A ROW.

            var element = myTab.rows.item(row).cells[c];
            // if (element.childNodes[0].getAttribute('type') == 'text') {
            values.push("'" + element.innerText + "'");
            //}
        }
    }
    console.log(values);
    localStorage.setItem(month, JSON.stringify(values));
    var data = JSON.parse(localStorage.getItem(month));
    console.log(data);
}

function Loaddata() {

    var month = document.getElementById('monthval').innerText;
    var data = JSON.parse(localStorage.getItem(month));
    console.log(data);


    var myTab = document.getElementById('mytable');
    //var values = new Array();
    var i = 0;
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 7; row < myTab.rows.length - 1; row++) {
        for (c = 0; c < myTab.rows[row].cells.length; c++) {   // EACH CELL IN A ROW.

            var element = myTab.rows.item(row).cells[c];
            var chkbox = element.children[0];
            var span = element.children[1];
            if (chkbox == undefined || chkbox.type != 'checkbox') {
                span = element.children[0];
                if (span == undefined) {

                } else {
                    span.innerText = data[i];
                }
            }

            if (data[i].trim() == "'P'") {
                chkbox.checked = true;
                span.innerText = "P";
            }
            // if (element.childNodes[0].getAttribute('type') == 'text') {
            console.log(data[i]);
            i++;
            //}
        }
    }
}

function updatecount(checkboxElem) {
    if (checkboxElem.checked) {
        checkboxElem.val = 'P';
        //$(checkboxElem).closest('td').find('span').text("P");
        checkboxElem.parentElement.children[1].innerText = "P";

    } else {
        checkboxElem.val = 'A';
        //$(checkboxElem).closest('td').find('span').text("");
        checkboxElem.parentElement.children[1].innerText = "";
    }
    console.log("JQuery method call...");
    console.log($(checkboxElem).closest('tr').find('td:eq(0)').text());
    console.log("DOM method call...");
    console.log(checkboxElem.parentElement.parentElement.children[0].innerText);
    var count = 0;
    for (var i = 0; i < 31; i++) {
        try {
            //if ($(checkboxElem).closest('tr').find('td:eq(' + i + ')').find('span').text() == 'P') {
            if (checkboxElem.parentElement.parentElement.children[i].children[1].innerText == "P") {
                count++;
            }
        } catch (err) { }
    }
    //$(checkboxElem).closest('tr').find('td:eq(4)').html(count);
    checkboxElem.parentElement.parentElement.children[34].innerText = count;
}
