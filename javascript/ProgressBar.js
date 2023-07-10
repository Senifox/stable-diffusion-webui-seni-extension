// code related to showing and updating progressbar shown as the image is being made

function rememberGallerySelection()
{
  console.log("Executing rememberGallerySelection()");
}

function getGallerySelectedIndex()
{
  console.log("Executing getGallerySelectedIndex()");
}

function request(url, data, handler, errorHandler)
{
  console.log("request() function was called!");
  HttpPostRequest(url, data, handler, errorHandler);
}

function randomId()
{
  return GetRandomTaskId();
}

// starts sending progress requests to "/internal/progress" uri, creating progressbar above progressbarContainer element and
// preview inside gallery element. Cleans up all created stuff when the task is over and calls atEnd.
// calls onProgress every time there is a progress update
function requestProgress(id_task, progressbarContainer, gallery, atEnd, onProgress, inactivityTimeout = 40)
{
  console.log(":3");
  Main(id_task, progressbarContainer, gallery, atEnd, onProgress, inactivityTimeout);
}

//#region CreateAndRemoveProgressbarElements

function CreateProgressBar(taskId, container, gallery, onEnd, onProgress, inactivityTimeout)
{
  var selectedTab = GetCurrentSelectedTab();
  var hidden = (selectedTab == "Extensions");

  var parentProgressbar = container.parentNode;
  var parentGallery = gallery ? gallery.parentNode : null;
  
  var divProgress = CreateElementDivProgress();
  var divInner = CreateElementDivInner();
  // TextInfo SecondsFromStart ProgressPercent SamplingSteps RemainingTime ETA SecondsPerStep
  var spanTextInfo = CreateElementSpan("TextInfo", "ProgressBarDetailValue");
  var spanSecondsFromStart = CreateElementSpan("SecondsFromStart", "ProgressBarDetailValue");
  var spanProgressPercent = CreateElementSpan("ProgressPercent", "ProgressBarDetailValue");
  var spanETA = CreateElementSpan("ETA", "ProgressBarDetailValue");
  var spanSamplingSteps = CreateElementSpan("SamplingSteps", "ProgressBarDetailValue");
  var spanRemainingTime = CreateElementSpan("RemainingTime", "ProgressBarDetailValue");
  var spanSecondsPerStep = CreateElementSpan("SecondsPerStep", "ProgressBarDetailValue");

  // TextInfo
  var TextInfoContainerSpan = CreateElementSpan("TextInfoContainer", "ProgressBarDetail");
  var img = CreateElementImg("SeniImgTextInfo", "SeniImg", "http://senifox.de/Icons/info.svg");
  TextInfoContainerSpan.appendChild(img);
  TextInfoContainerSpan.appendChild(spanTextInfo);
  divInner.appendChild(TextInfoContainerSpan);

  // SecondsFromStart
  var outerSpan = CreateElementSpan("SecondsFromStartContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgSecondsFromStart", "SeniImg", "http://senifox.de/Icons/caret-right.svg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanSecondsFromStart);
  divInner.appendChild(outerSpan);

  // ProgressPercent
  outerSpan = CreateElementSpan("ProgressPercentContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgProgressPercent", "SeniImg", "http://senifox.de/Icons/MissingTexture.jpg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanProgressPercent);
  divInner.appendChild(outerSpan);

  // SamplingSteps
  if (hidden)
    outerSpan = CreateElementSpan("SamplingStepsContainer", "ProgressBarDetail hidden");
  else
    outerSpan = CreateElementSpan("SamplingStepsContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgSamplingSteps", "SeniImg", "http://senifox.de/Icons/layers.svg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanSamplingSteps);
  divInner.appendChild(outerSpan);

  // RemainingTime
  outerSpan = CreateElementSpan("RemainingTimeContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgRemainingTime", "SeniImg", "http://senifox.de/Icons/time-quarter-before.svg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanRemainingTime);
  divInner.appendChild(outerSpan);

  // ETA
  outerSpan = CreateElementSpan("ETAContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgETA", "SeniImg", "http://senifox.de/Icons/calendar-clock.svg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanETA);
  divInner.appendChild(outerSpan);

  // SecondsPerStep
  if (hidden)
    outerSpan = CreateElementSpan("SecondsPerStepContainer", "ProgressBarDetail hidden");
  else
    outerSpan = CreateElementSpan("SecondsPerStepContainer", "ProgressBarDetail");
  img = CreateElementImg("SeniImgSecondsPerStep", "SeniImg", "http://senifox.de/Icons/dashboard.svg");
  outerSpan.appendChild(img);
  outerSpan.appendChild(spanSecondsPerStep);
  divInner.appendChild(outerSpan);
  
  divProgress.appendChild(divInner);
  parentProgressbar.insertBefore(divProgress, container);

  var livePreview = CreateElementParentGallery(gallery);

  const DateNull = new Date(null);
  var DateFirstStep = DateNull;
  
  var StatusValues =
  {
    "DateNull": DateNull
    , "DateStart": new Date()
    , "DateFirstStep": DateFirstStep
    , "WasEverActive": false
    , "SamplingStep": 0
    , "SamplingSteps": 0
    , "ProgressPercent": ""
    , "RemainingTime": ""
    , "TextInfo": ""
    , "ETA": ""
    , "SecondsFromStart": 0
    , "SecondsFromFirstStep": 0
    , "SecondsPerStep": 0
    , "ElapsedFromStart": 0
  };

  var ProgressbarContainer = 
  {
      "TaskId": taskId
    , "SelectedTab": selectedTab
    , "Container": container
    , "Gallery": gallery
    , "OnEnd": onEnd
    , "OnProgress": onProgress
    , "InactivityTimeout": inactivityTimeout
    , "ParentProgressbar": parentProgressbar
    , "ParentGallery": parentGallery
    , "DivProgress": divProgress
    , "DivInner": divInner
    , "LivePreview": livePreview
    , "TextInfoContainerSpan": TextInfoContainerSpan
    , "SpanTextInfo": spanTextInfo
    , "SpanSecondsFromStart": spanSecondsFromStart
    , "SpanProgressPercent": spanProgressPercent
    , "SpanSamplingSteps": spanSamplingSteps
    , "SpanRemainingTime": spanRemainingTime
    , "SpanETA": spanETA
    , "SpanSecondsPerStep": spanSecondsPerStep
    , "StatusValues": StatusValues
  };
  
  return ProgressbarContainer;
}

function CreateElementParentGallery(gallery)
{
  var parentGallery = gallery ? gallery.parentNode : null;
  if (!parentGallery)
  return;

  console.log("Createing LivePreview...");
  var livePreview = document.createElement('div');
  livePreview.className = 'livePreview';
  parentGallery.insertBefore(livePreview, gallery);
  
  return livePreview;
}

function CreateElementDivProgress()
{
  var divProgress = document.createElement('div');
  divProgress.className = 'progressDiv';
  divProgress.style.display = opts.show_progressbar ? "block" : "none";
  
  return divProgress;
}

function CreateElementDivInner()
{
  var divInner = document.createElement('div');
  divInner.className = 'progress';
  
  return divInner;
}

function CreateElementSpan(id, className)
{
  var span = document.createElement('span');
  span.className = className;
  span.id = id;
  return span;
}

function CreateElementImg(id, className, source)
{
  var img = document.createElement('img');
  img.className = className;
  img.id = id;
  img.src = source;
  return img;
}

// data:image/png;base64,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 ....

function RemoveProgressBar(ProgressbarContainer)
{
  console.log("Removing Progressbar...");
  PlayAudioSuccess();
  // ResetProgressBarValues();
  FormatAndSetTabTitle("");
  
  ProgressbarContainer.ParentProgressbar.removeChild(ProgressbarContainer.DivProgress);
  if (ProgressbarContainer.ParentGallery)
  ProgressbarContainer.ParentGallery.removeChild(ProgressbarContainer.LivePreview);
  ProgressbarContainer.OnEnd();
  // alert("Progress finished.")
}

//#endregion CreateAndRemoveProgressbarElements

//#region SetStatus

function SetStatusTextTitle(StatusValues)
{
  const ProgressTextTemplate = "{TextInfo} {SecondsFromStart} {ProgressPercent} ({SamplingStep} / {SamplingSteps}) - Remaining: {RemainingTime} - ETA: {ETA} {SecondsPerStep}"; 
  let progressText = FormatStatusText(ProgressTextTemplate, StatusValues);
  FormatAndSetTabTitle(progressText);
}

function SetStatusTextProgressBar(ProgressbarContainer)
{
  ProgressbarContainer.SpanTextInfo.innerText = ProgressbarContainer.StatusValues.TextInfo;
  ProgressbarContainer.SpanSecondsFromStart.innerText = FormatSecondsToTime(ProgressbarContainer.StatusValues.SecondsFromStart);
  ProgressbarContainer.SpanProgressPercent.innerText = ProgressbarContainer.StatusValues.ProgressPercent;
  ProgressbarContainer.SpanSamplingSteps.innerText = ProgressbarContainer.StatusValues.SamplingStep + " / " + ProgressbarContainer.StatusValues.SamplingSteps;
  ProgressbarContainer.SpanRemainingTime.innerText = ProgressbarContainer.StatusValues.RemainingTime;
  ProgressbarContainer.SpanETA.innerText = ProgressbarContainer.StatusValues.ETA;
  ProgressbarContainer.SpanSecondsPerStep.innerText = ProgressbarContainer.StatusValues.SecondsPerStep;
}

function SetStatusText(ProgressbarContainer)
{
  SetStatusTextProgressBar(ProgressbarContainer);
  SetStatusTextTitle(ProgressbarContainer.StatusValues);
}

/**
 * Formats the progress and sets the tab title accordingly. The title will be updated only if the options allow showing
 * progress in the title and a valid progress value is provided. Otherwise the default value of "Stable Diffusion" is set.
*
* @param {string} progress - The progress to be formatted and included in the tab title.
*/
function FormatAndSetTabTitle(progress)
{
  var title = "";

  if (opts.show_progress_in_title && progress)
    title = "[" + progress.trim() + "] Stable Diffusion";

  SetTabTitle(title);
}

function FormatStatusText(Text, StatusValues)
{
  Text = Text.replace("{ProgressPercent}", StatusValues.ProgressPercent);
  Text = Text.replace("{SamplingStep}", StatusValues.SamplingStep);
  Text = Text.replace("{SamplingSteps}", StatusValues.SamplingSteps);
  Text = Text.replace("{RemainingTime}", StatusValues.RemainingTime);
  Text = Text.replace("{ETA}", StatusValues.ETA);
  Text = Text.replace("{SecondsPerStep}", StatusValues.SecondsPerStep);
  Text = Text.replace("{SecondsFromStart}", FormatSecondsToTime(StatusValues.SecondsFromStart));
  Text = Text.replace("{TextInfo}", StatusValues.TextInfo);
  return Text;
}

//#endregion SetStatus

//#region InternalProgress

function RequestInternalProgress(ProgressbarContainer, IdLivePreview)
{
  const url = "./internal/progress";
  var data =
  {
    "id_task": ProgressbarContainer.TaskId
    , "id_live_preview": IdLivePreview
  };
  // console.log("RequestInternalProgress: ", data);
  var resultHandler = function(res)
  {
    InternalProgressResult(ProgressbarContainer, res);
  }
  var errorHandler = function()
  {
    InternalProgressError(ProgressbarContainer);
  }

  HttpPostRequest(url, data, resultHandler, errorHandler);
}

function InternalProgressResult(ProgressbarContainer, Result)
{
  // console.log("InternalProgressResult: ", Result);
  const DateTimeFormatOptions =
  {
    day: '2-digit', // Tag des Monats mit 2 Ziffern (z.B. "30")
    month: '2-digit', // Monat mit 2 Ziffern (z.B. "06")
    hour: '2-digit', // Stunde mit 2 Ziffern (z.B. "17")
    minute: '2-digit', // Minute mit 2 Ziffern (z.B. "42")
    second: '2-digit' // Sekunde mit 2 Ziffern (z.B. "53")
  };
  var RefreshPeriod = opts.live_preview_refresh_period || 500;


  
  
  if (Result.completed)
  return RemoveProgressBar(ProgressbarContainer);
  
  var rect = ProgressbarContainer.Container.getBoundingClientRect();
  
  if (rect.width)
  ProgressbarContainer.DivProgress.style.width = rect.width + "px";
  
  
  ProgressbarContainer.DivInner.style.width = ((Result.progress || 0) * 100.0) + '%';
  ProgressbarContainer.DivInner.style.background = Result.progress ? "" : "transparent";
  
  if (Result.progress > 0)
  ProgressbarContainer.StatusValues.ProgressPercent =  ((Result.progress || 0) * 100.0).toFixed(0) + '%'; 
  
  if (Result.eta)
  {
    ProgressbarContainer.StatusValues.RemainingTime = FormatSecondsToTime(Result.eta);
    var currentDate = new Date();
    ProgressbarContainer.StatusValues.ETA = new Date(currentDate.getTime() + (Result.eta * 1000)).toLocaleString('de-DE', DateTimeFormatOptions);
  }

  if (Result.textinfo && Result.textinfo.indexOf("\n") == -1)
    ProgressbarContainer.StatusValues.TextInfo = Result.textinfo;
  else
    ProgressbarContainer.StatusValues.TextInfo = "";

  // divInner.textContent = progressText;
    
  ProgressbarContainer.StatusValues.ElapsedFromStart = (new Date() - ProgressbarContainer.StatusValues.DateStart) / 1000;
  ProgressbarContainer.StatusValues.SecondsFromStart = ProgressbarContainer.StatusValues.ElapsedFromStart.toFixed(0);

  if (Result.active)
  {
    ProgressbarContainer.StatusValues.WasEverActive = true;

    // Call GET Progress
    HttpGetRequest("./sdapi/v1/progress?skip_current_image=false", function(Result)
    {
      // console.log("Progress API: ", Result);
      ProgressbarContainer.StatusValues.SamplingStep = Result.state.sampling_step;
      ProgressbarContainer.StatusValues.SamplingSteps = Result.state.sampling_steps;
      if (ProgressbarContainer.StatusValues.DateFirstStep === ProgressbarContainer.StatusValues.DateNull && ProgressbarContainer.StatusValues.SamplingStep > 0)
      {
        ProgressbarContainer.StatusValues.DateFirstStep = new Date();
        console.log("First Step: ", ProgressbarContainer.StatusValues.DateFirstStep)
      }
      else if (ProgressbarContainer.StatusValues.SamplingStep > 1)
      {
        ProgressbarContainer.StatusValues.SecondsFromFirstStep = ((new Date() - ProgressbarContainer.StatusValues.DateFirstStep) / 1000); //.toFixed(2)
        ProgressbarContainer.StatusValues.SecondsPerStep = (ProgressbarContainer.StatusValues.SecondsFromFirstStep / (ProgressbarContainer.StatusValues.SamplingStep - 1)).toFixed(2);
      }
      
      SetStatusText(ProgressbarContainer);
    });
  }

  if ((!Result.active && ProgressbarContainer.StatusValues.WasEverActive) || (ProgressbarContainer.StatusValues.ElapsedFromStart > ProgressbarContainer.InactivityTimeout && !Result.queued && !Result.active))
  return RemoveProgressBar(ProgressbarContainer);
  
  if (Result.live_preview && ProgressbarContainer.Gallery)
  {
    rect = ProgressbarContainer.Gallery.getBoundingClientRect();
    if (rect.width)
    {
      ProgressbarContainer.LivePreview.style.width = rect.width + "px";
      ProgressbarContainer.LivePreview.style.height = rect.height + "px";
    }
    
    var img = new Image();
    img.onload = function()
    {
      ProgressbarContainer.LivePreview.appendChild(img);
      if (ProgressbarContainer.LivePreview.childElementCount > 2)
        ProgressbarContainer.LivePreview.removeChild(ProgressbarContainer.LivePreview.firstElementChild);
    };
    img.src = Result.live_preview;
  }

  if (ProgressbarContainer.OnProgress)
  {
    console.log("Executing OnProgress: ", ProgressbarContainer.OnProgress);
    ProgressbarContainer.OnProgress(Result);
  }
  
  setTimeout(() =>
  {
    RequestInternalProgress(ProgressbarContainer, Result.id_live_preview)
  }, RefreshPeriod);
}

function InternalProgressError(ProgressbarContainer)
{
  console.log("InternalProgressErrorHandler");
  RemoveProgressBar(ProgressbarContainer);
}

//#endregion InternalProgress

function PlayAudioSuccess()
{
  var Options = GetSeniOptions();
  if (Options.PlayAudioOnProgressComplete)
    PlayAudio(Options.PlayAudioOnProgressCompletePath);
}

function Main(TaskId, Container, Gallery, OnEnd, OnProgress, InactivityTimeout)
{
  try
  {
    var ProgressbarContainer = CreateProgressBar(TaskId, Container, Gallery, OnEnd, OnProgress, InactivityTimeout);
    console.log("Progressbar initialized: ", ProgressbarContainer);

    RequestInternalProgress(ProgressbarContainer, 0);
  }
  catch (error)
  {
    console.error("Error catched in Main function: ", error);
  }
}


// class SeniProgressBar
// {
//   constructor(marke, modell) {
//     this.marke = marke;
//     this.modell = modell;
//     this.#kilometerstand = 0;
//   }
// }

// class Auto {
  //   #kilometerstand;
  
  //   constructor(marke, modell) {
    //     this.marke = marke;
    //     this.modell = modell;
    //     this.#kilometerstand = 0;
    //   }
    
    //   fahre(kilometer) {
      //     this.#kilometerstand += kilometer;
      //     console.log(`Das Auto ${this.marke} ${this.modell} fährt.`);
      //   }

//   get kilometerstand() {
//     return this.#kilometerstand;
//   }

//   set kilometerstand(kilometer) {
//     if (kilometer < this.#kilometerstand) {
//       throw new Error('Man kann den Kilometerstand nicht zurückdrehen!');
//     }
//     this.#kilometerstand = kilometer;
//   }
// }

// let meinAuto = new Auto('Toyota', 'Corolla');
// meinAuto.fahre(150);
// console.log(meinAuto.kilometerstand); // Gibt aus: 150
// meinAuto.kilometerstand = 200;
// console.log(meinAuto.kilometerstand); // Gibt aus: 200
