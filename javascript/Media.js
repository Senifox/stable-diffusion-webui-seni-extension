function PlayAudio(path)
{
  var ValidUrl = ValidateURL(path);
  if (!ValidUrl)
    return;

  try
  {
    var audio = new Audio(path);
    audio.volume = 0.5;
    audio.play();
  }
  catch (error)
  {
    console.error('Es ist ein Fehler aufgetreten: ' + error.message);
  }
}