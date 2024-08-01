/* 1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.*/

import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      name: "link",
      message: "Enter a URL to generate a QR code for: ",
    },
  ])
  .then((answers) => {
    console.log(answers.link);
    var qr_svg = qr.image(`${answers.link}`, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(`qrimage.png`));
    fs.writeFile("link.txt",`${answers.link}`, (err)=>{
        if (err) throw err;
        console.log(err);
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
