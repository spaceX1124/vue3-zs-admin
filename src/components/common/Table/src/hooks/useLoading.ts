/**
 * 控制表格loading加载状态
 * */
export function useLoading () {
  // 当前加载状态值
  const loadingRef = ref(false)
  // 获取当前加载状态
  const getLoading = computed(() => unref(loadingRef))
  function setLoading (loading: boolean) {
    loadingRef.value = loading
  }

  return {
    getLoading,
    setLoading
  }

}