import { TIMEOUT_SEC } from './config';

/**
 * Will reject promise after a timeout.
 * @param {number} s seconds that we want this promise to reject after
 * @returns {Promise}
 * @author Anik Paul
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Load or send the recipe data according to the condition and throw a manual error.
 * @param {string} url the url to be sent to api
 * @param {undefined} [uploadData = undefined] the new recipe object
 * @returns {Promise}
 * @author Anik Paul
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
