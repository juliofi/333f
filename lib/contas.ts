import { supabase } from './supabase';

export interface ContaBancaria {
  id?: number;
  codigo_conta_banco: number;
  codigo_empresa: string; // UUID do usuário
  codigo_banco: number;
  codigo_agencia: number;
  descricao: string;
  numero_conta: string;
  created_at?: string;
  updated_at?: string;
}

// CREATE - Criar nova conta
export async function criarConta(conta: Omit<ContaBancaria, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('contas_bancarias')
    .insert([conta])
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao criar conta:', error);
    throw error;
  }
  return data;
}

// READ - Buscar todas as contas de um usuário
export async function buscarContas(codigoEmpresa: string) {
  const { data, error } = await supabase
    .from('contas_bancarias')
    .select('*')
    .eq('codigo_empresa', codigoEmpresa)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar contas:', error);
    throw error;
  }
  return data || [];
}

// READ - Buscar uma conta específica
export async function buscarContaPorId(id: number) {
  const { data, error } = await supabase
    .from('contas_bancarias')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Erro ao buscar conta:', error);
    throw error;
  }
  return data;
}

// UPDATE - Atualizar conta
export async function atualizarConta(id: number, atualizacoes: Partial<ContaBancaria>) {
  const { data, error } = await supabase
    .from('contas_bancarias')
    .update({ ...atualizacoes, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao atualizar conta:', error);
    throw error;
  }
  return data;
}

// DELETE - Deletar conta
export async function deletarConta(id: number) {
  const { error } = await supabase
    .from('contas_bancarias')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Erro ao deletar conta:', error);
    throw error;
  }
}

