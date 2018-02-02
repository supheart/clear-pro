const MenuModel = require('../../models/system/menu');
const BaseComponent = require('../../init/prototype/baseComponent');

class Menu extends BaseComponent{
	constructor(){
        super();
        this.classText = '菜单';
		this.addMenu = this.addMenu.bind(this);
		// this.getCategory = this.getCategory.bind(this);
		// this.addCategory = this.addCategory.bind(this);
		// this.getSpecfoods = this.getSpecfoods.bind(this);
		// this.updateFood = this.updateFood.bind(this);
	}
	async addMenu(data){
        let menu = await MenuModel.findOne({name: data.name});
        if(menu) {
            return this.getErrorResult(401);
        }
        
        menu = new MenuModel(data);
    
        let result = await menu.save();
        
        return this.getCodeResult(200, result);
	}
}

module.exports = Menu;