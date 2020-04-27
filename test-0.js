var tags = ["No Tag", "Tag 1", "Tag 2"]

function launchEvents() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("The XML has loaded.");
            document.getElementById('test').innerHTML = "";
            getEventInfo(this);
        }
    };

    xhttp.open("GET", "https://events.unl.edu/studentaffairs/2020/1/?format=xml", true);
    xhttp.send();
}

function getEventInfo(xml) {
    var xmlDoc = xml.responseXML;
    var events = xmlDoc.getElementsByTagName("Event");
    var eventTitles = []
    var eventIDs = []
    for (i = 0; i < events.length; i++) {
        var eventTitle = events[i].getElementsByTagName("EventTitle")[0].childNodes[0].nodeValue;
        var eventID = events[i].getElementsByTagName("EventID")[0].childNodes[0].nodeValue;
        eventTitles.push(eventTitle);
        eventIDs.push(eventID);
    }
    logEventInfo(events, eventTitles, eventIDs);
}

function logEventInfo(events, eventTitles, eventIDs) {
    for (i = 0; i < events.length; i++) {
        var eventDiv = document.createElement("DIV");
        eventDiv.setAttribute('class', 'event-div dcf-mb-7 dcf-p-3 unl-bg-lighter-gray');
        eventDiv.setAttribute('id', 'event-div-' + i);
        var eventTitleH3 = document.createElement("H3");
        var eventIDH5 = document.createElement("H5");
        eventTitleH3.innerHTML = eventTitles[i];
        eventIDH5.innerHTML = eventIDs[i];
        document.getElementById('test').appendChild(eventDiv);
        document.getElementById('event-div-' + i).appendChild(eventTitleH3);
        document.getElementById('event-div-' + i).appendChild(eventIDH5);
        for (e = 0; e < tags.length; e++) {
            var eventTag = document.createElement("SELECT");
            eventTag.setAttribute('class', 'dcf-input-select');
            eventTag.setAttribute('id', 'event-div-' + i + "-" + "select-tag-" + e);
            //eventTag.setAttribute('onChange', 'addTagOnce(this)');
            for (o = 0; o < tags.length; o++) {
                if (o == 0) {
                    var tag = document.createElement("option");
                    tag.text = "No Tag";
                    eventTag.add(tag, eventTag[o + 1]);
                } else {
                    var tag = document.createElement("option");
                    tag.text = "Tag" + " " + o;
                    eventTag.add(tag, eventTag[o + 1]);
                }
            }
            document.getElementById('event-div-' + i).appendChild(eventTag);
        }
    }
    makeSaveButton()
}

/*function addTagOnce(selectValue) {
    var currentValue = selectValue.options[selectValue.selectedIndex].text;
    for (u = 0; u < selectValue.options.length; u++) {
        if (selectValue.options[u].text == currentValue) {
            selectValue.remove(selectValue.options[u]);
        }
    }

}*/

function makeSaveButton() {
    var saveButton = document.createElement("BUTTON");
    saveButton.setAttribute('onclick', 'exportTags()');
    saveButton.setAttribute('class', 'dcf-btn dcf-btn-primary');
    saveButton.innerHTML = "Save and Export Tags";
    document.getElementById('test').appendChild(saveButton);
}

function exportTags() {
    //var doc = document.implementation.createDocument("", "", null);
    //var peopleElem = doc.createElement("people");
    //var serializer = new XMLSerializer();
    //var xmlString = serializer.serializeToString(doc);
    alert("At this point, I would overwrite the <tag> in the XML in the event folder, which the Django App would then log to the DB every night at 3am. Except I need to run on a server to do that, since JS can't CRUD files except on a server.");
}
