import { ProductService } from "./interfaces/product-service";
import { injectable, inject } from "inversify";

@injectable()
export class ProductServiceImpl implements ProductService {
    constructor() {
        
    }

    @Reflect.metadata("items", "")
    findAll() {

    }
}