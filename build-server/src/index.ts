import {exec} from "child_process";
import path from "path";
import fs from "fs";
import { AwsService } from "./service/AwsService";

async function init(){
    console.log("Starting the build process");

    // Code for building the project.
    const code_dir = path.join(__dirname,"../output");
    const build_process = exec(`cd ${code_dir} && npm install && npm run build`,(error,stdout,stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`)
    });

    build_process.on('close',() => {
        console.log("Build process completed");
        const buld_dir = path.join(__dirname,"build");
        const filesArray = fs.readdirSync(buld_dir,{recursive : true});
        filesArray.filter(file => fs.statSync(file).isFile()).forEach(file => {
            AwsService.getInstance().upload(file);
        });
    })
}

init();