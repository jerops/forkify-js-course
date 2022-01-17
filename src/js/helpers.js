//HELPERS.JS contain fn that we use all the time everywher in the project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

//return a new promise that will reject if not fullfill
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//refactor
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
// //fn to get .json
// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     //we create a race for the timeout and the getJSON fn
//     const res = await Promise.race([fetchPro, timeout(`${TIMEOUT_SEC}`)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// //fn to send .json
// export const sendJSON = async function (url, uploadData) {
//   try {
//     console.log(uploadData);
//     //pass url and the object to upload
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       //payload = data
//       body: JSON.stringify(uploadData),
//     });

//     //we create a race for the timeout and the getJSON fn
//     const res = await Promise.race([fetchPro, timeout(`${TIMEOUT_SEC}`)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
