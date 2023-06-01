import { size } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn, classNames } from '@public/utils'
import { Text } from '../../../app/_components/Text'
import styles from './ShowMore.module.scss'

const cn = makeCn('ShowMore', styles)

type ShowMoreProps = {
  set: (args: any) => void
  totalArr: any[]
  showArr: any[]
  addCount?: number
  onShowMore?: (count?: number) => void
}
export const ShowMore = (props: ShowMoreProps) => {
  const { set, showArr, totalArr, onShowMore, addCount } = props
  const totalArrLength = useMemo(() => size(totalArr), [totalArr])
  const showArrLength = useMemo(() => size(showArr), [showArr])

  const handleClick = useCallback(() => {
    set((prev) => prev + addCount)
    onShowMore?.(addCount)
  }, [addCount, onShowMore, set])

  return (
    <ButtonBox
      className={cn()}
      onClick={handleClick}
      color="grey"
      disabled={totalArrLength === showArrLength}
    >
      <Text>
        {`Показать ${totalArrLength ? 'еще' : `первые ${5}`} (${showArrLength}/${totalArrLength})`}
      </Text>
    </ButtonBox>
  )
}
