
function submitYTD() {
    var myTab = document.getElementById('mytable');
    var values = new Array();

    var teacherval = document.getElementById('teacherval').innerText;
    values.push(teacherval);
    var periodval = document.getElementById('periodval').innerText;
    var courseval = document.getElementById('courseval').innerText;
    var startyear = document.getElementById('startyear').innerText;
    var endyear = document.getElementById('endyear').innerText;
    var roomval = document.getElementById('roomval').innerText;

    //values.push(teacherval);
    values.push(periodval);
    values.push(courseval);
    values.push(startyear);
    values.push(endyear);
    values.push(roomval);

    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 11; row < 43; row++) {
        var element = myTab.rows.item(row).cells[1];
        values.push(element.innerText);
    }
    console.log(values);
    var key = 'ytd';//teacherval + periodval + courseval + startyear + roomval;
    localStorage.setItem(key, JSON.stringify(values));
}

// EXTRACT AND SUBMIT TABLE DATA.
function submit() {
    var myTab = document.getElementById('mytable');
    var values = new Array();
    var monthctrl = document.getElementById('monthval');
    var month = monthctrl.innerText;
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 7; row < 38; row++) {
        for (c = 0; c < 36; c++) {   // EACH CELL IN A ROW.

            var element = myTab.rows.item(row).cells[c];
            // if (element.childNodes[0].getAttribute('type') == 'text') {
            values.push(element.innerText);
            //}
        }
    }
    console.log(values);
    localStorage.setItem(month, JSON.stringify(values));
    var data = JSON.parse(localStorage.getItem(month));
    console.log(data);
}


function LoadYTDdata(s,e) {

    var data = JSON.parse(localStorage.getItem('ytd'));
    console.log(data);

    if (s == undefined) {
        s = 11;
        e = 43;
    }

    var myTab = document.getElementById('mytable');

    var i = 6;
    // LOOP THROUGH EACH ROW OF THE TABLE.
    //for (row = 11; row < 43; row++) {
    for (row = s; row < e; row++) {

        var element = myTab.rows.item(row).cells[1];
        var editablediv = element.children[0];
        if (editablediv != undefined) {
            editablediv.innerText = data[i];

        } else {
            element.innerText = data[i];
        }
        i++;
    }

    //var values = new Array();
    var teacherval = document.getElementById('teacherval');
    var periodval = document.getElementById('periodval');
    var courseval = document.getElementById('courseval');
    var startyear = document.getElementById('startyear');
    var endyear = document.getElementById('endyear');
    var roomval = document.getElementById('roomval');


    settext(teacherval, data[0]);// teacherval.children[0].innerText = data[0];
    settext(periodval, data[1]);//periodval.children[0].innerText = data[1];
    settext(courseval, data[2]);//courseval.children[0].innerText = data[2];
    settext(startyear, data[3]);//startyear.children[0].innerText = data[3];
    settext(endyear, data[4]);//endyear.children[0].innerText = data[4];
    settext(roomval, data[5]);//roomval.children[0].innerText = data[5];

   
}

function settext(ctrl,txt) {
    if (ctrl.children.length == 0) {
        ctrl.innerText = txt;
    } else {
        ctrl.children[0].innerText = txt;
    }
}

function Loaddata() {

    var month = document.getElementById('monthval').innerText;
    var data = JSON.parse(localStorage.getItem(month));
    console.log(data);

    try{
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
                        if (c == 34  || c==33) {
                            element.innerText = data[i];
                        }
                    } else {
                        span.innerText = data[i];
                    }
                }

                if (data[i].trim() == "P") {
                    chkbox.checked = true;
                    span.innerText = "P";
                }
                // if (element.childNodes[0].getAttribute('type') == 'text') {
                console.log(data[i]);
                i++;
                //}
            }
        }
    }catch(e){

    }
    LoadYTDdata(7,39);
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
    var validDayaCount = 0;
    
    for (var i = 2; i < 33; i++) {
        try {
            var chkbox = checkboxElem.parentElement.parentElement.children[i].children[0];
            if (chkbox != undefined && chkbox.type == 'checkbox') {
                validDayaCount++;
            }

            //if ($(checkboxElem).closest('tr').find('td:eq(' + i + ')').find('span').text() == 'P') {
            if (checkboxElem.parentElement.parentElement.children[i].children[1].innerText == "P") {
                count++;
            }
        } catch (err) { }
    }
    //$(checkboxElem).closest('tr').find('td:eq(4)').html(count);
    checkboxElem.parentElement.parentElement.children[34].innerText = count;
    checkboxElem.parentElement.parentElement.children[33].innerText = validDayaCount - count;


    var myTab = document.getElementById('mytable');
    //var values = new Array();
    var presentcount=0;
    var absentcount=0;
    for (var j = 7; j < 36; j++) {
        var absentval = myTab.rows.item(j).cells[33].innerText;
        var presentval = myTab.rows.item(j).cells[34].innerText;
        presentcount += parseInt(presentval);
        absentcount += parseInt(absentval);
    }
    myTab.rows.item(38).cells[33].innerText = absentcount;
    myTab.rows.item(38).cells[34].innerText = presentcount;
}
