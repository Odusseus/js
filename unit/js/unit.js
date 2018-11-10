
var Unit = {
    unit1: new Vue({
        el: '#unit-1',
        data: {
            name: 'One',
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

            }
        }
    })
};

