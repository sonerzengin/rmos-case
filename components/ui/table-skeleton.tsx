import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  headerLabels?: string[]
}

export function TableSkeleton({ 
  rows = 5, 
  columns = 6, 
  showHeader = true,
  headerLabels = []
}: TableSkeletonProps) {
  return (
    <div className="border-t">
      <Table>
        {showHeader && (
          <TableHeader className="bg-slate-50">
            <TableRow>
              {Array.from({ length: columns }, (_, index) => (
                <TableHead key={index}>
                  {headerLabels[index] || (
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="flex items-center space-x-2">
                    {colIndex === columns - 1 ? (
                      // Son sütun için butonlar
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ) : (
                      // Normal veri hücreleri
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[120px]"></div>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Basit loading spinner komponenti
export function LoadingSpinner({ 
  text = "Veriler yükleniyor..." 
}: { 
  text?: string 
}) {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      <span className="ml-2">{text}</span>
    </div>
  )
} 