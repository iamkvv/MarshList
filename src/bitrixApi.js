const Get = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }
}
const Post = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }
}

//метаданные всех списков
export function fetchLists(auth) {
    let addr = "rest/lists.get";
    let params = "&IBLOCK_TYPE_ID=lists"
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`

    return fetch(request, Get)
        .then(response => response.json());
}

//метаданные полей списка
export function getFields(auth, iblock_code) {
    let addr = "rest/lists.field.get";
    let params = `&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=${iblock_code}`
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`

    return fetch(request, Get)
        .then(response => response.json());
}

//создает список
export function addList(auth, iblockCode, nameList) {
    let addr = "rest/lists.add";
    let params = `&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=${iblockCode}&fields[NAME]=${nameList}`
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`

    return fetch(request, Post)
        .then(response => response.json());
}

//создать поля - сразу для обоих списков ML1 и TL1
export function addFields(auth) {
    let addr = "rest/lists.field.add";
    let arrAddr = [
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&fields[NAME]=Исполнитель&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=Ispolnitel&fields[SORT]=20`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&fields[NAME]=ID Исполнителя&fields[IS_REQUIRED]=Y&fields[TYPE]=N&fields[CODE]=Ispolnitel_Id&fields[SORT]=30`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&fields[NAME]=Дата&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=Date&fields[SORT]=40`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&fields[NAME]=Комментарий&fields[IS_REQUIRED]=N&fields[TYPE]=S&fields[CODE]=Comment&fields[SORT]=50`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&fields[NAME]=Расстояние&fields[IS_REQUIRED]=N&fields[TYPE]=N&fields[CODE]=Distance&fields[SORT]=60`,

        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Внешний ключ&fields[IS_REQUIRED]=Y&fields[TYPE]=N&fields[CODE]=FK&fields[SORT]=20`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Дата&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=TDate&fields[SORT]=30`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=ID Исполнителя&fields[IS_REQUIRED]=Y&fields[TYPE]=N&fields[CODE]=TIspolnitel_Id&fields[SORT]=40`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Исполнитель&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=TIspolnitelt&fields[SORT]=50`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=ID Компании&fields[IS_REQUIRED]=Y&fields[TYPE]=N&fields[CODE]=Company_Id&fields[SORT]=60`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Компания&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=Company&fields[SORT]=70`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Гис&fields[IS_REQUIRED]=N&fields[TYPE]=S&fields[CODE]=Gis&fields[SORT]=80`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Телефон&fields[IS_REQUIRED]=N&fields[TYPE]=S&fields[CODE]=Telephone&fields[SORT]=90`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=Задание&fields[IS_REQUIRED]=Y&fields[TYPE]=S&fields[CODE]=Task&fields[SORT]=100`,
        `https://${auth.domain}/${addr}?auth=${auth.token}&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=TL1&fields[NAME]=ID Задачи&fields[IS_REQUIRED]=N&fields[TYPE]=N&fields[CODE]=Task_Id&fields[SORT]=110`,
    ]
    try {
        return fetch(arrAddr[0])
            .then(d => fetch(arrAddr[1]))
            .then(d => fetch(arrAddr[2]))
            .then(d => fetch(arrAddr[3]))
            .then(d => fetch(arrAddr[4]))

            .then(d => fetch(arrAddr[5]))
            .then(d => fetch(arrAddr[6]))
            .then(d => fetch(arrAddr[7]))
            .then(d => fetch(arrAddr[8]))
            .then(d => fetch(arrAddr[9]))
            .then(d => fetch(arrAddr[10]))
            .then(d => fetch(arrAddr[11]))
            .then(d => fetch(arrAddr[12]))
            .then(d => fetch(arrAddr[13]))
            .then(d => fetch(arrAddr[14]))
    } catch (err) {
        return err
    }
}

//получает все данные списка
export function getListData(auth, iblock_code) {
    let addr = "rest/lists.element.get";
    let params = `&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=${iblock_code}`
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`

    return fetch(request, Get)
        .then(response => response.json());
}

//Все пользователи
export function getUsers(auth) {
    let addr = "rest/user.get";
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}`

    return fetch(request, Get)
        .then(response => response.json());
}

//Добавление Марш листа
export function addMarshList(auth, params) {
    let addr = "rest/lists.element.add"
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`
    return fetch(request, Post)
        .then(response => response.json())
}

//Удаление Марш листа
export function deleteMarshList(auth, elementid) {
    let addr = "rest/lists.element.delete";
    let params = `&IBLOCK_TYPE_ID=lists&IBLOCK_CODE=ML1&ELEMENT_ID=${elementid}`
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`
    return fetch(request, Get)
        .then(response => response.json());
}

//Обновление Марш листа
export function updateMarshList(auth, params) {

    let addr = "rest/lists.element.update"
    let request = `https://${auth.domain}/${addr}?auth=${auth.token}${params}`
    return fetch(request, Post)
        .then(response => response.json())
}