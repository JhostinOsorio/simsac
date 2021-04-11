import axiosIns from '@/libs/axios'

const useArticles = () => {
  const getArticles = async () => {
    const info = {
      data: null,
      error: null,
    }
    try {
      const response = axiosIns.get('/articulos/_id=1')
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
