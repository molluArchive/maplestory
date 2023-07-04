let data

let user = {
    level:1,
    exp:0,
    money:0,
    item:{
        weapon:{star:0,level:150},
        subWeapon:{},

    }
}

const level_p = document.getElementById("level")
const exp_p = document.getElementById("exp")
const money_p = document.getElementById("money")

fetch("./data.json")
.then(response => {
    return response.json();
})
.then(jsondata => {
    data = jsondata
    auto(data)




























});

const auto = (data) => {
    auto_ = setInterval(() => {
        user.money += data.level_money[user.level-1]
        user.exp += data.level_exp[user.level-1]
        if(data.level_up_exp[user.level-1] <= user.exp){
            user.exp -= data.level_up_exp[user.level-1]
            user.level++
        }
        level_p.textContent = user.level
        exp_p.textContent = user.exp
        money_p.textContent = user.money
    }, 1000);
}

const money = (amount) => {
    if(user.money + amount > 0){
        user.money += amount
        return {
            status:200,
            money:user.money
        }
    } else {
        return {
            status:400,
            money:user.money
        }
    }
}

const enhance = (item) => {
    let item_data = data.starforce[item][String(user.item.weapon.level)]
    let item_data2 = item_data[user.item.weapon.star]

    let result = money(-item_data2[1])
    if(result.status === 200) {
        let random = Math.random()
        if(random < item_data2[2]){
            user.item.weapon.star++
            alert("ㅅㄱ")
        } else {
            alert("ㅅㅍ")
        }
        console.log(user.item.weapon)
    } else {
        alert("ㅂㅈ")
    }
}