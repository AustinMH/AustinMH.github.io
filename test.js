tvar tags = ["Live Speaker", "Free Food", "Live Music", "Swag", "Big Red Welcome", "Hide Me Right Now"]
var uniqueEvents = 0;

function launchEvents() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("The XML has loaded.");
      document.getElementById('eventCol').innerHTML = "";
      getEventInfo(this);
    }
  };

  xhttp.open("GET", "https://events.unl.edu/studentaffairs/2020/4/?format=xml", true);
  xhttp.send();
}

function getEventInfo(xml) {
  var xmlDoc = xml.responseXML;
  var events = xmlDoc.getElementsByTagName("Event");
  var eventTitles = []
  var eventSubtitles = []
  var eventIDs = []
  var eventDescriptions = []
  var objects = {} //start a map
  for (i = 0; i < events.length; i++) {
    var eventID = events[i].getElementsByTagName("EventID")[0].childNodes[0].nodeValue;
    if (!(eventID in objects)) { //check if eventID[i] has already been added to the map on line 24, if not do code, if so, skip to line 44
      var eventTitle = events[i].getElementsByTagName("EventTitle")[0].childNodes[0].nodeValue;
      if (events[i].getElementsByTagName("Description")[0].childNodes.length > 0) {
        var eventDescription = events[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
      } else {
        var eventDescription = "This event has no description"
      }
      if (events[i].getElementsByTagName("EventSubtitle")[0].childNodes.length > 0) {
        var eventSubtitle = events[i].getElementsByTagName("EventSubtitle")[0].childNodes[0].nodeValue;
      } else {
        var eventSubtitle = "This event has no subtitle"
      }
      eventTitles.push(eventTitle);
      eventSubtitles.push(eventSubtitle);
      eventIDs.push(eventID);
      eventDescriptions.push(eventDescription);
      objects[eventID] = 1 //add eventID[i] to the map on 24
      uniqueEvents++
    } else { // stop iteration, jump to next iteration
      continue
    }
  }
  logEventInfo(events, eventTitles, eventSubtitles, eventIDs, eventDescriptions);
}

function logEventInfo(events, eventTitles, eventSubtitles, eventIDs, eventDescriptions) {
  for (i = 0; i < uniqueEvents; i++) {
    var eventDiv = document.createElement("DIV");
    eventDiv.setAttribute('class', 'event-div dcf-mb-7 dcf-p-3 unl-bg-lighter-gray');
    eventDiv.setAttribute('id', 'event-div-' + i);
    var eventTitleH3 = document.createElement("H3");
    var eventSubtitleH4 = document.createElement("H4");
    var eventIDH5 = document.createElement("H5");
    var eventDescriptionP = document.createElement("P");
    eventTitleH3.innerHTML = "Event Title:" + " " + eventTitles[i];
    eventSubtitleH4.innerHTML = "Event Subtitle:" + " " + eventSubtitles[i];
    eventIDH5.innerHTML = "Event ID:" + " " + eventIDs[i];
    eventDescriptionP.innerHTML = eventDescriptions[i];
    document.getElementById('eventCol').appendChild(eventDiv);
    document.getElementById('event-div-' + i).appendChild(eventTitleH3);
    document.getElementById('event-div-' + i).appendChild(eventSubtitleH4);
    document.getElementById('event-div-' + i).appendChild(eventIDH5);
    document.getElementById('event-div-' + i).appendChild(eventDescriptionP);
    for (e = 0; e < tags.length; e++) {
      var eventTag = document.createElement("DIV");
      eventTag.setAttribute('class', 'dcf-input-checkbox');
      eventTag.setAttribute('id', 'event-div-' + i + "-" + "check-tag-" + e);
      var tag = document.createElement("INPUT");
      tag.setAttribute("type", "checkbox");
      tag.setAttribute('id', 'event-div-' + i + "-" + "check-tag-input-" + e);
      var tagLabel = document.createElement("LABEL");
      tagLabel.setAttribute("for", 'event-div-' + i + "-" + "check-tag-input-" + e);
      tagLabel.setAttribute("id", 'event-div-' + i + "-" + "check-tag-label-" + e);

      eventTag.appendChild(tag);
      eventTag.appendChild(tagLabel);
      document.getElementById('event-div-' + i).appendChild(eventTag);
      tagLabel.innerHTML = tags[e];
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
  saveButton.setAttribute('class', 'dcf-btn dcf-btn-primary dcf-w-100% sticky-btn dcf-mb-4');
  saveButton.innerHTML = "Save and Export Tags";
  document.getElementById('buttonCol').appendChild(saveButton);
}

function exportTags() {
  //Set up length of events loop
  var events = document.getElementsByClassName("event-div");
  //Create Header
  var resultsHeader = document.createElement("H5");
  resultsHeader.innerHTML = "You just appended the following tags to these events:"
  document.getElementById('buttonCol').appendChild(resultsHeader);
  //Create Event Results Div
  /*var eventResults = document.createElement("DIV");
  eventResults.setAttribute('class', 'event-results dcf-mb-7 dcf-p-3 unl-bg-light-gray dcf-w-100%');
  eventResults.setAttribute('id', 'eventResults');
  document.getElementById('buttonCol').appendChild(eventResults);
  //Loop through the length of Events
  for (i = 0; i < events.length; i++) {
    //Grabs the text EventID of each Event
    var EventTitle = events[i].querySelector("h3").innerHTML;
    var EventSubtitle = events[i].querySelector("h4").innerHTML;
    var EventID = events[i].querySelector("h5").innerHTML;
    //Create Event Result Div
    var eventResult = document.createElement("DIV");
    eventResult.setAttribute('class', 'event-results dcf-mb-7 dcf-p-3 unl-bg-cream dcf-w-100%');
    eventResult.setAttribute('id', 'eventResult');
    document.getElementById('eventResults').appendChild(eventResult);
    //Get and Append Title, Subtitle and ID
    var eventSentence = document.createElement("P");
    eventSentence.innerHTML = EventTitle + " " + "(" + EventID + ")" + " " + "saved the tags:" + " ";
    document.getElementById('eventResult').appendChild(eventSentence);
    //Grabs each CheckBox Div inside of each event
    var CheckBoxes = events[i].getElementsByClassName("dcf-input-checkbox");
    //Loop through each CheckBox Div
    for (e = 0; e < CheckBoxes.length; e++) {
      //For each CheckBox Div Grab every Checkbox
      var CheckBoxesInput = CheckBoxes[e].getElementsByTagName("input");
      //For each CheckBox Div Grab every Label
      var labels = CheckBoxes[e].getElementsByTagName("label")[0].childNodes[0].nodeValue;
      console.log(CheckBoxesInput[e]);
      if (CheckBoxesInput[e].checked) {
        console.log(labels);
      }
    }
    //var CheckBoxName = ;
    //var CheckBoxStatus = ;
    //console.log(EventID, CheckBoxName, CheckBoxStatus);
  }*/
}
