import { size } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { Button } from '@shared/components/Button'
import { Text } from '@shared/components/Text'
import { COUNT_VISIBLE } from '@shared/hooks'
import { makeCn } from '../../utils'
import styles from './ShowMore.module.scss'

const cn = makeCn('ShowMore', styles)

type ShowMoreProps = {
  set: (args: any) => void
  totalArr: any[]
  showArr: any[]
  addCount: number
  onShowMore: (count?: number) => void
}
export const ShowMore: React.FC<ShowMoreProps> = (props) => {
  const { set, showArr, totalArr, onShowMore, addCount } = props
  const totalArrLength = useMemo(() => size(totalArr), [totalArr])
  const showArrLength = useMemo(() => size(showArr), [showArr])

  const handleClick = useCallback(() => {
    set((prev) => prev + addCount)
    onShowMore?.(addCount)
  }, [addCount, onShowMore, set])

  return (
    <Button
      className={cn()}
      size="small"
      onClick={handleClick}
      color="grey"
      buttonName="rounded"
      disabled={totalArrLength === showArrLength}
    >
      <Text size="1">
        {`Показать ${totalArrLength ? 'еще' : `первые ${COUNT_VISIBLE}`} (${showArrLength}/${totalArrLength})`}
      </Text>
    </Button>
  )
}
