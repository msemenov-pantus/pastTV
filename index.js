let url = "C:\\Users\\semenov\\Desktop\\test\\pantusNuxt";
const fs = require("fs");
let document = ["components" ,"mixins"];
let SeacrhElement = ["components" ,"mixins", "layouts", "pages"];
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
        fs.stat(catalogPath[key], (err, file) =>{
            if(file.isDirectory()){ // Проверяем если ли папки в папке
                let res = path.resolve(catalogPath[key]);
                getFile(res, element,pathIndex ,pathIndex);
            }else  if(file.isFile()) {
                let name =  GenetatorName(catalogPath[key], pathIndex); // Создание нового имени
                let nameSearchNews = resetData(name, pathIndex.length);
                nameSearchNews = NameString(nameSearchNews);
                let catalogPathSearch  = resetData(catalogPath[key], pathIndex.length);
                catalogPathSearch = NameString(catalogPathSearch);
                SeacrhElement.forEach(elements => {
                    let path = url + "\\" + elements;
                    SearchFile(catalogPathSearch, nameSearchNews,path, element);  
                });
                // fs.renameSync(catalogPath[key], name);
            }   
        }) 
         // Создание нового имени;
    }
}

function SearchFile(search,  replace, pathFile, element){
    // console.log(search);
    let catalogPath =  fs.readdirSync(pathFile).map(fileName => { // Путь к файлу
        return path.join(pathFile, fileName);
    })
    for (const key in catalogPath) {
        fs.stat(catalogPath[key], (err, file) =>{
            if(file.isFile()){
                let searchName;
                let replaceName; 
                if(element != "store"){ //  не Папка store
                    searchName = `@/${element}/${search}`;
                    replaceName = `@/${element}/${replace}`;
                    if(element == "components"){ // Это файл .vue
                        searchName = searchName.substring(0, searchName.length - 4);
                        replaceName = replaceName.substring(0, replaceName.length - 4);
                    }else{
                        searchName = searchName.substring(0, searchName.length - 3);
                        replaceName = replaceName.substring(0, replaceName.length - 3);   
                    }
                    GoDataReset(catalogPath[key] , searchName, replaceName);
                }
            }
        });
        let res = path.resolve(catalogPath[key]);
        fs.stat(res, (err, file) =>{// Смотрим в папку или файл
            if(file.isDirectory()){ // Проверяем это  папка
                SearchFile(search, replace,res, element);
            } 
        })
    }
}

function ReNameFile(pathFile, element , pathIndex){
    catalogName =  fs.readdirSync(pathFile); // Название файла
    let catalogPath =  fs.readdirSync(pathFile).map(fileName => { // Путь к файлу
        return path.join(pathFile, fileName);
    })
    for (const key in catalogPath) {
        if(catalogName[key] == "README.md"){
            continue;
        }
        fs.stat(catalogPath[key], (err, file) =>{
            let name =  GenetatorName(catalogPath[key], pathIndex); // Создание нового имени
            fs.renameSync(catalogPath[key], name); 
            if(file.isDirectory()){ // Проверяем если ли папки в папке
                let res = path.resolve(name);
                getFile(res, element,pathIndex ,pathIndex);
            }
        }) 
         // Создание нового имени;
    }
}
function GoDataReset(file, search,replace){
    var text = fs.readFileSync(file, 'utf8');
    let RegExp1  = new RegExp(search, "gi"); 
    let textNews = text.replace(RegExp1, replace);
    fs.writeFileSync(file, textNews);  
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
    // console.log(String(str.replace(/\\/g, "/")) );
    return String(str.replace(/\\/g, "/"))
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
document.forEach(element => {
    let path = url + "\\" + element;
    ReNameFile(path,element , path);
});

 
