import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { api } from "./api";

interface JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
    name?: string;
    email?: string;
    unique_name?: string;
}

export async function login(nif: string, senha: string) {
    try {
        const response = await api.post("Autenticacao/login", { nif, senha });

        const token: string = response.data.token;
        secureLocalStorage.setItem("Token", token);
        const decoded = jwtDecode<JwtPayload>(token);

        const nome =
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
            decoded.name ||
            decoded.unique_name ||
            "";

        const email =
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
            decoded.email ||
            "";

        secureLocalStorage.setItem("NomeUsuario", nome);
        secureLocalStorage.setItem("EmailUsuario", email);

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export function logout() {
    secureLocalStorage.removeItem("Token");
    secureLocalStorage.removeItem("NomeUsuario");
    secureLocalStorage.removeItem("EmailUsuario");
}

export function getUsuarioLogado(): { nome: string; email: string } {
    const nome = String(secureLocalStorage.getItem("NomeUsuario") ?? "");
    const email = String(secureLocalStorage.getItem("EmailUsuario") ?? "");
    return { nome, email };
}