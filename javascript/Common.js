/**
 * Sets the title of the tab. If no title is provided, it defaults to "Stable Diffusion".
 *
 * @param {string} [title="Stable Diffusion"] - The title to be set for the tab.
 */
function SetTabTitle(title = "Stable Diffusion")
{
  if (document.title != title)
    document.title = title;
}

/**
 * Formats a number to ensure it has two digits. Throws an error if the number is greater than 99.
 *
 * @param {number} number - The number to be formatted.
 * @returns {string|number} - The formatted number as a string if it's less than 10, otherwise the original number.
 * @throws {Error} - Throws an error if the number is greater than 99.
 */
function FormatNumberWithTwoDigits(number)
{
  if (number < 10)
    return '0' + number;
  if (number > 99)
    throw new Error("A value greater than 99 is not allowed.");

  return number;
}

/**
 * Formats a given number of seconds into a time representation (hh:mm:ss or mm:ss). If the number of seconds is less than 60,
 * it returns the number followed by 's'.
 *
 * @param {number} secs - The number of seconds to be formatted.
 * @returns {string} - The formatted time representation in the format 'hh:mm:ss' or 'mm:ss' if the number of seconds is less than 3600.
 */
function FormatSecondsToTime(secs)
{
  if (secs > 3600)
    return FormatNumberWithTwoDigits(Math.floor(secs / 60 / 60)) + ":" + FormatNumberWithTwoDigits(Math.floor(secs / 60) % 60) + ":" + FormatNumberWithTwoDigits(Math.floor(secs) % 60);
  else if (secs > 60)
    return FormatNumberWithTwoDigits(Math.floor(secs / 60)) + ":" + FormatNumberWithTwoDigits(Math.floor(secs) % 60);

  return Math.floor(secs) + "s";
}

function ValidateURL(url)
{
  // Regex-Pattern für die URL-Validierung
  var pattern = /^(https?:\/\/)?([^\s]+\.[^\s]+).mp3$/i;
  
  return pattern.test(url);
}

function GetRandomTaskId()
{
  var randomId = "task(" + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + ")";
  console.log("Random Task ID: ", randomId);
  return randomId;
}

function GetCurrentSelectedTab()
{
  const element = document.querySelector('button.selected.svelte-1g805jl');

  if (element) {
    console.log(element.outerText);
    return element.outerText;
  } else {
    console.error('Das Element wurde nicht gefunden.');
  }
}