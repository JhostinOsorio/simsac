import axiosIns from '@/libs/axios'

const useArticles = () => {
  const getArticles = async serverParams => {
    const info = {
      data: null,
      error: null,
    }
    const { page, perPage } = serverParams
    try {
      const response = await axiosIns.get(`/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getProductTypes = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get('/combo/tipoproducto/1')
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getUnitGroup = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get('/combo/grupounidad/0')
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  const getUnitsByGroup = async groupId => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = await axiosIns.get(`/combo/grupounidad/${groupId}`)
      if (response.status !== 200) throw new Error(response)
      info.data = response.data
    } catch (error) {
      info.error = error
    }
    return info
  }

  return {
    getArticles,
    getProductTypes,
    getUnitGroup,
    getUnitsByGroup,
  }
}

export default useArticles
