const sharp = require(`sharp`)
const fs = require(`fs`);
const { dirname } = require("path");
const gm = require(`gm`).subClass({imageMagick:true});
const INPUT_FOLDER = `/home/bruno/Pictures/categories`
const OUTPUT_FOLDER = `./images`




console.warn(`Start Converting files...`)
const files = fs.promises.readdir(`/home/bruno/Pictures/categories`).then(async files =>{
    files.map(async file=> {
        const filename = file.split(".")[0]

        await sharp(`${INPUT_FOLDER}/${file}`).toFormat("webp").toFile(`${OUTPUT_FOLDER}/${filename}.webp`)
    })
});


console.log(`Conversion terminated sucessfully `)

