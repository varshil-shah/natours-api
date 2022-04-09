const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   superagent
//     .get(
//       `https://dog.ceo/api/breed/${data.substring(
//         0,
//         data.length - 2
//       )}/images/random`
//     )
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       fs.writeFile('dog-url.txt', res.body.message, (err) => {
//         console.log(`File saved!`);
//       });
//     });
// });

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  superagent
    .get(
      `https://dog.ceo/api/breed/${data.substring(
        0,
        data.length - 2
      )}/images/random`
    )
    .then((res) => {
      fs.writeFile('dog-url.txt', res.body.message, (err) => {
        if (err)
          return console.log(
            `Error occured while writing file - ${err.message}`
          );
        console.log(`File saved!`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
