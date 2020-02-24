
import { Container } from "inversify";
import { ProductService } from "../services/interfaces/product-service";
import { ProductServiceImpl } from "../services/product-service-impl";

export function beanRegistration(container: Container) {
    container.bind<ProductService>("products").to(ProductServiceImpl).inSingletonScope();
}