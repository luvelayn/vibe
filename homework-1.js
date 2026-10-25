const readline = require('node:readline/promises')

function ticketPrice(category) {
    switch (category) {
        case 1:
            return 300
        case 2:
            return 500
        case 3:
            return 900
        default:
            return 0
    }
}

function maxTickets(budget, price) {
    let tickets = 0

    if (price <= 0) {
        return tickets
    }

    while (budget >= price) {
        budget -= price
        tickets++
    }

    return tickets
}

function checkNumber(value, errorMessage) {
    if (!Number.isFinite(value) || value < 0) {
        console.log(errorMessage)
        return false
    }

    return true
}

function printTicketResult(category, budget) {
    const price = ticketPrice(category)

    if (price === 0) {
        console.log('неизвестная категория')
        return
    }

    if (!checkNumber(budget, 'некорректный бюджет')) {
        return
    }

    const tickets = maxTickets(budget, price)
    console.log(
        `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${tickets} шт.`,
    )
}

function deliveryPrice(distance, total) {
    if (total >= 3000 || distance <= 3) {
        return 0
    } else if (distance <= 10) {
        return 200
    } else {
        return 200 + (distance - 10) * 25
    }
}

function printDelivery(distance, total) {
    if (!checkNumber(distance, 'некорректное расстояние')) {
        return
    }

    if (!checkNumber(total, 'некорректная сумма заказа')) {
        return
    }

    const price = deliveryPrice(distance, total)
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`)
}

function printSteps(height) {
    if (!checkNumber(height, 'некорректная высота')) {
        return
    }

    let stepsBuilt = 0

    for (let i = 1; i <= height; i++) {
        if (i === 4) {
            continue
        }

        if (i > 10) {
            console.log('Дальше лестница не построена')
            break
        }

        console.log(`Ступень ${i}`)
        stepsBuilt++
    }

    console.log(`Всего построено: ${stepsBuilt}`)
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    console.log('Выберите задачу:')
    console.log('1 — билетная касса')
    console.log('2 — доставка заказа')
    console.log('3 — лестница')

    const action = Number(await rl.question('Ваш выбор: '))

    switch (action) {
        case 1: {
            const category = Number(await rl.question('Категория билета: '))
            const budget = Number(await rl.question('Бюджет: '))
            printTicketResult(category, budget)
            break
        }
        case 2: {
            const distance = Number(await rl.question('Расстояние: '))
            const orderPrice = Number(await rl.question('Сумма заказа: '))
            printDelivery(distance, orderPrice)
            break
        }
        case 3: {
            const height = Number(await rl.question('Высота лестницы: '))
            printSteps(height)
            break
        }
        default:
            console.log('такой задачи нет')
    }

    rl.close()
}

main()
