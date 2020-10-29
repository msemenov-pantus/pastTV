let url = "C:\\Users\\semenov\\Desktop\\test\\pantusNuxt";
const fs = require("fs");
let document = ["components"];
const path = require('path')



function getFile(pathFile, element , pathIndex){
    catalogName =  fs.readdirSync(pathFile); // Название файла
    let catalogPath =  fs.readdirSync(pathFile).map(fileName => { // Путь к файлу
        return path.join(pathFile, fileName);
    })
    for (const key in catalogPath) {
        if(catalogName[key] == "README.md"){
            continue;
        }
        let res = path.resolve(catalogPath[key]);
        fs.stat(res, (err, file) =>{// Смотрим в папку или файл
            if(file.isDirectory()){ // Проверяем если ли папки в папке
                // getFile(res, element,pathIndex ,pathIndex);
            } 
        })

        let name =  GenetatorName(catalogPath[key], pathIndex); // Создание нового имени
        let nameSearchNews = resetData(name, pathIndex.length);
        let catalogPathSearch  = resetData(catalogPath[key], pathIndex.length);
        if(key == 1){
            console.log("1");
            SearchFile(catalogPathSearch, nameSearchNews,pathIndex);
        }
    }
}

function SearchFile(search,  replace, pathFile){
    let catalogPath =  fs.readdirSync(pathFile).map(fileName => { // Путь к файлу
        return path.join(pathFile, fileName);
    })

    for (const key in catalogPath) {
        fs.stat(catalogPath[key], (err, file) =>{
            if(file.isFile()){
                fs.readFile(catalogPath[key], "utf8" , (err, data)=>{
                    fs.writeFile("../index.js", data);
                });
                 
            }
        });
        let res = path.resolve(catalogPath[key]);
        fs.stat(res, (err, file) =>{// Смотрим в папку или файл
            if(file.isDirectory()){ // Проверяем это  папка
                SearchFile(search, replace,res);
            } 
        })
    }
}

function resetData(str ,length){
    return str.slice(length + 1);
}
function GenetatorName(catalogPath, pathFile){
    let name;
    name = resetData(catalogPath, pathFile.length);
    name = PathArray(name);// Массив элементов пути
    name = StrtoLowerCase(name); // Обработка 1 символа 
    name = StrToUpperCaseCase(name); // ПОиск заглавных букв и в нижний регистр их + "-"
    name = PathString(name);// Перенос в строку
    name = pathFile + "\\" + name;
    return name;
}
function PathArray(str){
    return  str.split("\\");
}
function PathString(arr){
    return arr.join("\\");
}
function NameString(str){
    // console.log(String(str.replace(/\\/g, "/")));
}
function StrtoLowerCase(str){
    str.forEach((element, index) => {
        str[index] = element[0].toLowerCase() + element.slice(1); 
    });
    return str;
}
function StrToUpperCaseCase(str){
    str.forEach((element, index) => {
        for (const key in element) {
            if(element[key].toUpperCase() == element[key] && element[key] != "." && element[key] != "-"){
                str[index] = element.slice(0 , key) + "-" + element[Number(key)].toLowerCase() + element.slice(Number(key)+1 , element.length)
            }
        } 
    });
    return str;
}

document.forEach(element => {
    let path = url + "\\" + element;
    getFile(path,element , path);
});
