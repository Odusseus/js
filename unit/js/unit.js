
var Unit = {
    unit1: new Vue({
        el: '#unit-1',
        data: {
            name: 'One',
            info: "",
            isActive: false,
            stylePosition: {
                position: 'absolute',
                top: '400px',
                left: '500px'
            }
        },
        methods: {
            select: function (event) {
                this.isActive = !this.isActive;

            },
            selected: function (event) {
                var x = event.pageX;     // Get the horizontal coordinate
                var y = event.pageY;     // Get the vertical coordinate
                var coor = "X coords: " + x + ", Y coords: " + y;
                this.info = coor;
                
            }
        }
    })
};

