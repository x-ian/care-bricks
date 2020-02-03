function onLoadSummary() {
  console.log(('1'));
  db.flow_sessions.get(1, function (firstFriend) {
    alert ("Friend with id 1: " + firstFriend.patient.name.familyName);

  });

}
