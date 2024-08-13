import {exec} from "child_process";
import path from "path";
import fs from "fs";
import { AwsService } from "./service/AwsService";

async function init(){
    console.log("Starting the build process....");

    const code_dir = path.join(__dirname,"../output");
    console.log(code_dir);
    const files = fs.existsSync(code_dir);
    console.log(files === true ? "The directory exists" : "The directory doesnot exits");
    const build_process = exec(`cd ${code_dir} && npm install && npm run build`); 

    build_process.stdout?.on('data',(data) => {
        console.log("Data " + data.toString());
    });

    build_process.stdout?.on('error',(data) => {
        console.log("Error",data.toString());
    })

    build_process.on('close',() => {
        console.log("Build process completed");
        const build_dir = path.join(code_dir,"dist");
        console.log("build_dir -> " + build_dir);
        const filesArray = fs.readdirSync(build_dir,{recursive : true});
        console.log(filesArray);

        filesArray.filter(file => {
            if(file.includes('.')){
                return true;
            }
            return false;
        }).forEach(file =>{
            const fllePath = path.join(build_dir,file as string);
            console.log(fllePath + " being uploaded");
            AwsService.getInstance().upload(fllePath);
        });
    })
}

init();