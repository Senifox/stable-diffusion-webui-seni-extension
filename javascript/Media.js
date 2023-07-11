function PlayAudio(path)
{
  var ValidUrl = ValidateURL(path);
  if (!ValidUrl)
    return;

  try
  {
    var options = GetSeniOptions();
    var audio = new Audio(path);
    var volume = options.PlayAudioOnProgressCompleteVolume / 100;
    audio.volume = volume;
    audio.play();
  }
  catch (error)
  {
    console.error('Es ist ein Fehler aufgetreten: ' + error.message);
  }
}