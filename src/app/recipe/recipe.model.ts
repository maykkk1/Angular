import { Ingredient } from "../shared/Ingredient.model";

export class Recipe {
    public id: number
    public name: string;
    public description: string;
    public imgPath: string;
    public ingridients: Ingredient[];

    constructor(id: number, name: string, description: string, imgPath: string, ingredients: Ingredient[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
        this.ingridients = ingredients;
    }
}