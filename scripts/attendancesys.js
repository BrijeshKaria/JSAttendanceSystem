
function submitYTD() {
    var myTab = document.getElementById('tableytd');
    var values = new Array();

    var teacherval = document.getElementById('teacherval').innerText;
    var periodval = document.getElementById('periodval').innerText;
    var courseval = document.getElementById('courseval').innerText;
    var startyear = document.getElementById('startyear').innerText;
    var endyear = document.getElementById('endyear').innerText;
    var roomval = document.getElementById('roomval').innerText;

    values.push(teacherval);
    values.push(periodval);
    values.push(courseval);
    values.push(startyear);
    values.push(endyear);
    values.push(roomval);

    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 12; row < 43; row++) {
        var element = myTab.rows.item(row).cells[1];
        values.push("'" + element.innerText + "'");
    }
    console.log(values);
    var key = 'ytd';//teacherval + periodval + courseval + startyear + roomval;
    localStorage.setItem(key, JSON.stringify(values));
}

// EXTRACT AND SUBMIT TABLE DATA.
function submit() {
    var myTab = document.getElementById('mytable');
    var values = new Array();
    var month = document.getElementById('monthval').innerText;

    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 7; row < 38; row++) {
        for (c = 0; c < 36; c++) {   // EACH CELL IN A ROW.

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


function LoadYTDdata() {

    var data = JSON.parse(localStorage.getItem('ytd'));
    console.log(data);


    var myTab = document.getElementById('tableytd');
    //var values = new Array();
    var teacherval = document.getElementById('teacherval');
    var periodval = document.getElementById('periodval');
    var courseval = document.getElementById('courseval');
    var startyear = document.getElementById('startyear');
    var endyear = document.getElementById('endyear');
    var roomval = document.getElementById('roomval');


    teacherval.innerText = data[0];
    periodval.innerText = data[1];
    courseval.innerText = data[2];
    startyear.innerText = data[3];
    endyear.innerText = data[4];
    roomval.innerText = data[5];

    var i = 6;
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 12; row < 43; row++) {

        var element = myTab.rows.item(row).cells[1];
        var editablediv = element.children[0];
        if(editablediv != undefined){
            editablediv.innerText = data[i];

            }
        i++;
    }
}

function Loaddata() {

    var month = document.getElementById('monthval').innerText;
    var data = JSON.parse(localStorage.getItem(month));
    console.log(data);


    var myTab = document.getElementById('mytable');
    //var values = new Array();
    var i = 0;
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 7; row < 38; row++) {
        for (c = 0; c < 36; c++) {   // EACH CELL IN A ROW.

            var element = myTab.rows.item(row).cells[c];
            var chkbox = element.children[0];
            var span = element.children[1];
            if (chkbox == undefined || chkbox.type != 'checkbox') {
                span = element.children[0];
                if (span == undefined) {
                    if (c == 34) {
                        element.innerText = data[i];
                    }
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
