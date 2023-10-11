class SQL {
    constructor(hello) {
        this.hello = hello
    }
    insert() {
        console.log(this.hello);
    }
    delete() {

    }
    check() {

    }
}


let my = new SQL("world");
my.insert();