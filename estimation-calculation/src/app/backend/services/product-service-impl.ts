import {singleton} from "tsyringe";
import { ProductService } from "./interfaces/product-service";

@singleton()
export class ProductServiceImpl implements ProductService {
    constructor() {

    }
}