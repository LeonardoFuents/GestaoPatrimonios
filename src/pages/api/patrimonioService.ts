import { api } from "./api";

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export interface DetalhesPatrimonioDto extends PatrimonioDto {
    nomeLocalizacao: string;
    nomeStatus: string;
}

export interface PatrimonioDto {
    patrimonioID: string;
    denominacao: string;
    numeroPatrimonio: string;
    valor?: number | null;
    imagem?: string | null;
    localizacaoID: string;
    nomeLocalizacao?: string;
    statusPatrimonioID: string;
    dataUltimaTransferencia?: string | null;
}

export interface SolicitacaoTransferenciaDto {
    justificativa: string;
    patrimonioID: string;
    localizacaoID: string;
}

export async function listarTodosPatrimonios(page: number = 1, pageSize: number = 10, search?: string): Promise<PagedResult<PatrimonioDto>> {
    try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());
        if (search) params.append("search", search);

        const response = await api.get<PagedResult<PatrimonioDto>>(`Patrimonio?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data ?? "Erro ao buscar todos os patrimônios.");
    }
}

export async function listarPatrimoniosPorLocalizacao(localizacaoId: string, page: number = 1, pageSize: number = 10, search?: string): Promise<PagedResult<PatrimonioDto>> {
    try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());
        if (search) params.append("search", search);

        const response = await api.get<PagedResult<PatrimonioDto>>(`Patrimonio/por-localizacao/${localizacaoId}?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data ?? "Erro ao buscar patrimônios do local.");
    }
}

export async function buscarPatrimonioPorId(id: string): Promise<DetalhesPatrimonioDto> {
    try {
        const response = await api.get<DetalhesPatrimonioDto>(`Patrimonio/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data ?? "Erro ao buscar detalhes do patrimônio.");
    }
}

export async function criarSolicitacaoTransferencia(dto: SolicitacaoTransferenciaDto): Promise<void> {
    try {
        await api.post("SolicitacaoTransferencia", dto);
    } catch (error: any) {
        throw new Error(error?.response?.data ?? "Erro ao criar solicitação de transferência.");
    }
}
