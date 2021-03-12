const sharp = require(`sharp`);
const fs = require(`fs`);
const { dirname, join } = require("path");
const { mkdir } = require("fs/promises");
const { exit } = require("process");


const handler = () => {
  const args = process.argv;
  const inputParamIndex = args.findIndex((arg) => arg === "-i");
  const outputParamIndex = args.findIndex((arg) => arg === "-o");
  const inputPath =
    inputParamIndex >= 0 ? args[inputParamIndex + 1] : undefined;
  const outputPath =
    outputParamIndex >= 0 ? args[outputParamIndex + 1] : undefined;

  if (!inputPath || !outputPath) {
    console.log("No specified input or output, exiting with status 1...");
    exit(1);
  }

  const files = fs.promises
    .readdir(join(__dirname, inputPath))
    .then(async (files) => {
      files.map(async (file) => {
        const filename = file.split(".")[0];
        try {
          await mkdir(`${join(__dirname, outputPath)}`);
        } catch (err) {}
        await sharp(`${join(__dirname, inputPath)}/${file}`)
          .toFormat("webp")
          .toFile(`${join(__dirname, outputPath)}/${filename}.webp`);
      });
    });
};

handler();
