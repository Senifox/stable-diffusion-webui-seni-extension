function GetSeniOptions()
{
  var SeniOptions =
  {
      "PlayAudioOnProgressComplete": opts.seni_PlayAudioOnProgressComplete
    , "PlayAudioOnProgressCompletePath": opts.seni_PlayAudioOnProgressCompletePath
    , "PlayAudioOnProgressCompleteVolume": opts.seni_PlayAudioOnProgressCompleteVolume
  }
  console.log("SeniOptions: ", SeniOptions);
  return SeniOptions;
}