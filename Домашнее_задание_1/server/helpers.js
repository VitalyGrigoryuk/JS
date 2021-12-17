const fs = require('fs');
const { get } = require('http');



const writeAllFromFile = (data) => new Promise((resolve, reject) => {
    fs.writeFile('./static/basker-goods.json', JSON.stringify(data), (err) => {
        if (err) {
            reject(err)
        } else {
            resolve(data);
        }
    })
});

const getAllFromFile = () => new Promise((resolve, reject) => {
    fs.readFile('./static/basker-goods.json', 'utf8', (err, data) => {
        if (err) {
            reject;
        } else {
            resolve(JSON.parse(data));
        }
    })
});

addGood = (id) => new Promise((resolve, reject) => {
    try {
        getAllFromFile().then((_items) => {
            let items = [..._items];
            if (
                items.some((item) => {
                    return item.id == id;
                })
            ) {
                items = items.map((item) => {
                    if (item.id == id) {
                        return {
                            ...item,
                            count: item.count + 1
                        }
                    } else {
                        return item;
                    }
                })
            } else {
                items.push({
                    id,
                    count: 1
                })
            }
            writeAllFromFile(items).then(() => {
                resolve(items)
            })
            
        })
    } catch (err) {
        console.log(err);
        reject(err);
    }
})



module.exports = {
  addGood
}