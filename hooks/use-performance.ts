import { useEffect } from 'react'

interface PerformanceMetrics {
  componentName: string
  renderTime?: number
  dataSize?: number
}

export function usePerformanceMonitor(metrics: PerformanceMetrics) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now()
      
      return () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        console.group(`🚀 Performance Metrics: ${metrics.componentName}`)
        console.log(`⏱️ Render Time: ${renderTime.toFixed(2)}ms`)
        if (metrics.dataSize) {
          console.log(`📊 Data Size: ${metrics.dataSize} items`)
          console.log(`⚡ Performance: ${(metrics.dataSize / renderTime * 1000).toFixed(0)} items/second`)
        }
        console.groupEnd()
      }
    }
  }, [metrics.componentName, metrics.dataSize])
}

// Büyük liste performansını izlemek için
export function useLargeListPerformance(listName: string, itemCount: number) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && itemCount > 100) {
      console.warn(`⚠️ Large List Detected: ${listName} has ${itemCount} items. Consider virtualization.`)
    }
  }, [listName, itemCount])
} 