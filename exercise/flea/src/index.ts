import Vue from "vue";
import HelloDecorator from "./component/HelloDecorator";

let v = new Vue({
    el: "#app",
    template:`
    <div>
        <div>Hello {{name}}!</div>
        <hello-decorator :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: {
        name: "World"
    }
});