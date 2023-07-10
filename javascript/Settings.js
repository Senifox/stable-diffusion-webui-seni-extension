function GetSeniOptions()
{
  var SeniOptions =
  {
      "PlayAudioOnProgressComplete": opts.seni_PlayAudioOnProgressComplete
    , "PlayAudioOnProgressCompletePath": opts.seni_PlayAudioOnProgressCompletePath
  }
  console.log("SeniOptions: ", SeniOptions);
  return SeniOptions;
}