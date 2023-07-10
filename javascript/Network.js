function HttpGetRequest(url, handler, errorHandler)
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState !== 4)
      return;

    if (xhr.status !== 200)
      return errorHandler();

    try
    {
      var js = JSON.parse(xhr.responseText);
      handler(js);
    }
    catch (error)
    {
      console.error(error);
      errorHandler();
    }
    

    // if (xhr.readyState === 4)
    // {
    //   if (xhr.status === 200)
    //   {
    //     try
    //     {
    //       var js = JSON.parse(xhr.responseText);
    //       handler(js);
    //     }
    //     catch (error)
    //     {
    //       console.error(error);
    //       errorHandler();
    //     }
    //   }
    //   else
    //   {
    //     errorHandler();
    //   }
    // }
  };
  xhr.send();
}

function HttpPostRequest(url, data, handler, errorHandler)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState !== 4)
      return;

    if (xhr.status !== 200)
      return errorHandler();

    try
    {
      var js = JSON.parse(xhr.responseText);
      handler(js);
    }
    catch (error)
    {
      console.error(error);
      errorHandler();
    }
  };
  var js = JSON.stringify(data);
  xhr.send(js);
}

// function HttpRequest(method, url, data, handler, errorHandler)
// {

// }

