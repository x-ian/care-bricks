function onLoadSummary() {
  db.flow_sessions.get(1, function (f) {
    $('#input-label').contents().last().replaceWith(f.patient.name.givenName + " " + f.patient.name.familyName);
    $('#summary').append('<pre>' + JSON.stringify(f.patient, null, 2) + '</pre>');
  });

}
