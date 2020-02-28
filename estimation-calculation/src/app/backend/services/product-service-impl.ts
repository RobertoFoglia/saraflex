import { ProductService } from "./interfaces/product-service";
import { injectable } from "inversify";
import { CallMapping } from "../../core/server/annotations/call-mapping";

@injectable()
export class ProductServiceImpl implements ProductService {
    constructor() {}

    @CallMapping("items")
    findAll() {
      console.log('findAll call --> -->');
    }
}
