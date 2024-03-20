
const stacks = [
    {name: 'comboBoxes', ketone: 100, glucose: 100},
    {name: 'ketoneBoxes', ketone: 50, glucose: 0},
    {name: 'glucoseBoxes', ketone: 0, glucose: 50},
]
// 265 150 = comboBoxes: 1 ketoneBoxes 3 glucoseBoxes 1
function calcOrders(ketone, glucose) {
    // stacks.forEach((stack) => {
        
    // })
    let output = {
        comboBoxes: '',
        ketoneBoxes: '',
        glucoseBoxes: '',
    }
    // loops through each box to figure out how many were needed
    // decrement the values from the strip count to keep track of the left over to fill
    for (let i = 0; i < stacks.length; i++) {
        // console.log(stacks[i])
        // console.log(stacks[i].glucose)
        // output[stacks[i].name] -= (ketone / stacks[i].ketone)
        // const combos = output[0] * 2
        console.log(output)
        output[stacks[i].name] -= - Math.floor(Math.min((ketone / stacks[i].ketone), (glucose / stacks[i].glucose)))

        // output['comboBoxes'] = Math.min((ketone / stacks[i].ketone), (glucose / stacks[i].glucose))
    }
    console.log(output)
}
calcOrders(265, 150)

// const {
//     name: 'Aiden',
//     total: 100
// } = winner
// const newObj = {...winner, total: total + 100}
// console.log(newObj)

// const people = [
//     {name: 'John', group: 'A'},
//     {name: 'Jane', group: 'B'},
//     {name: 'Bill', group: 'A'},
//     {name: 'Tim', group: 'A'},
// ]
// const groupInfo = people.reduce((groups, person) => {
//     const { A = 0, B = 0 } = groups
//     if (person.group === 'A') {
//         return {...groups, A: A + 1}
//     } else if (person.group === 'B') {
//         return {...groups, B: B + 1}
//     }
// }, {})
// console.log("groupInfo... ", groupInfo)
// const test = Math.min(8, 2)
// console.log('Math.min... ', test)