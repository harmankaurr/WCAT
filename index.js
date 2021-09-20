#!/usr/bin/env node


const fs = require("fs"); //import statement
let arguments = process.argv.slice(2);
// console.log(arguments);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0]=="$"){
        secondaryArguments.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}



for(let file of filenames){
    let filedata = fs.readFileSync(file, "utf-8");
    for(let flag of flags){
        if(flag=="-rs"){ // remove spaces
            filedata = filedata.split(" ").join("");
        }
        if(flag == "-rn"){ //remove new lines
            filedata = filedata.split("\r\n").join("");
        }
        if(flag=='-rsc'){ //remove special characters
        //     let tempstring = "";
        //    for(let charac of filedata){
        //         if((charac.charCodeAt(0)>=65 && charac.charCodeAt(0)<=90) || (charac.charCodeAt(0)>=97 && charac.charCodeAt(0)<=122) ){
        //             tempstring+=charac;
        //         }
        //    }
        //    filedata=tempstring;

        for(let secArgs of secondaryArguments){
            filedata = filedata.split(secArgs).join("");
        }
        
        }
        if(flag=='-s'){
            let f = addNumbering(filedata);
            console.log(f);
        }
        if(flag=='-sn'){
            let fn = addNumbering2ne(filedata);
            console.log(fn);
        }
        if(flag=='rel'){
            let rl = removeExtraLine(filedata);
            for(let i = 0; i<rl.length; i++){
                console.log(rl[i]);
            }

        }
        
    }
    console.log(filedata);

    
}

function addNumbering(content){
    let contentArr= content.split("\n");
    for(let i = 0; i<contentArr.length; i++){
        contentArr[i] = (i+1)+" "+ contentArr[i];
    }
    return contentArr;
}

function addNumbering2ne(content){
    let contentArr = content.split("\n");
    let count = 1;
    for(let i= 0; i<contentArr.length; i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
    return contentArr;
}

function removeExtraLine(filedata){
    let contentArr = filedata.split("\n");
    let data = [];
    for(let i = 1; i<contentArr.length; i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i] = null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }

    for(let i = 0; i<contentArr.length; i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;

}

//number lines
//harr line ke aage number









