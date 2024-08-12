import {exec} from "child_process";
import path from "path";
import fs from "fs";
import { AwsService } from "./service/AwsService";

async function init(){
    console.log("Starting the build process");

    // Code for building the project.
    const code_dir = path.join(__dirname,"../output");
    const build_process = exec(`cd ${code_dir} && npm install && npm run build`); 
       
    build_process.stdout?.on('data',(data) => {
        console.log(data.toString());
    });

    build_process.stdout?.on('error',(data) => {
        console.log("Error",data.toString());
    })

    build_process.on('close',() => {
        console.log("Build process completed");
        const buld_dir = path.join(code_dir,"dist");
        const filesArray = fs.readdirSync(buld_dir,{recursive : true});
        filesArray.filter(file => fs.statSync(file).isFile()).forEach(file => {
            AwsService.getInstance().upload(file);
        });
    })
}

init();