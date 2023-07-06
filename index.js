let data

let user = {
    level:1,
    exp:0,
    money:500000000000000000000,
    spend_money:0,
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
    // auto(data)



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
        user.spend_money -= amount
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

const price_calc = (L,S) => {
    if(S < 10) return 1000 + ((L**3)*(S+1))/25
    if(S === 10) return 1000 + Math.floor(((L**3)*((S+1)**2.7))/400)
    if(S === 11) return 1000 + Math.floor(((L**3)*((S+1)**2.7))/220)
    if(S === 12) return 1000 + Math.floor(((L**3)*((S+1)**2.7))/150)
    if(S === 13) return 1000 + Math.floor(((L**3)*((S+1)**2.7))/110)
    if(S === 14) return 1000 + Math.floor(((L**3)*((S+1)**2.7))/75)
    return 1000 + Math.floor(((L**3)*((S+1)**2.7))/200)
}

const enhance = (item) => {
    let star = user.item.weapon.star
    let percentage = data.starforce.percentage[star]
    let message = ""

    let result = money(-price_calc(user.item.weapon.level,star))
    if(result.status === 200) {
        changeValue("test1")
        document.getElementById("test2").value = user.spend_money.toLocaleString()

        let random = Math.random()
        if(random < percentage[0]){
            message = `성공: ${star} -> ${star+1}`
            user.item.weapon.star++
        } else if (random > 1 - percentage[1]) {
            message = `파괴: ${star} -> 12`
            user.item.weapon.star = 12
            changeValue("test3")
        } else {
            if(star < 16 || star ===  20){
                message = `실패(유지): ${star}`
            } else {
                message = `실패(하락): ${star} -> ${star-1}`
                user.item.weapon.star--
            }
        }
        console.log(message)
    } else {
        console.log("돈 부족")
    }
}

const changeValue = (id, number = 1) => {
    document.getElementById(id).value = (Number(document.getElementById(id).value) + number).toLocaleString()
}

