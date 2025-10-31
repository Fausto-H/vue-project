# Sistema de Armazenamento Local (LocalStorage)

## Visão Geral

O sistema de gestão de materiais utiliza localStorage para persistir os dados localmente no navegador do usuário. Todos os materiais cadastrados são salvos automaticamente e permanecem disponíveis mesmo após fechar o navegador.

## Arquitetura Implementada

### Store Pinia - materialsStore.ts

Store centralizado usando Pinia que gerencia o estado dos materiais e sincroniza automaticamente com o localStorage.

#### Funcionalidades:

**CRUD Completo**
- addMaterial() - Adiciona novo material
- updateMaterial() - Atualiza material existente
- deleteMaterial() - Remove material
- getMaterialById() - Busca por ID
- getMaterialByCode() - Busca por código

**Busca e Filtros**
- searchMaterials() - Pesquisa por nome, código, categoria ou descrição
- materialsByCategory - Agrupa materiais por categoria

**Estatísticas em Tempo Real**
- totalMaterials - Total de materiais cadastrados
- lowStockMaterials - Materiais com estoque baixo (< 10 unidades)
- okStockMaterials - Materiais com estoque adequado (>= 10 unidades)

**Sincronização Automática**
- Todas as operações salvam automaticamente no localStorage
- Carregamento automático ao iniciar a aplicação

## Estrutura de Dados

```typescript
interface Material {
  id: number              // ID único (timestamp)
  codigo: string          // Código do material
  nome: string           // Nome do material
  categoria: string      // Categoria (Ferramentas, Elétricos, etc.)
  quantidade: number     // Quantidade em estoque
  unidade: string        // Unidade de medida (UN, KG, M, L)
  descricao: string      // Descrição detalhada
  createdAt: string      // Data de criação (ISO string)
  updatedAt: string      // Data da última atualização (ISO string)
}
```

## Fluxo de Dados

### Cadastro de Material
1. Usuário preenche o formulário em CadastroMaterial.vue
2. Validação dos campos obrigatórios
3. Verificação de código duplicado
4. materialsStore.addMaterial() é chamado
5. Material é adicionado ao array e salvo no localStorage
6. Redirecionamento para a página de inventário

### Visualização de Inventário
1. InventarioView.vue carrega os materiais do store
2. DataTable exibe os dados reativamente
3. Qualquer alteração no store atualiza a tabela automaticamente

### Dashboard
1. DashboardHome.vue exibe estatísticas em tempo real
2. As estatísticas são computadas properties que atualizam automaticamente
3. Exibe materiais agrupados por categoria

## Componentes Atualizados

### CadastroMaterial.vue
- Importa e usa useMaterialsStore()
- Valida código duplicado
- Adiciona material ao store
- Toast notifications para feedback

### InventarioView.vue
- Usa materiais diretamente do store
- Exclusão sincronizada com localStorage
- Feedback visual com toasts

### DashboardHome.vue
- Estatísticas dinâmicas baseadas nos dados reais
- Materiais por categoria
- Alertas de estoque baixo

## Como Usar

### Adicionar Material
```javascript
const materialsStore = useMaterialsStore()

materialsStore.addMaterial({
  nome: 'Chave de Fenda',
  codigo: 'MAT001',
  quantidade: 50,
  unidade: 'UN',
  categoria: 'Ferramentas',
  descricao: 'Chave de fenda Phillips'
})
```

### Buscar Material
```javascript
const material = materialsStore.getMaterialByCode('MAT001')
```

### Atualizar Material
```javascript
materialsStore.updateMaterial(123456789, {
  quantidade: 100
})
```

### Deletar Material
```javascript
materialsStore.deleteMaterial(123456789)
```

## Segurança e Limitações

### Vantagens
- Funciona offline
- Sem necessidade de backend
- Rápido e responsivo
- Sem custo de hospedagem

### Limitações
- Dados armazenados apenas no navegador local
- Limite de aproximadamente 5-10MB de armazenamento
- Não sincroniza entre dispositivos
- Dados podem ser perdidos se limpar cache do navegador
- Não há autenticação/autorização

## Migração Futura para Banco de Dados

Para migrar para um banco de dados no futuro:

1. Mantenha a interface do store igual
2. Substitua as funções de localStorage por chamadas API
3. O resto do código continuará funcionando sem alterações

Exemplo:
```javascript
const addMaterial = async (materialData) => {
  // Antes: materials.value.push(newMaterial)
  
  // Depois:
  const response = await fetch('/api/materials', {
    method: 'POST',
    body: JSON.stringify(materialData)
  })
  const newMaterial = await response.json()
  materials.value.push(newMaterial)
}
```

## Estatísticas do Sistema

O dashboard exibe automaticamente:
- Total de materiais cadastrados
- Número de categorias diferentes
- Materiais com estoque baixo
- Materiais com estoque adequado
- Distribuição por categoria

## Experiência do Usuário

- Feedback visual com toasts
- Validação de formulários
- Confirmação antes de excluir
- Loading states durante operações
- Estatísticas atualizadas em tempo real

---

Desenvolvido com Vue 3 + Pinia + LocalStorage
