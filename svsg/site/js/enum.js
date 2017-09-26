var Svsg = Svsg || {};

Svsg.Enum = {
    status : {
        NOTFOUND : {text: "No solution yet found. :|"},
        FOUND  : {text: "Bravo solution is found! :)"},
        NOSOLUTION  : {text: "No solution is found. :("}
    },
    queenDirectionEnum : {
        UP :        {value: 0, name: "Up", code: "UP"},
        UPRIGHT :   {value: 1, name: "Up-Right", code: "UR"},
        RIGHT :     {value: 2, name: "Right", code: "RI"},
        DOWNRIGHT : {value: 3, name: "Down-Right", code: "DR"},
        DOWN :      {value: 4, name: "Down", code: "DO"},
        DOWNLEFT :  {value: 5, name: "Down-Left", code: "DL"},
        LEFT :      {value: 6, name: "Left", code: "LE"},
        UPLEFT :    {value: 7, name: "Up-Left", code: "UL"},
    },
    colorEnum : {
        BLACK :  {value: 0, name: "Black", code: "B"},
        WHITE :  {value: 1, name: "White", code: "W"},
    },
};