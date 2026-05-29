import { api } from "./api";

export interface LocalizacaoDto {
    localizacaoID: string;
    nomeLocal: string;
    localSAP?: number | null;
    descricaoSAP?: string | null;
    areaID: string;
    nomeResponsavel: string;
}

export interface AreaDto {
    areaID: string;
    nomeArea: string;
}

export async function listarLocalizacoes(): Promise<LocalizacaoDto[]> {
    try {
        const response = await api.get<LocalizacaoDto[]>("Localizacao");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data ?? "Erro ao buscar localizações."
        );
    }
}

export async function listarAreas(): Promise<AreaDto[]> {
    try {
        const response = await api.get<AreaDto[]>("Area");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data ?? "Erro ao buscar áreas."
        );
    }
}

export async function listarResponsaveis(): Promise<LocalizacaoDto[]> {
    try {
        const response = await api.get<LocalizacaoDto[]>("Responsavel");
        return response.data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data ?? "Erro ao buscar Responsaveis."
        );
    }
}

export interface AmbienteViewModel {
    localizacaoID: string;
    nomeLocal: string;
    nomeArea: string;
    nomeResponsavel?: string;
    localSAP?: number | null;
    descricaoSAP?: string | null;
}

export async function listarAmbientes(): Promise<AmbienteViewModel[]> {
    const [localizacoes, areas] = await Promise.all([
        listarLocalizacoes(),
        listarAreas(),
    ]);

    const mapaAreas = new Map<string, string>(
        areas.map((a) => [a.areaID, a.nomeArea])
    );

    return localizacoes.map((loc) => ({
        localizacaoID: loc.localizacaoID,
        nomeLocal: loc.nomeLocal,
        nomeArea: mapaAreas.get(loc.areaID) ?? "—",
        localSAP: loc.localSAP,
        descricaoSAP: loc.descricaoSAP,
        nomeResponsavel: loc.nomeResponsavel ?? "—"
    }));
}
