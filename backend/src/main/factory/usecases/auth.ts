import { JwtService } from "../../../data/helpers/jwtService";
import { AuthUsecase } from "../../../data/usecases/auth";

export function authUsecaseFactory() {
    const jwtService = new JwtService();
    return new AuthUsecase(jwtService);
}