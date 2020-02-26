import { ProductService } from "./interfaces/product-service";
import { injectable } from "inversify";

@injectable()
export class ProductServiceImpl implements ProductService {
    constructor() {

    }

    @Reflect.metadata("items", "findAll")
    findAll() {
      console.log('findAll call --> -->');
    }
}
