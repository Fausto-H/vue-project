import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Material {
  id: number
  codigo: string
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  descricao: string
  createdAt: string
  updatedAt: string
}

export const useMaterialsStore = defineStore('materials', () => {
  // Estado
  const materials = ref<Material[]>([])
  const loading = ref(false)

  // Computed - Estatísticas
  const totalMaterials = computed(() => materials.value.length)
  
  const lowStockMaterials = computed(() => 
    materials.value.filter(m => m.quantidade < 10).length
  )
  
  const okStockMaterials = computed(() => 
    materials.value.filter(m => m.quantidade >= 10).length
  )

  const materialsByCategory = computed(() => {
    return materials.value.reduce((acc, material) => {
      if (!acc[material.categoria]) {
        acc[material.categoria] = []
      }
      acc[material.categoria].push(material)
      return acc
    }, {} as Record<string, Material[]>)
  })

  // Funções de localStorage
  const loadMaterials = () => {
    try {
      const stored = localStorage.getItem('materials')
      if (stored) {
        materials.value = JSON.parse(stored)
      } else {
        // Inicia vazio - sem dados de exemplo
        materials.value = []
      }
    } catch (error) {
      console.error('Erro ao carregar materiais do localStorage:', error)
      materials.value = []
    }
  }

  const saveMaterials = () => {
    try {
      localStorage.setItem('materials', JSON.stringify(materials.value))
    } catch (error) {
      console.error('Erro ao salvar materiais no localStorage:', error)
    }
  }

  // Ações CRUD
  const addMaterial = (materialData: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMaterial: Material = {
      ...materialData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    materials.value.push(newMaterial)
    saveMaterials()
    return newMaterial
  }

  const updateMaterial = (id: number, materialData: Partial<Material>) => {
    const index = materials.value.findIndex(m => m.id === id)
    if (index !== -1) {
      materials.value[index] = {
        ...materials.value[index],
        ...materialData,
        updatedAt: new Date().toISOString()
      }
      saveMaterials()
      return materials.value[index]
    }
    return null
  }

  const deleteMaterial = (id: number) => {
    const index = materials.value.findIndex(m => m.id === id)
    if (index !== -1) {
      materials.value.splice(index, 1)
      saveMaterials()
      return true
    }
    return false
  }

  const getMaterialById = (id: number) => {
    return materials.value.find(m => m.id === id)
  }

  const getMaterialByCode = (codigo: string) => {
    return materials.value.find(m => m.codigo === codigo)
  }

  const searchMaterials = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return materials.value.filter(m => 
      m.nome.toLowerCase().includes(lowerQuery) ||
      m.codigo.toLowerCase().includes(lowerQuery) ||
      m.categoria.toLowerCase().includes(lowerQuery) ||
      m.descricao.toLowerCase().includes(lowerQuery)
    )
  }

  const clearAllMaterials = () => {
    materials.value = []
    saveMaterials()
  }

  // Inicialização
  loadMaterials()

  return {
    // Estado
    materials,
    loading,
    // Computed
    totalMaterials,
    lowStockMaterials,
    okStockMaterials,
    materialsByCategory,
    // Ações
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialById,
    getMaterialByCode,
    searchMaterials,
    loadMaterials,
    clearAllMaterials
  }
})
