const scales = [[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C_sharp', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'D_sharp', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp'],
['E', 'F_sharp', 'G', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'G_sharp', 'A_sharp', 'C', 'D', 'E_sharp'],
['F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B_sharp', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp']],

[['A', 'A_sharp', 'C', 'D', 'E', 'F', 'G'],
['A_sharp', 'B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp'],
['B', 'C', 'D', 'E', 'F_sharp', 'G', 'A'],
['C', 'C_sharp', 'D_sharp', 'F', 'G', 'G_sharp', 'A_sharp'],
['C_sharp', 'D', 'E', 'F_sharp', 'G_sharp', 'A', 'B'],
['D', 'D_sharp', 'F', 'G', 'A', 'A_sharp', 'C'],
['D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp'],
['E', 'F', 'G', 'A', 'B', 'C', 'D'],
['F', 'F_sharp', 'G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp'],
['F_sharp', 'G', 'A', 'B', 'C_sharp', 'D', 'E'],
['G', 'G_sharp', 'A_sharp', 'C', 'D', 'D_sharp', 'F'],
['G_sharp', 'A', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp']],

[['A', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'B_sharp', 'C', 'D', 'E_sharp', 'F', 'G'],
['B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F_sharp', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'B_sharp'],
['D', 'E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp'],
['D_sharp', 'E_sharp', 'F', 'G', 'A_sharp', 'B_sharp', 'C'],
['E', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'B', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp', 'D_sharp', 'E_sharp'],
['G', 'A', 'B', 'C_sharp', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'E', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'C_sharp', 'D_sharp'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'D_sharp'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp']],

[['A', 'B', 'C', 'D', 'E', 'F', 'G'],
['A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp'],
['B', 'C_sharp', 'D', 'E', 'F_sharp', 'G', 'A'],
['C', 'D', 'D_sharp', 'F', 'G', 'G_sharp', 'A_sharp'],
['C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A', 'B'],
['D', 'E', 'F', 'G', 'A', 'A_sharp', 'C'],
['D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp'],
['E', 'F_sharp', 'G', 'A', 'B', 'C', 'D'],
['F', 'G', 'G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp'],
['F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D', 'E'],
['G', 'A', 'A_sharp', 'C', 'D', 'D_sharp', 'F'],
['G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'E', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'D_sharp'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp']],
]

const popularProgs = [
    ['I', 'vi', 'IV', 'V'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

const suggestions = []

function numeralToChord (numeral, key, mode) {
    if(numeral == 'I') {
        scales[mode][key][0]
    }
    if(numeral == 'i') {
        scales[mode][key][0]
    }
    if(numeral == 'II') {
        scales[mode][key][1]
    }
    if(numeral == 'ii') {
        scales[mode][key][1]       
    }
    if(numeral == 'III') {
        scales[mode][key][2]
    }
    if(numeral == 'iii') {
        scales[mode][key][2]       
    }
    if(numeral == 'IV') {
        scales[mode][key][3]
    }
    if(numeral == 'iv') {
        scales[mode][key][3]       
    }
    if(numeral == 'V') {
        scales[mode][key][4]
    }
    if(numeral == 'v') {
        scales[mode][key][4]       
    }
    if(numeral == 'VI') {
        scales[mode][key][5]
    }
    if(numeral == 'vi') {
        scales[mode][key][5]        
    }
    if(numeral == 'VII') {
        scales[mode][key][6]
    }
    if(numeral == 'vii') {
        scales[mode][key][6]       
    }

}

function loopBackward (key, mode, chord1, chord2, chord3, chord4, chordPosition) {

    let i = 0
    let j = 0

    for(i = 0; i < popularProgs.length; i++) {
        if (i < chordPosition && chord1 == numeralToChord(popularProgs[i][0], key, mode)) {
            if (i < chordPosition && chord2 == numeralToChord(popularProgs[i][1], key, mode)) {
                if (i < chordPosition && chord3 == numeralToChord(popularProgs[i][2], key, mode)) {
                    if (i < chordPosition && chord4 == numeralToChord(popularProgs[i][3], key, mode)) {
                        // print numeralToChord(popularProgs[i][3], key, mode)
                    }
                    // print numeralToChord(popularProgs[i][2], key, mode)
                }
                // suggestion.push( numeralToChord(popularProgs[i][1], key, mode)
            }
            // suggestion.push( numeralToChord(popularProgs[i][0], key, mode) )
        }
        // return nothing
    }
}

function loopBackward () {

}

export function PopularProgressions (props) {
    loopForward()
    loopBackward()
}