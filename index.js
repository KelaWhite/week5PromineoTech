//MENU APP
class Guitar {
    constructor(name, style) {
        this.name = name;
        this.style = style;
    }

    describe() {
        return `This guitar is a ${this.name} ${this.syle}.`;
    }
}

class Type {
    constructor(name) {
        this.name = name;
        this.guitars = [];
    }

    addGuitar(guitar) {
        if (guitar instanceof Guitar) {
            this.guitars.push(guitar);
        } else {
            throw new Error(`You can only add an instance of Guitar. Argument is not a guitar: ${guitar}`);
        }
    }

    describe() {
        return `The ${this.name} type has ${this.guitars.length} guitars.`;
    }
}

class Menu {
    constructor() {
        this.types = [];
        this.selectedType = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createType();
                    break;
                case '2':
                    this.viewType();
                    break;
                case '3':
                    this.deleteType();
                    break;
                case '4':
                    this.displayTypes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) enter new guitar type
        2) view guitar types
        3) remove guitar types
        4) display all guitar types
        `);
    }

    showTypeMenuOptions(typeInfo) {
        return prompt(`
        0) back
        1) enter guitar
        2) remove guitar
        ----------------------
        ${typeInfo}
        `);
    }

    displayTypes() {
        let typeString = '';
        for (let i = 0; i < this.types.length; i++) {
            typeString += i + ') ' + this.types[i].name + '\n';
        }
        alert(typeString);
    }

    createType() {
        let name = prompt('Enter type of guitar');
        this.types.push(new Type(name));
    }

    viewType() {
        let index = prompt('Enter the index of the type of guitar you wish to view:');
        if (index > -1 && index < this.types.length) {
            this.selectedType = this.types[index];
            let description = 'Type of guitar: ' + this.selectedType.name + '\n';
            
            for (let i = 0; i < this.selectedType.guitars.length; i++) {
                description += i + ') ' + this.selectedType.guitars[i].name
                 + ' - ' + this.selectedType.guitars[i].style + '\n';
            }

            let selection = this.showTypeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createGuitar();
                    break;
                case'2':
                    this.deleteGuitar();
            }
        }
    }

    deleteType() {
        let index = prompt('Enter the index of the type of guitar you wish to remove:');
        if (index > -1 && index < this.types.length) {
            this.types.splice(index, 1);
        }
    }
    

    createGuitar() {
        let name = prompt('Enter name (brand) of the new guitar:');
        let style = prompt('Enter the style of the new guitar:');
        this.selectedType.guitars.push(new Guitar(name, style));
    }

    deleteGuitar() {
        let index = prompt('Enter the index of the guitar you wish to remove:');
        if (index > -1 && index < this.selectedType.guitars.length) {
            this.selectedType.guitars.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();