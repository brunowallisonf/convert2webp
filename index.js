const sharp = require(`sharp`);
const fs = require(`fs`);
const { dirname, join } = require("path");
const { mkdir, readdir } = require("fs/promises");
const { exit } = require("process");

// console.log(process.argv);
// const INPUT_FOLDER = ;
// const OUTPUT_FOLDER = `./images`;

const handler = async () => {
  const args = process.argv;
  const inputParamIndex = args.findIndex((arg) => arg === "-i");
  const outputParamIndex = args.findIndex((arg) => arg === "-o");
  const inputPath =
    inputParamIndex >= 0 ? args[inputParamIndex + 1] : undefined;
  const outputPath =
    outputParamIndex >= 0 ? args[outputParamIndex + 1] : undefined;

  if (!inputPath || !outputPath) {
    console.log("No specified input or output, exiting with status 1...");
    exit(0);
  }
  try {
    const files = await readdir(join(__dirname, inputPath));
    try {
      await mkdir(`${join(__dirname, outputPath)}`);
    } catch (err) { }

    await Promise.all(
      files.map(async (file) => {
        const filename = file.split(".")[0];
        console.log(file)
        await sharp(`${join(__dirname, inputPath)}/${file}`)
          .toFormat("webp")
          .toFile(`${join(__dirname, outputPath)}/${filename}.webp`);
      })
    );
  } catch (err) {
    console.log("err", err)
    exit(1);
  }
};

handler();
