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
  return {
    getArticles,
  }
}

export default useArticles
