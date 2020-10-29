let url = "C:\\Users\\semenov\\Desktop\\test\\pantusNuxt";
const fs = require("fs");
let document = ["components"];
const path = require('path')



function getFile(pathFile, element , pathIndex){
    catalogName =  fs.readdirSync(pathFile); // Название файла
    let catalogPath =  fs.readdirSync(pathFile).map(fileName => { // Путь к файлу
        return path.join(pathFile, fileName);
    })
    // console.log(pathFile.length);
    for (const key in catalogPath) {
        if(catalogName[key] == "README.md"){
            continue;
        }
        let res = path.resolve(catalogPath[key]);
        fs.stat(res, (err, file) =>{// Смотрим в папку или файл
            if(file.isDirectory()){ // Проверяем если ли папки в папке
                getFile(res, element,pathIndex);
            } 
        })

        let name =  GenetatorName(catalogPath[key], catalogName[key], pathIndex); // Создание нового имени
        console.log(name);
        console.log(catalogPath[key]);
    }
}

function GenetatorName(catalogPath, catalogName, pathFile){
    let name;
    name = catalogPath.slice(pathFile.length + 1);
    name = PathArray(name);// Массив элементов пути
    name = StrtoLowerCase(name); // Обработка 1 символа 
    name = StrToUpperCaseCase(name); // ПОиск заглавных букв и в нижний регистр их + "-"
    name = PathString(name);// Перенос в строку
    name = pathFile + "\\" +name;
    return  name;
}
function PathArray(str){
    return  str.split("\\");
}
function PathString(arr){
    return arr.join("\\");
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