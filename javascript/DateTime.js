function DateDiff(dateStart, dateEnd)
{
  // Zeitstempel (in Millisekunden) der beiden Date-Objekte abrufen
  var timestamp1 = dateStart.getTime();
  var timestamp2 = dateEnd.getTime();

  // Die Differenz zwischen den Zeitstempeln berechnen
  var difference = timestamp2 - timestamp1;

  // Die Differenz in Sekunden, Minuten, Stunden usw. umrechnen
  var seconds = Math.floor(difference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  let Difference = {
    Days: days,
    Hours: hours % 24,
    Minutes: minutes,
    Seconds: seconds
  };
  return Difference;
}

function DateDiffMinutes(dateStart, dateEnd)
{
  var timestamp1 = dateStart.getTime();
  var timestamp2 = dateEnd.getTime();

  var difference = timestamp2 - timestamp1;

  var totalMinutes = Math.floor(difference / (1000 * 60));

  return totalMinutes;
}